using System;
using System.Collections.Generic;
using System.Text;

namespace FClub.Data.Helper
{
    public class TransactionDetailParameter
    {
        public int? id { get; set; } = null;
        public int? walletId { get; set; } = null;
        public DateTime? createDate { get; set; } = null;
        public string dir { get; set; } = "asc";
        public string sort { get; set; } = null;
        public string fields { get; set; } = null;
    }
}
