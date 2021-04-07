using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MyGarden.API.DTO.Openfarm
{

    public class OpenfarmLoginResult
    {
        public Data data { get; set; }
    }

    public class Data
    {
        public string type { get; set; }
        public string id { get; set; }
        public Attributes attributes { get; set; }
        public Links links { get; set; }
    }

    public class Attributes
    {
        public DateTime expiration { get; set; }
        public string secret { get; set; }
    }

    public class Links
    {
        public Self self { get; set; }
    }

    public class Self
    {
        public string api { get; set; }
        public string website { get; set; }
    }

}
