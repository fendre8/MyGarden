using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MyGarden.Models
{
    public class Answer
    {
        public Answer(string text)
        {
            Text = text;
        }

        public Guid Id { get; set; }
        public Profile Author { get; set; }
        public string Text { get; set; }
    }
}
