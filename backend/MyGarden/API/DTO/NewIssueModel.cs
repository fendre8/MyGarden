using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MyGarden.API.DTO
{
    public class NewIssueModel
    {
        public string Username { get; set; }
        public int PlantId { get; set; }

        public string Title { get; set; }
        public string Description { get; set; }
        //public int MyProperty { get; set; }
    }
}
