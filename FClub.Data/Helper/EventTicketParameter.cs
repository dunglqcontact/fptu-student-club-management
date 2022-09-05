using System;
using System.Collections.Generic;
using System.Text;

namespace FClub.Data.Helper
{
    public class EventTicketParameter
    {
        public int? Id { get; set; } = null;
        public int? ParticipantId { get; set; } = null;
        public string TicketTypeId { get; set; } = null;

        public string dir { get; set; } = "asc";
        public string sort { get; set; } = null;
        public string fields { get; set; } = null;
        public string includeProperties { get; set; } = null;
    }
}
