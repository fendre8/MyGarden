using Microsoft.EntityFrameworkCore;
using MyGarden.DAL.EF;
using MyGarden.Models;
using System;
using System.Collections.Generic;
using System.Linq;

namespace MyGarden.DAL
{
    public class ProfileRepository : IProfilesRepository
    {
        private readonly AutoMapper.IMapper mapper;
        private readonly MyGardenDbContext db;

        public ProfileRepository(MyGardenDbContext db, AutoMapper.IMapper mapper)
        {
            this.db = db;
            this.mapper = mapper;
        }

        public IReadOnlyCollection<Profile> List()
        {
            return db
                .ApplicationUsers
                .Include(p => p.Friendship)
                .Select(mapper.Map<Profile>)
                .ToList();
        }

        public Profile FindById(Guid id)
        {
            var dbRecord = db.ApplicationUsers.FirstOrDefault(p => p.Id == id);
            if (dbRecord == null)
                return null;
            else
                return mapper.Map<Profile>(dbRecord);
        }

        public Profile FindByUserName(string username)
        {
            var dbRecord = db.ApplicationUsers.FirstOrDefault(p => p.NormalizedUserName == username.Normalize());
            if (dbRecord == null)
                return null;
            else
                return mapper.Map<Profile>(dbRecord);
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

                return new Profile
                {
                    Id = profile.Id,
                    Username = profile.UserName,
                    Email = profile.Email
                };
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

                return dbRecord == null ? null : mapper.Map<Profile>(dbRecord);
            }
        }

        public FriendshipResponse AddFriend(string username1, string username2)
        {
            using (var trans = db.Database.BeginTransaction(System.Data.IsolationLevel.RepeatableRead))
            {
                var dbUser1 = db.ApplicationUsers.FirstOrDefault(p => p.NormalizedUserName == username1.Normalize());
                var dbUser2 = db.ApplicationUsers.FirstOrDefault(p => p.NormalizedUserName == username2.Normalize());
                if (dbUser1 == null || dbUser2 == null)
                    return null;
                var toInsert = new EF.DbModels.Friendship()
                {
                    Friend1 = dbUser1,
                    Friend1Id = dbUser1.Id,
                    Friend2 = dbUser2,
                    Friend2Id = dbUser2.Id
                };
                db.Friendships.Add(toInsert);

                db.SaveChanges();
                trans.Commit();
                return new FriendshipResponse { User1 = dbUser1.UserName, User2 = dbUser2.UserName };
            }
        }

        //private static Profile ToModel(EF.DbModels.ApplicationUser value)
        //{
        //    var profile =  new Profile
        //    {
        //        Id = value.Id,
        //        Username = value.UserName,
        //        Email = value.Email,
        //        Plants = value.Plants.Select(p => p.Name).ToList(),
        //        Friends = value.Friendship.Select(p => p.Friend1.UserName).ToList()
        //    };

        //    return profile;
        //}

    }
}
