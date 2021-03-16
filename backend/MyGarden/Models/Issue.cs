using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MyGarden.Models
{
    public class Issue : IEntityBase
    {
        public Issue(string title, string description, string img_url)
        {
            Title = title;
            Description = description;
            Img_url = img_url;
            Is_open = true;
            Answers = new List<Answer>();
        }

        public Guid Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public string Img_url { get; set; }
        public bool Is_open { get; set; }

        public Profile Author { get; set; }
        public Guid AuthorId { get; set; }
        public Plant Plant { get; set; }
        public ICollection<Answer> Answers { get; set; }

    }
}
