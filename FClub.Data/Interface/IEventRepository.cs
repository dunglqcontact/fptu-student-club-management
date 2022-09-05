using FClub.Data.Database;
using FClub.Data.Helper;
using System;
using System.Collections.Generic;
using System.Text;

namespace FClub.Data.Interface
{
    public interface IEventRepository : IRepository<EventInfo>
    {
        void DisableEvent(int id);
    }
}
