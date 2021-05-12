using Microsoft.EntityFrameworkCore;
using MyGarden.API.DTO;
using MyGarden.DAL.EF;
using MyGarden.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MyGarden.DAL.Repositories
{
    public class IssueRepository : IIssueRepository
    {
        private readonly AutoMapper.IMapper mapper;
        private readonly MyGardenDbContext db;

        public IssueRepository(MyGardenDbContext db, AutoMapper.IMapper mapper)
        {
            this.db = db;
            this.mapper = mapper;
        }

        public async Task<IEnumerable<Issue>> List()
        {
            return db.Issues
                .Include(i => i.Author).ThenInclude(u => u.Plants)
                .Include(i => i.Plant)
                .Include(i => i.Answers).ThenInclude(a => a.Author)
                .Select(ToModel).ToList();
        }

        public async Task<Issue> GetIssueById(int id)
        {
            var dbRecord = await db.Issues
                .Include(i => i.Author)
                .Include(i => i.Plant)
                .Include(i => i.Answers).ThenInclude(a => a.Author)
                .AsSplitQuery()
                .FirstOrDefaultAsync(i => i.Id == id);
            if (dbRecord == null)
                return null;
            else
                return ToModel(dbRecord);
        }

        public async Task<NewIssueResponse> CreateIssueForPlant(NewIssueModel issue)
        {
            var plant = await db.Plants.FirstOrDefaultAsync(p => p.Name.ToUpper() == issue.PlantName.ToUpper());
            var user = await db.ApplicationUsers.FirstOrDefaultAsync(u => u.UserName == issue.Username);

            if (user == null || plant == null) return null;

            var toInsert = new EF.DbModels.Issue
            {
                Title = issue.Title,
                Description = issue.Description,
                Author = user,
                Plant = plant,
                Is_open = true,
                Answers = new List<EF.DbModels.Answer>(),
                Img_url = ""
            };
            await db.Issues.AddAsync(toInsert);

            await db.SaveChangesAsync();

            return new NewIssueResponse
            {
                Title = toInsert.Title,
                Description = toInsert.Description,
                Author = toInsert.Author.UserName,
                Plant = toInsert.Plant.Name,
                Id = toInsert.Id,
                Is_open = toInsert.Is_open,
                Answers = null,
                Img_url = null
            };

        }

        public async Task<Answer> AddAnswerToIssue(int issueId, string answerText, int userId)
        {
            var user = await db.ApplicationUsers.FirstOrDefaultAsync(u => u.Id == userId);
            var issue = await db.Issues
                .Include(i => i.Answers)
                .FirstOrDefaultAsync(i => i.Id == issueId);
            if (user == null || issue == null) 
                return null;
            var answer = new EF.DbModels.Answer
            {
                Author = user,
                Text = answerText
            };

            await db.Answers.AddAsync(answer);

            issue.Answers.Add(answer);
            await db.SaveChangesAsync();

            return new Answer
            {
                Author = user.UserName,
                Id = answer.Id,
                Text = answerText
            };
        }

        public async Task<Issue> ToggleIssueIsOpen(int id)
        {
            var issue = await db.Issues
                .Include(i => i.Author)
                .Include(i => i.Answers).ThenInclude(a => a.Author)
                .Include(i => i.Plant)
                .FirstOrDefaultAsync(i => i.Id == id);
            if (issue == null)
                return null;
            else
            {
                issue.Is_open = !issue.Is_open;
                await db.SaveChangesAsync();
                return ToModel(issue);
            }
        }

        private static Issue ToModel(EF.DbModels.Issue value)
        {
            var answers = new List<Answer>();
            foreach (var answer in value.Answers)
            {
                answers.Add(new Answer
                {
                    Author = answer.Author.UserName,
                    Id = answer.Id,
                    Text = answer.Text
                });
            }

            var profile = new Profile
            {
                Id = value.Author.Id,
                Email = value.Author.Email,
                First_name = value.Author.First_name,
                Last_name = value.Author.Last_name,
                ImagePath = value.Author.ImagePath,
                Username = value.Author.UserName,
                Plants = null,
                Friends = null,
                Issues = null
            };

            var issue = new Issue
            {
                Id = value.Id,
                Author = profile,
                Description = value.Description,
                Title = value.Title,
                Is_open = value.Is_open,
                Plant = new IssuePlant
                {  
                    Id = value.Plant.Id,
                    Name = value.Plant.Name,
                },
                Answers = answers,
            };
            return issue;
        }

    }
}
