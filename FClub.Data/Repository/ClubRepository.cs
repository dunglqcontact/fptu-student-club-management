using FClub.Data.Database;
using FClub.Data.Interface;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace FClub.Data.Repository
{
    public class ClubRepository : Repository<Club>, IClubRepository
    {
        private readonly ClubManagementDBContext _db;
        public ClubRepository(ClubManagementDBContext db) : base(db)
        {
            _db = db;
        }
        public bool CheckIdExistance(String id)
        {
            var objFromDb = _db.Clubs.FirstOrDefault(s => s.Id == id);
            if (objFromDb == null)
                return false;
            return true;
        }
    }
}
