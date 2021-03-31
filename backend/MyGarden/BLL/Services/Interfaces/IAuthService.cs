using MyGarden.DAL.EF.DbModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MyGarden.BLL.Services.Interfaces
{
    interface IAuthService
    {
        ApplicationUser GetUserByEmail(string email);
        Guid CreateNewUser(RegisterModel userRegistration);
        string HashPassword(string password);
        bool VerifyPassword(string actualPassword, string hashedPassword);
    }
}
