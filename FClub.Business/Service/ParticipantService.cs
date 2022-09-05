using FClub.Data.Database;
using FClub.Data.Helper;
using FClub.Data.Interface;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace FClub.Business.Service
{
    public class ParticipantService
    {
        private readonly IParticipantRepository _participantRepo;

        public ParticipantService(IParticipantRepository participantRepo)
        {
            _participantRepo = participantRepo;
        }

        //GET All Participant
        public IEnumerable<Participant> GetAll()
        {
            return _participantRepo.GetAll().ToList();
        }

        //Get Participant By Event
        public IEnumerable<Participant> GetParticipantByEvent(int eventId)
        {
            return _participantRepo.GetParticipantByEvent(eventId);
        }
        //Get Participant By Attendance
        public IEnumerable<Participant> GetParticipantByAttendance(bool attended)
        {
            return _participantRepo.GetParticipantByAttendance(attended);
        }

        //Add Participant
        public bool Add(Participant participant)
        {
            try
            {
                var check = _participantRepo.GetFirstOrDefault(x => x.EventId == participant.EventId && x.MemberId == participant.MemberId);
                if (check != null) throw new Exception(message: "Joined!!!");
                _participantRepo.Add(participant);
                _participantRepo.SaveDbChange();
                return true;
            }
            catch
            {
                return false;
            }
        }
        //Delete Participant 
        public bool Delete(int id)
        {
            try
            {
                var objFromDb = _participantRepo.Get(id);
                if (objFromDb != null)
                {
                    _participantRepo.Remove(id);
                    _participantRepo.SaveDbChange();
                    return true;
                }
            }
            catch
            {
                return false;
            }
            return false;
        }
        //Update Participant  
        public bool Update(Participant participant)
        {
            try
            {
                _participantRepo.Update(participant);
                _participantRepo.SaveDbChange();
                return true;
            }
            catch
            {
                return false;
            }
        }

        public PagedList<Participant> GetBy(ParticipantParameter participant, PagingParameter paging)
        {

            var values = _participantRepo.GetAll(includeProperties: participant.includeProperties);

            if (participant.Id != null)
            {
                values = values.Where(x => x.Id == participant.Id);
            }
            if (participant.EventId != null)
            {
                values = values.Where(x => x.EventId == participant.EventId);
            }
            if (participant.RegisDate != null)
            {
                values = values.Where(x => x.RegisDate == participant.RegisDate);
            }
            if (participant.MemberId != null)
            {
                values = values.Where(x => x.MemberId == participant.MemberId);
            }
            if (participant.BonusPoint != null)
            {
                values = values.Where(x => x.BonusPoint == participant.BonusPoint);
            }
            if (participant.Attendance != null)
            {
                values = values.Where(x => x.Attendance == participant.Attendance);
            }

            if (!string.IsNullOrWhiteSpace(participant.sort))
            {
                switch (participant.sort)
                {
                    case "Id":
                        if (participant.dir == "asc")
                            values = values.OrderBy(d => d.Id);
                        else if (participant.dir == "desc")
                            values = values.OrderByDescending(d => d.Id);
                        break;
                    case "RegisDate":
                        if (participant.dir == "asc")
                            values = values.OrderBy(d => d.RegisDate);
                        else if (participant.dir == "desc")
                            values = values.OrderByDescending(d => d.RegisDate);
                        break;
                }
            }

            return PagedList<Participant>.ToPagedList(values.AsQueryable(),
            paging.PageNumber,
            paging.PageSize);
        }

        public Participant GetParticipant(int id)
        {
            var participant = _participantRepo.Get(id);
            return participant;
        }
    }
}
