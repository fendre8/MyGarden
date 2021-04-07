using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MyGarden.DAL.EF.DbModels
{
    public class Issue
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public string Img_url { get; set; }
        public bool Is_open { get; set; }

        public ApplicationUser Author { get; set; }
        public int AuthorId { get; set; }
        public Plant Plant { get; set; }
        public ICollection<Answer> Answers { get; set; }
    }
}
