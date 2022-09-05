using System;
using System.Collections.Generic;
using System.Text;

namespace FClub.Data.Helper
{
    public class EventInfoParameter
    {
        public int? Id { get; set; } = null;
        public int? CreatorId { get; set; } = null;
        public string Title { get; set; } = null;
        public string Content { get; set; } = null;
        public DateTime? CreateDate { get; set; } = null;
        public DateTime? RegisDate { get; set; } = null;
        public DateTime? EndRegisDate { get; set; } = null;
        public DateTime? BeginDate { get; set; } = null;
        public DateTime? DueDate { get; set; } = null;
        public string Location { get; set; } = null;
        public bool? Status { get; set; } = null;

        public string dir { get; set; } = "asc";
        public string sort { get; set; } = null;
        public string fields { get; set; } = null;
        public string includeProperties { get; set; } = null;
    }
}
