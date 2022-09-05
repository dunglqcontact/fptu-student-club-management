using System;
using System.Collections.Generic;
using System.Text;

namespace FClub.Data.Helper
{
    public class TaskParameter
    {
        public int? Id { get; set; } = null;
        
        public string TypeId { get; set; } = null;

        public int? CreatorId { get; set; } = null;

        public decimal? AwardPoint { get; set; } = null;

        public decimal? PennaltyPoint { get; set; } = null;

        public DateTime? CreateDate { get; set; } = null;

        public DateTime? BeginDate { get; set; } = null;

        public DateTime? DueDate { get; set; } = null;

        public string dir { get; set; } = "asc";
        public string sort { get; set; } = null;
        public string fields { get; set; } = null;
        public string includeProperties { get; set; } = null;
    }
}
