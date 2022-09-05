using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

#nullable disable

namespace FClub.Data.Database
{
    [Table("Wallet")]
    public partial class Wallet
    {
        public Wallet()
        {
            TransactionDetails = new HashSet<TransactionDetail>();
        }

        [Key]
        [Column("id")]
        public int Id { get; set; }
        [Column("member_id")]
        public int MemberId { get; set; }
        [Column("point", TypeName = "numeric(19, 5)")]
        public decimal? Point { get; set; }

        [ForeignKey(nameof(MemberId))]
        [InverseProperty("Wallets")]
        public virtual Member Member { get; set; }
        [InverseProperty(nameof(TransactionDetail.Wallet))]
        public virtual ICollection<TransactionDetail> TransactionDetails { get; set; }
    }
}
