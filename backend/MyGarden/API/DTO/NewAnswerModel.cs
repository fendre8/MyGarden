using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MyGarden.API.DTO
{
    public class NewAnswerModel
    {
        public int userId { get; set; }
        public string answerText { get; set; }
    }
}
