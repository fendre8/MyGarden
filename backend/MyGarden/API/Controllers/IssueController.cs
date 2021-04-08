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
        private readonly IIssueRepository repository;

        public IssueController(IIssueRepository repository)
        {
            this.repository = repository;
        }

        [HttpGet]
        public async Task<IEnumerable<Issue>> List()
        {
            return repository.List();
        }

        //[HttpPost]
        //[ProducesResponseType(StatusCodes.Status201Created)]
        //[ProducesResponseType(StatusCodes.Status400BadRequest)]
        //public ActionResult<NewIssueResponse> CreateIssue([FromBody] NewIssueModel issue)
        //{
        //    var user = repository.FindByUserName(issue.Username);
        //    if (user == null)
        //        return BadRequest();
        //    var plant = repository.GetPlantById(issue.PlantId);
        //    if (plant == null)
        //        return BadRequest();
        //    var result = repository.CreateIssueForPlant(issue);

        //    return new NewIssueResponse
        //    {
        //        Id = result.Id,
        //        Author = result.Author.Username,
        //        Plant = result.Plant.Name,
        //        Title = result.Title,
        //        Description = result.Description,
        //        Is_open = result.Is_open,
        //        Img_url = result.Img_url,
        //        Answers = new List<string>()
        //    };
        //}

    }
}
