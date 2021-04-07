using Microsoft.AspNetCore.Mvc;
using MyGarden.API.DTO;
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
using System.Text.Json;
using System.Threading.Tasks;

namespace MyGarden.DAL
{
    public class PlantsRepository : IPlantsRepository
    {
        private readonly Uri growstuffpath = new Uri("http://growstuff.org/");
        private readonly Uri openfarmpath = new Uri("https://openfarm.cc/api/v1/");
        private string openfarmToken;

        private readonly HttpClient client = new HttpClient();

        private readonly AutoMapper.IMapper mapper;
        private readonly MyGardenDbContext db;

        public PlantsRepository(MyGardenDbContext db, AutoMapper.IMapper mapper)
        {
            this.db = db;
            this.mapper = mapper;
        }

        public async Task<Action> GetTokenFromOpenFarm()
        {
            var login = new OpenfarmLogin { email = "fendre80@gmail.com", password = "12345678" };
            var loginData = JsonConvert.SerializeObject(login);
            //client.DefaultRequestHeaders.Accept.Clear();
            //client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
            var content = new StringContent(loginData, Encoding.UTF8, "application/json");
            HttpResponseMessage response = await client.PostAsync(openfarmpath + "token/", content);
            if (response.IsSuccessStatusCode)
            {
                var result = await response.Content.ReadAsStringAsync();
                var loginresult = JsonConvert.DeserializeObject<OpenfarmLoginResult>(result);
                openfarmToken = loginresult.data.attributes.secret;
            }
            return null;
        }


        public async Task<IEnumerable<Plant>> List()
        {
            List<Plant> plants = null;
            HttpResponseMessage response = await client.GetAsync(growstuffpath + "crops.json");
            if (response.IsSuccessStatusCode)
            {
                plants = await response.Content.ReadAsAsync<List<Plant>>();
            }
            return plants;
        }

        public async Task<OFPlantResult> FindPlantByName(string plantName)
        {
            client.BaseAddress = openfarmpath;
            client.DefaultRequestHeaders.Accept.Clear();
            client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
            client.DefaultRequestHeaders.Add("Authorization", "Bearer " + openfarmToken);
            var response = await client.GetAsync("crops/?filter=" + plantName);
            if (response.IsSuccessStatusCode)
            {
                var plant = await response.Content.ReadAsAsync<OFPlantResult>();
                return plant;
            }
            return null;
        }

        public async Task<ActionResult> AddPlant(EF.DbModels.Plant plant)
        {
            return null;
        }

    }
}
