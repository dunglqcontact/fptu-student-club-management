using System;
using System.Collections.Generic;
using System.Text;

namespace FClub.Data.Helper
{
    public class UniversityParameter
    {
        public string id { get; set; } = null;
        public string name { get; set; } = null;
        public string address { get; set; } = null;
        public string dir { get; set; } = "asc";
        public string sort { get; set; } = null;
        public string fields { get; set; } = null;
        public string includeProperties { get; set; } = null;
    }
}
