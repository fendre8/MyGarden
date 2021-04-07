using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MyGarden.API.DTO
{
    public class NewIssueResponse
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public string Img_url { get; set; }
        public bool Is_open { get; set; }

        public string Author { get; set; }
        public string Plant { get; set; }
        public ICollection<string> Answers { get; set; }
    }
}
