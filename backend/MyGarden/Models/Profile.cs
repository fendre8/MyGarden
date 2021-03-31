using MyGarden.API.DTO;
using System;
using System.Collections.Generic;
using System.Drawing;

namespace MyGarden.Models
{
    public class Profile
    {

        public Guid Id { get; set; }
        public string Username { get; set; }
        public string First_name { get; set; }
        public string Last_name { get; set; }
        public string Email { get; set; }
        public Image Image { get; set; }

        public List<FriendshipDTO> Friends { get; set; } = new List<FriendshipDTO>();
        public ICollection<string> Plants { get; set; } = new List<string>();
        public ICollection<string> Issues { get; set; } = new List<string>();

    }
}
