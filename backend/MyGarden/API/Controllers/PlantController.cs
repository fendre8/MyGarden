using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
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

        [HttpPost("find")]
        public async Task<ActionResult> AddPlant(/*[FromBody] DAL.EF.DbModels.Plant plant*/string plantname)
        {
            //await repository.GetTokenFromOpenFarm();
            //await repository.AddPlant(plant);
            var result = await repository.FindPlantByName(plantname);


            return Ok(result);
        }


    }
}
