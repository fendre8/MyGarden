using MyGarden.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MyGarden.DAL
{
    public interface IPlantsRepository
    {
        Task<IEnumerable<Plant>> List();
    }
}
