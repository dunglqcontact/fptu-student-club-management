using FClub.Data.Database;
using FClub.Data.Helper;
using FClub.Data.Interface;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace FClub.Business.Service
{
    public class EventTicketService
    {
        private readonly IEventTicketRepository _ticketRepo;

        public EventTicketService(IEventTicketRepository eventTicketRepo)
        {
            _ticketRepo = eventTicketRepo;
        }

        //Get Ticket by id  
        public EventTicket GetTicketById(int id)
        {
            return _ticketRepo.Get(id);
        }

        //Add Ticket
        public bool Add(EventTicket ticket)
        {
            try
            {
                _ticketRepo.Add(ticket);
                _ticketRepo.SaveDbChange();
                return true;
            }
            catch
            {
                return false;
            }
        }
        //Delete Ticket by id
        public bool DeleteById(int id)
        {
            try
            {
                var objFromDb = _ticketRepo.Get(id);
                if (objFromDb != null)
                {
                    _ticketRepo.Remove(id);
                    _ticketRepo.SaveDbChange();
                    return true;
                }
            }
            catch
            {
                return false;
            }
            return false;
        }
        //Update Ticket Details  
        public bool Update(EventTicket ticket)
        {
            try
            {
                _ticketRepo.Update(ticket);
                _ticketRepo.SaveDbChange();
                return true;
            }
            catch
            {
                return false;
            }
        }

        public PagedList<EventTicket> GetBy(EventTicketParameter eventTicket, PagingParameter eventParameter)
        {
            var values = _ticketRepo.GetAll(includeProperties: eventTicket.includeProperties);

            if (eventTicket.Id != null)
            {
                values = values.Where(x => x.Id == eventTicket.Id);
            }
            if (eventTicket.ParticipantId != null)
            {
                values = values.Where(x => x.ParticipantId == eventTicket.ParticipantId);
            }
            if (!string.IsNullOrWhiteSpace(eventTicket.TicketTypeId))
            {
                values = values.Where(x => x.TicketTypeId.Equals(eventTicket.TicketTypeId));
            }

            if (!string.IsNullOrWhiteSpace(eventTicket.sort))
            {
                switch (eventTicket.sort)
                {
                    case "Id":
                        if (eventTicket.dir == "asc")
                            values = values.OrderBy(d => d.Id);
                        else if (eventTicket.dir == "desc")
                            values = values.OrderByDescending(d => d.Id);
                        break;
                }
            }

            return PagedList<EventTicket>.ToPagedList(values.AsQueryable(),
            eventParameter.PageNumber,
            eventParameter.PageSize);
        }
    }
}
