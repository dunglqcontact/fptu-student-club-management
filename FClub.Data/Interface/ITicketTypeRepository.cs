using FClub.Data.Database;
using System;
using System.Collections.Generic;
using System.Text;

namespace FClub.Data.Interface
{
    public interface ITicketTypeRepository : IRepository<TicketType>
    {
        int getBonusPointById(string id);
    }
}
