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

        public NewIssueResponse CreateIssueForPlant(NewIssueModel issue)
        {
            var toInsert = new EF.DbModels.Issue
            {
                Title = issue.Title,
                Description = issue.Description,
                Author = db.ApplicationUsers.FirstOrDefault(u => u.UserName == issue.Username),
                Plant = db.Plants.FirstOrDefault(p => p.Id == issue.PlantId),
                Is_open = true
            };
            db.Issues.Add(toInsert);

            db.SaveChanges();

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


        public IEnumerable<Issue> List()
        {
            return db.Issues.Select(mapper.Map<Issue>).ToList();
        }
    }
}
