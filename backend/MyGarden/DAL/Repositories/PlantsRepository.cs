using Microsoft.AspNetCore.Mvc;
using MyGarden.API.DTO;
using MyGarden.API.DTO.Growstuff;
using MyGarden.API.DTO.Openfarm;
using MyGarden.DAL.EF;
using MyGarden.Models;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using System.Threading.Tasks;

namespace MyGarden.DAL
{
    public class PlantsRepository : IPlantsRepository
    {
        private readonly Uri growstuffpath = new Uri("http://growstuff.org/");
        private readonly Uri openfarmpath = new Uri("https://openfarm.cc/api/v1/");
        private string openfarmToken = null;
        private DateTime tokenExpirationTime = new DateTime();

        private readonly HttpClient gsClient = new HttpClient();
        private readonly HttpClient ofClient = new HttpClient();

        private readonly AutoMapper.IMapper mapper;
        private readonly MyGardenDbContext db;

        public PlantsRepository(MyGardenDbContext db, AutoMapper.IMapper mapper)
        {
            this.db = db;
            this.mapper = mapper;
            gsClient.BaseAddress = growstuffpath;
            ofClient.BaseAddress = openfarmpath;
        }

        private async Task<string> GetTokenFromOpenFarm()
        {
            var loginData = JsonConvert.SerializeObject(new OpenfarmLogin { email = "fendre80@gmail.com", password = "12345678" });
            ofClient.DefaultRequestHeaders.Accept.Clear();
            ofClient.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
            var content = new StringContent(loginData, Encoding.UTF8, "application/json");
            HttpResponseMessage response = await ofClient.PostAsync("token/", content);
            if (response.IsSuccessStatusCode)
            {
                var result = await response.Content.ReadAsAsync<OpenfarmLoginResult>();
                openfarmToken = result.data.attributes.secret;
                tokenExpirationTime = result.data.attributes.expiration;
            }
            return openfarmToken;
        }


        public async Task<IEnumerable<Plant>> List()
        {
            List<Plant> plants = null;
            HttpResponseMessage response = await gsClient.GetAsync("crops.json");
            if (response.IsSuccessStatusCode)
            {
                plants = await response.Content.ReadAsAsync<List<Plant>>();
            }
            return plants;
        }

        public async Task<OFPlantResult> OfFindPlantByName(string plantName)
        {
            if (tokenExpirationTime < DateTime.Now)
            {
                await GetTokenFromOpenFarm();
            }
            ofClient.DefaultRequestHeaders.Accept.Clear();
            ofClient.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
            ofClient.DefaultRequestHeaders.Add("Authorization", "Bearer " + openfarmToken);
            var response = await ofClient.GetAsync("crops/?filter=" + plantName);
            if (response.IsSuccessStatusCode)
            {
                var plant = await response.Content.ReadAsAsync<OFPlantResult>();
                return plant;
            }
            return null;
        }

        public async Task<GsPlantResult> GsFindPlantByName(string plantName)
        {
            gsClient.DefaultRequestHeaders.Accept.Clear();
            var response = await gsClient.GetAsync("crops/" + plantName + ".json");
            if (response.IsSuccessStatusCode)
            {
                var plant = await response.Content.ReadAsAsync<GsPlantResult>();
                return plant;
            }
            return null;
        }


        public async Task<Plant> AddPlant(string plantName)
        {
            var ofPlants = await OfFindPlantByName(plantName);

            var gsPlant = await GsFindPlantByName(plantName);

            var ofPlant = ofPlants.data.FirstOrDefault(p => p.attributes.binomial_name == gsPlant.scientific_names[0].name);

            var plant = new EF.DbModels.Plant()
            {
                GrowstuffId = gsPlant.id,
                OpenfarmId = ofPlant.id,
                Name = ofPlant.attributes.name,
                Scientific_name = ofPlant.attributes.binomial_name,
                Description = ofPlant.attributes.description,
                First_harvest_exp = new string(gsPlant.median_days_to_first_harvest.GetValueOrDefault() + " days"),
                Last_harvest_exp = new string(gsPlant.median_days_to_last_harvest.GetValueOrDefault() + " days"),
                Height = ofPlant.attributes.height.GetValueOrDefault(),
                Spread = ofPlant.attributes.spread.GetValueOrDefault(),
                Median_lifespan = new string(gsPlant.median_lifespan + " days"),
                Row_spacing = ofPlant.attributes.row_spacing.GetValueOrDefault(),
                Sun_requirements = ofPlant.attributes.sun_requirements,
                Sowing_method = ofPlant.attributes.sowing_method,
                Img_url = ofPlant.attributes.main_image_path,
                Plant_time = DateTime.Now
            };


            await db.Plants.AddAsync(plant);
            await db.SaveChangesAsync();

            return new Plant
            {
                Id = plant.Id,
                Name = plant.Name,
                Description = plant.Description,
                Scientific_name = plant.Scientific_name,
                First_harvest_exp = plant.First_harvest_exp,
                Last_harvest_exp = plant.Last_harvest_exp,
                Height = plant.Height,
                Spread = plant.Spread,
                Row_spacing = plant.Row_spacing,
                Sowing_method = plant.Sowing_method,
                Median_lifespan = plant.Median_lifespan,
                Sun_requirements = plant.Sun_requirements,
                thumbnail_url = plant.Img_url,
                Plant_time = plant.Plant_time
            };
        }

        public Plant GetPlantById(int id)
        {
            var plant = db.Plants.FirstOrDefault(p => p.Id == id);
            if (plant == null)
                return null;
            else return mapper.Map<Plant>(plant);
        }

    }
}
