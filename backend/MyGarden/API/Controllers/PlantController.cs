using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MyGarden.API.DTO;
using MyGarden.DAL;
using MyGarden.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MyGarden.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PlantController : ControllerBase
    {
        private readonly IPlantsRepository repository;

        public PlantController(IPlantsRepository repository)
        {
            this.repository = repository;
        }

        [HttpGet]
        public async Task<IEnumerable<Plant>> List()
        {
            return await repository.List();
        }

        [HttpGet("{name}")]
        public async Task<ActionResult> GetPlantByName(string name)
        {
            var plants = await repository.GetPlantsByName(name);
            if (plants != null)
            {
                return Ok(plants);
            }
            else
                return NotFound(new ErrorModel
                {
                    Code = "Not found",
                    Type = "No match for " + name,
                    Description = "No match for " + name
                });
        }

        [HttpPost]
        public async Task<ActionResult> AddPlant(string plantName)
        {
            var plant = await repository.AddPlant(plantName);
            if (plant != null)
            {
                return Created(nameof(AddPlant), plant);
            }
            else
                return BadRequest();
        }


    }
}
