using FClub.Data.Database;
using FClub.Data.Helper;
using FClub.Data.Interface;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace FClub.Data.Repository
{

    public class EventRepository : Repository<EventInfo>, IEventRepository
    {

        readonly ClubManagementDBContext _dbContext;
        public EventRepository(ClubManagementDBContext ClubManagementDBContext) : base(ClubManagementDBContext)
        {
            _dbContext = ClubManagementDBContext;
        }

        public void DisableEvent(int id)
        {
            var eventinfo = _dbContext.EventInfos.FirstOrDefault(s => s.Id == id);
            eventinfo.Status = false;
            _dbContext.EventInfos.Update(eventinfo);
            _dbContext.SaveChanges();
        }

    }
}
