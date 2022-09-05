using System;
using System.Collections.Generic;
using System.Text;

namespace FClub.Data.Helper
{
    public class WalletParameter
    {
        public int? id { get; set; } = null;
        public int? memberId { get; set; } = null;
        public string dir { get; set; } = "asc";
        public string sort { get; set; } = null;
        public string fields { get; set; } = null;
    }
}
