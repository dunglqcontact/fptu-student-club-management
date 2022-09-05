using System;
using System.Collections.Generic;
using System.Text;

namespace FClub.Data.Helper
{
    public class ClubParameter
    {
        public string id { get; set; } = null;
        public string name { get; set; } = null;
        public string universityID { get; set; } = null;
        public bool Status { get; set; } = true;
        public string dir { get; set; } = "asc";
        public string sort { get; set; } = null;
        public string fields { get; set; } = null;
        public string includeProperties { get; set; } = null;
    }
}
