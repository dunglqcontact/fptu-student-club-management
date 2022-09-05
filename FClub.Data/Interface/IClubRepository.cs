using FClub.Data.Database;
using System;
using System.Collections.Generic;
using System.Text;

namespace FClub.Data.Interface
{
    public interface IClubRepository : IRepository<Club>
    {
        bool CheckIdExistance(String id);
    }
}
