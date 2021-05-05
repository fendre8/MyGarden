using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MyGarden.API.DTO;
using MyGarden.DAL;
using MyGarden.DAL.EF;
using MyGarden.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MyGarden.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class IssueController : ControllerBase
    {
        private readonly IIssueRepository issues_repository;
        private readonly IPlantsRepository plants_repository;
        private readonly IProfilesRepository profiles_repository;

        public IssueController(IIssueRepository i_repo, IPlantsRepository pl_repo, IProfilesRepository pr_repo)
        {
            this.issues_repository = i_repo;
            this.plants_repository = pl_repo;
            this.profiles_repository = pr_repo;
        }

        [HttpGet]
        public async Task<IEnumerable<Issue>> List()
        {
            return await issues_repository.List();
        }

        [HttpPost]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<NewIssueResponse>> CreateIssue([FromBody] NewIssueModel issue)
        {
            var user = await profiles_repository.FindByUserName(issue.Username);
            if (user == null)
                return BadRequest();
            var plant = plants_repository.GetPlantById(issue.PlantId);
            if (plant == null)
                return BadRequest();
            var result = await issues_repository.CreateIssueForPlant(issue);

            return Created(nameof(CreateIssue),new NewIssueResponse
            {
                Id = result.Id,
                Author = result.Author,
                Plant = result.Plant,
                Title = result.Title,
                Description = result.Description,
                Is_open = result.Is_open,
                Img_url = result.Img_url,
                Answers = new List<string>()
            });
        }

    }
}
