using System;
using System.Collections.Generic;
using System.Text;

namespace FClub.Data.Helper
{
    public class TicketTypeParameter
    {
        public string Id { get; set; } = null;
        public string Name { get; set; } = null;
        public int? BonusPoint { get; set; } = null;
        public decimal? Price { get; set; } = null;
        public string dir { get; set; } = "asc";
        public string sort { get; set; } = null;
        public string fields { get; set; } = null;
        public string includeProperties { get; set; } = null;
    }
}
