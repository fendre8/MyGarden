using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MyGarden.API.DTO
{
    public class OFPlantResult
    {
        public Data[] data { get; set; }
    }

    public class Data
    {
        public string type { get; set; }
        public string id { get; set; }
        public Attributes attributes { get; set; }
    }

    public class Attributes
    {
        public string name { get; set; }
        public string slug { get; set; }
        public string binomial_name { get; set; }
        public string description { get; set; }
        public string sun_requirements { get; set; }
        public string sowing_method { get; set; }
        public int? spread { get; set; }
        public int? row_spacing { get; set; }
        public int? height { get; set; }
        public string main_image_path { get; set; }
        public int? growing_degree_days { get; set; }
    }
}
