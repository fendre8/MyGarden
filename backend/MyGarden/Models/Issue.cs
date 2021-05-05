using MyGarden.API.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MyGarden.Models
{
    public class Issue
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public string Img_url { get; set; }
        public bool Is_open { get; set; }

        public Profile Author { get; set; }
        public IssuePlant Plant { get; set; }
        public ICollection<Answer> Answers { get; set; }

    }
}
