using System;
using System.Collections.Generic;
using System.Text;

namespace FClub.Data.Helper
{
    public class ParticipantParameter
    {
        public int? Id { get; set; } = null;
        public int? EventId { get; set; } = null;
        public int? MemberId { get; set; } = null;
        public DateTime? RegisDate { get; set; } = null;
        public decimal? BonusPoint { get; set; } = null;
        public bool? Attendance { get; set; } = null;

        public string dir { get; set; } = "asc";
        public string sort { get; set; } = null;
        public string fields { get; set; } = null;
        public string includeProperties { get; set; } = null;
    }
}
