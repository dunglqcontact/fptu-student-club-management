using FClub.Data.Database;
using FClub.Data.Interface;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace FClub.Data.Repository
{
    public class EventTicketRepository : Repository<EventTicket>, IEventTicketRepository
    {

        readonly ClubManagementDBContext _dbContext;
        public EventTicketRepository(ClubManagementDBContext ClubManagementDBContext) : base(ClubManagementDBContext)
        {
            _dbContext = ClubManagementDBContext;
        }


    }
}