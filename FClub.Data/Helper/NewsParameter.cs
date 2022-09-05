using System;
using System.Collections.Generic;
using System.Text;

namespace FClub.Data.Helper
{
    public class NewsParameter
    {
        public int? Id { get; set; } = null;
        public string Topic { get; set; } = null;
        public string Content { get; set; } = null;
        public int? CreatorId { get; set; } = null;
        public DateTime? CreateDate { get; set; } = null;
        public bool? Status { get; set; } = null;
        public string dir { get; set; } = "asc";
        public string sort { get; set; } = null;
        public string fields { get; set; } = null;
        public string includeProperties { get; set; } = null;
    }
}
