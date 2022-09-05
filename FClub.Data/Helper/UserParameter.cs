using System;
using System.Collections.Generic;
using System.Text;

namespace FClub.Data.Helper
{
    public class UserParameter
    {
        public int? id { get; set; } = null;
        public string name { get; set; } = null;
        public string email { get; set; } = null;
        public string phone { get; set; } = null;
        public bool? IsAdmin { get; set; } = null;
        public bool? Status { get; set; } = null;
        public string dir { get; set; } = "asc";
        public string sort { get; set; } = null;
        public string fields { get; set; } = null;
        public string includeProperties { get; set; } = null;

    }
}
