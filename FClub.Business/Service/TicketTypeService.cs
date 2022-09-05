using FClub.Data.Database;
using FClub.Data.Helper;
using FClub.Data.Interface;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace FClub.Business.Service
{
    public class TicketTypeService
    {
        private readonly ITicketTypeRepository _ticketTypeRepo;
        
        public TicketTypeService(ITicketTypeRepository ticketTypeRepo)
        {
            _ticketTypeRepo = ticketTypeRepo;
        }

        //GET All Ticket Type  
        public IEnumerable<TicketType> GetAll()
        {
            return _ticketTypeRepo.GetAll().ToList();
        }

        //Get Ticket Type by id  
        public TicketType GetTicketTypeById(string id)
        {
            return _ticketTypeRepo.GetAll().FirstOrDefault(e => e.Id.Equals(id));
        }
        //Add Ticket Type
        public bool Add(TicketType ticketType)
        {
            try
            {
                _ticketTypeRepo.Add(ticketType);
                _ticketTypeRepo.SaveDbChange();
                return true;
            }
            catch
            {
                return false;
            }
        }
        //Delete Ticket Type 
        public bool Delete(string id)
        {
            try
            {
                var objFromDb = _ticketTypeRepo.Get(id);
                if (objFromDb != null)
                {
                    _ticketTypeRepo.Remove(id);
                    _ticketTypeRepo.SaveDbChange();
                    return true;
                }
            }
            catch
            {
                return false;
            }
            return false;
        }
        //Update Ticket Type  
        public bool Update(TicketType ticketType)
        {
            try
            {
                _ticketTypeRepo.Update(ticketType);
                _ticketTypeRepo.SaveDbChange();
                return true;
            }
            catch
            {
                return false;
            }
        }

        public PagedList<TicketType> GetBy(TicketTypeParameter ticketType, PagingParameter paging)
        {

            var values = _ticketTypeRepo.GetAll(includeProperties: ticketType.includeProperties);

            if (ticketType.Id != null)
            {
                values = values.Where(x => x.Id == ticketType.Id);
            }
            if (!string.IsNullOrWhiteSpace(ticketType.Name))
            {
                values = values.Where(x => x.Name.Contains(ticketType.Name, StringComparison.InvariantCultureIgnoreCase));
            }
            if (ticketType.BonusPoint != null)
            {
                values = values.Where(x => x.BonusPoint == ticketType.BonusPoint);
            }
            if (ticketType.Price != null)
            {
                values = values.Where(x => x.Price == ticketType.Price);
            }

            if (!string.IsNullOrWhiteSpace(ticketType.sort))
            {
                switch (ticketType.sort)
                {
                    case "Id":
                        if (ticketType.dir == "asc")
                            values = values.OrderBy(d => d.Id);
                        else if (ticketType.dir == "desc")
                            values = values.OrderByDescending(d => d.Id);
                        break;
                }
            }

            return PagedList<TicketType>.ToPagedList(values.AsQueryable(),
            paging.PageNumber,
            paging.PageSize);
        }
    }
}
