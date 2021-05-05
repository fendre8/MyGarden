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

        public async Task<NewIssueResponse> CreateIssueForPlant(NewIssueModel issue)
        {
            var toInsert = new EF.DbModels.Issue
            {
                Title = issue.Title,
                Description = issue.Description,
                Author = db.ApplicationUsers.FirstOrDefault(u => u.UserName == issue.Username),
                Plant = db.Plants.FirstOrDefault(p => p.Id == issue.PlantId),
                Is_open = true
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

        public void AddCommentForIssue(Issue issue, Answer answer)
        {
            throw new NotImplementedException();
        }


        public async Task<IEnumerable<Issue>> List()
        {
            return db.Issues
                .Include(i => i.Author).ThenInclude(u => u.Plants)
                .Include(i => i.Plant)
                .Include(i => i.Answers)
                .Select(ToModel).ToList();
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
