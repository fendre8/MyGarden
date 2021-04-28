using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace MyGarden.DAL.EF.DbModels
{
    public class RegisterModel
    {

        [Required(ErrorMessage = "First name is required")]
        public string First_Name { get; set; }

        [Required(ErrorMessage = "Last name is required")]
        public string Last_Name { get; set; }

        [Required(ErrorMessage = "User name is required")]
        public string Username { get; set; }

        [EmailAddress]
        [Required(ErrorMessage = "Email is required")]
        public string Email { get; set; }

        [Required(ErrorMessage = "Password is required")]
        public string Password { get; set; }
    }
}
