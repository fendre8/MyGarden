using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MyGarden.Models
{
    public class Issue
    {
        public Issue(Profile author, Plant plant, string title, string description, string img_url)
        {
            Author = author;
            Plant = plant;
            Title = title;
            Description = description;
            Img_url = img_url;
            Is_open = true;
            Answers = new List<Answer>();
        }
        public string Title { get; set; }
        public string Description { get; set; }
        public string Img_url { get; set; }
        public bool Is_open { get; set; }

        public Profile Author { get; set; }
        public Plant Plant { get; set; }
        public List<Answer> Answers { get; set; }

    }
}
