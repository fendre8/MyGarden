using MyGarden.Models;
using System;
using System.Collections.Generic;

namespace MyGarden.DAL
{
    public interface IProfilesRepository
    {
        IReadOnlyCollection<Profile> List();
        Profile FindById(Guid id);
        Profile Insert(EF.DbModels.ApplicationUser profile);
        Profile Delete(Guid id);
    }
}
