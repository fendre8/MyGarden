using MyGarden.BLL.Services.Interfaces;
using MyGarden.DAL.EF.DbModels;
using System;

namespace MyGarden.BLL.Services
{
    public class AuthService : IAuthService
    {
        public Guid CreateNewUser(RegisterModel userRegistration)
        {
            throw new NotImplementedException();
        }

        public ApplicationUser GetUserByEmail(string email)
        {
            throw new NotImplementedException();
        }

        public string HashPassword(string password)
        {
            throw new NotImplementedException();
        }

        public bool VerifyPassword(string actualPassword, string hashedPassword)
        {
            throw new NotImplementedException();
        }
    }
}
