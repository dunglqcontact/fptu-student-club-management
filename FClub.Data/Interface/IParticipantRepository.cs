using FClub.Data.Database;
using System;
using System.Collections.Generic;
using System.Text;

namespace FClub.Data.Interface
{
    public interface IParticipantRepository : IRepository<Participant>
    {
        IEnumerable<Participant> GetParticipantByEvent(int parId);
        IEnumerable<Participant> GetParticipantByAttendance(bool Attended);
    }
}