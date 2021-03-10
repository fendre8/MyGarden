using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MyGarden.Models
{
    interface IEntityBase
    {
        Guid Id { get; set; }
    }
}
