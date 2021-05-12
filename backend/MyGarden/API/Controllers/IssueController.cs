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

        [HttpGet("id/{id}")]
        public async Task<ActionResult<Issue>> GetIssueById([FromRoute] int id)
        {
            var response = await issues_repository.GetIssueById(id);
            if (response == null)
            {
                return NotFound();
            }
            else
            {
                return Ok(response);
            }
        }

        [HttpPost]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<NewIssueResponse>> CreateIssue([FromBody] NewIssueModel issue)
        {
            var result = await issues_repository.CreateIssueForPlant(issue);

            if (result == null) return BadRequest();

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

        [HttpPost("{issueId}")]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult> AddAnswerToIssue([FromRoute] int issueId, [FromBody] NewAnswerModel answer)
        {
            var result = await issues_repository.AddAnswerToIssue(issueId, answer.answerText, answer.userId);
            if (result == null)
                return BadRequest();
            else
                return CreatedAtAction(nameof(AddAnswerToIssue), result);
        }

        [HttpPut("id/{issueId}/isopen")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<Issue>> ToggleIssueIsOpen([FromRoute] int issueId)
        {
            var result = await issues_repository.ToggleIssueIsOpen(issueId);
            if (result == null)
                return NotFound();
            else
                return Ok(result);
        }
    }
}
