using FClub.Data.Database;
using FClub.Data.Helper;
using FClub.Data.Interface;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FClub.Business.Service
{
    public class EventInfoService
    {
        private readonly IEventRepository _eventRepo;

        public EventInfoService(IEventRepository eventRepo)
        {
            _eventRepo = eventRepo;
        }
        //GET All Event Details  
        public PagedList<EventInfo> GetEvents(EventInfoParameter eventInfo, PagingParameter paging)
        {
            var values = _eventRepo.GetAll(includeProperties: eventInfo.includeProperties);

            if (eventInfo.Id != null)
            {
                values = values.Where(x => x.Id == eventInfo.Id);
            }
            if (eventInfo.CreatorId != null)
            {
                values = values.Where(x => x.CreatorId == eventInfo.CreatorId);
            }
            if (!string.IsNullOrWhiteSpace(eventInfo.Title))
            {
                values = values.Where(x => x.Title.Contains(eventInfo.Title, StringComparison.InvariantCultureIgnoreCase));
            }
            if (!string.IsNullOrWhiteSpace(eventInfo.Content))
            {
                values = values.Where(x => x.Content.Contains(eventInfo.Content, StringComparison.InvariantCultureIgnoreCase));
            }
            if (eventInfo.CreateDate != null)
            {
                values = values.Where(x => x.CreateDate == eventInfo.CreateDate);
            }
            if (eventInfo.RegisDate != null)
            {
                values = values.Where(x => x.RegisDate == eventInfo.RegisDate);
            }
            if (eventInfo.EndRegisDate != null)
            {
                values = values.Where(x => x.EndRegisDate == eventInfo.EndRegisDate);
            }
            if (eventInfo.BeginDate != null)
            {
                values = values.Where(x => x.BeginDate == eventInfo.BeginDate);
            }
            if (eventInfo.DueDate != null)
            {
                values = values.Where(x => x.DueDate == eventInfo.DueDate);
            }
            if (!string.IsNullOrWhiteSpace(eventInfo.Location))
            {
                values = values.Where(x => x.Location.Contains(eventInfo.Location, StringComparison.InvariantCultureIgnoreCase));
            }
            if (eventInfo.Status != null)
            {
                values = values.Where(x => x.Status == eventInfo.Status);
            }

            if (!string.IsNullOrWhiteSpace(eventInfo.sort))
            {
                switch (eventInfo.sort)
                {
                    case "Id":
                        if (eventInfo.dir == "asc")
                            values = values.OrderBy(d => d.Id);
                        else if (eventInfo.dir == "desc")
                            values = values.OrderByDescending(d => d.Id);
                        break;
                    case "CreateDate":
                        if (eventInfo.dir == "asc")
                            values = values.OrderBy(d => d.CreateDate);
                        else if (eventInfo.dir == "desc")
                            values = values.OrderByDescending(d => d.CreateDate);
                        break;
                    case "RegisDate":
                        if (eventInfo.dir == "asc")
                            values = values.OrderBy(d => d.RegisDate);
                        else if (eventInfo.dir == "desc")
                            values = values.OrderByDescending(d => d.RegisDate);
                        break;
                    case "EndRegisDate":
                        if (eventInfo.dir == "asc")
                            values = values.OrderBy(d => d.EndRegisDate);
                        else if (eventInfo.dir == "desc")
                            values = values.OrderByDescending(d => d.EndRegisDate);
                        break;
                    case "BeginDate":
                        if (eventInfo.dir == "asc")
                            values = values.OrderBy(d => d.BeginDate);
                        else if (eventInfo.dir == "desc")
                            values = values.OrderByDescending(d => d.BeginDate);
                        break;
                    case "DueDate":
                        if (eventInfo.dir == "asc")
                            values = values.OrderBy(d => d.DueDate);
                        else if (eventInfo.dir == "desc")
                            values = values.OrderByDescending(d => d.DueDate);
                        break;
                }
            }

            return PagedList<EventInfo>.ToPagedList(values.AsQueryable(),
            paging.PageNumber,
            paging.PageSize);
        }
        //Get Event by event id  
        public EventInfo GetEventById(int id)
        {
            return _eventRepo.GetAll().FirstOrDefault(e => e.Id == id);
        }
        //Add Event
        public int Add(EventInfo eventInfo)
        {
            try
            {
                _eventRepo.Add(eventInfo);
                _eventRepo.SaveDbChange();
                var id = eventInfo.Id;
                return id;
            }
            catch
            {
                return -1;
            }
        }
        //Disable Event 
        public bool DisableEventById(int id)
        {
            try
            {
                _eventRepo.DisableEvent(id);
                _eventRepo.SaveDbChange();
                return true;
            }
            catch
            {
                return false;
            }
        }
        //Update Event Details  
        public bool UpdateEvent(EventInfo eventInfo)
        {
            try
            {
                _eventRepo.Update(eventInfo);
                _eventRepo.SaveDbChange();
                return true;
            }
            catch
            {
                return false;
            }
        }

        /*public IEnumerable<EventInfo> getByPage(int pageNumber)
        {
            int pageSize = 5;
            return _eventRepo.GetAll().AsQueryable().Skip(pageSize * (pageNumber-1)).Take(pageSize).ToList();
        }*/

        public bool DeleteEvent(int id)
        {
            try
            {
                var objFromDb = _eventRepo.Get(id);
                if (objFromDb != null)
                {
                    _eventRepo.Remove(id);
                    _eventRepo.SaveDbChange();
                    return true;
                }
            }
            catch
            {
                return false;
            }
            return false;
        }
    }
}
