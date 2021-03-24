using MyGarden.DAL.EF;
using MyGarden.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.EntityFrameworkCore;

namespace MyGarden.DAL
{
    public class ProfileRepository : IProfilesRepository
    {
        private readonly MyGardenDbContext db;

        public ProfileRepository(MyGardenDbContext db)
        {
            this.db = db;
        }

        public IReadOnlyCollection<Profile> List()
        {
            return db.ApplicationUsers.Select(ToModel).ToList();
        }

        public Profile FindById(Guid id)
        {
            var dbRecord = db.ApplicationUsers.FirstOrDefault(p => p.Id == id);
            if (dbRecord == null)
                return null;
            else
                return ToModel(dbRecord);
        }

        public Profile Insert(EF.DbModels.ApplicationUser profile)
        {
            using (var tran = db.Database.BeginTransaction(System.Data.IsolationLevel.RepeatableRead))
            {
                if (db.ApplicationUsers.Any(s => Microsoft.EntityFrameworkCore.EF.Functions.Like(s.UserName, profile.UserName)))
                    throw new ArgumentException("username must be unique");

                var toInsert = new EF.DbModels.ApplicationUser() 
                { 
                    UserName = profile.UserName,
                    Email = profile.Email,
                    PasswordHash = profile.PasswordHash,
                };
                db.ApplicationUsers.Add(toInsert);

                db.SaveChanges();
                tran.Commit();

                return new Profile(toInsert.Id, toInsert.UserName, toInsert.Email, toInsert.PasswordHash);
            }

        }

        public Profile Delete(Guid profileId)
        {
            using (var tran = db.Database.BeginTransaction(System.Data.IsolationLevel.RepeatableRead))
            {
                var dbRecord = db.ApplicationUsers.FirstOrDefault(t => t.Id == profileId);

                db.ApplicationUsers.Remove(dbRecord);
                db.SaveChanges();
                tran.Commit();

                return dbRecord == null ? null : ToModel(dbRecord);
            }
        }

        private static Profile ToModel(EF.DbModels.ApplicationUser value)
        {
            return new Profile(value.Id, value.UserName, value.Email, value.PasswordHash);
        }

    }
}
