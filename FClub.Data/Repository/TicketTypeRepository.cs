using FClub.Data.Database;
using FClub.Data.Interface;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace FClub.Data.Repository
{
    public class TicketTypeRepository : Repository<TicketType>, ITicketTypeRepository
    {
        readonly ClubManagementDBContext _dbContext;
        public TicketTypeRepository(ClubManagementDBContext ClubManagementDBContext) : base(ClubManagementDBContext)
        {
            _dbContext = ClubManagementDBContext;
        }

        public int getBonusPointById(string id)
        {
            return (int)_dbContext.TicketTypes.FirstOrDefault(e => e.Id.Equals(id)).BonusPoint;
        }
    }
}
