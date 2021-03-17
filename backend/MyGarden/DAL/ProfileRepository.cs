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
            return db.Profiles.Select(ToModel).ToList();
        }

        public Profile FindById(Guid id)
        {
            var dbRecord = db.Profiles.FirstOrDefault(p => p.Id == id);
            if (dbRecord == null)
                return null;
            else
                return ToModel(dbRecord);
        }

        public Profile Insert(EF.DbModels.Profile profile)
        {
            using (var tran = db.Database.BeginTransaction(System.Data.IsolationLevel.RepeatableRead))
            {
                if (db.Profiles.Any(s => Microsoft.EntityFrameworkCore.EF.Functions.Like(s.Username, profile.Username)))
                    throw new ArgumentException("username must be unique");

                var toInsert = new EF.DbModels.Profile() 
                { 
                    Username = profile.Username,
                    Email = profile.Email,
                    Password = profile.Password,
                };
                db.Profiles.Add(toInsert);

                db.SaveChanges();
                tran.Commit();

                return new Profile(toInsert.Id, toInsert.Username, toInsert.Email, toInsert.Password);
            }

        }

        public Profile Delete(Guid profileId)
        {
            using (var tran = db.Database.BeginTransaction(System.Data.IsolationLevel.RepeatableRead))
            {
                var dbRecord = db.Profiles.FirstOrDefault(t => t.Id == profileId);

                db.Profiles.Remove(dbRecord);
                db.SaveChanges();
                tran.Commit();

                return dbRecord == null ? null : ToModel(dbRecord);
            }
        }

        private static Profile ToModel(EF.DbModels.Profile value)
        {
            return new Profile(value.Id, value.Username, value.Email, value.Password);
        }

    }
}
