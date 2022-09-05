using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

#nullable disable

namespace FClub.Data.Database
{
    [Table("TransactionDetail")]
    public partial class TransactionDetail
    {
        [Key]
        [Column("id")]
        public int Id { get; set; }
        [Column("wallet_id")]
        public int WalletId { get; set; }
        [Column("trans_point", TypeName = "numeric(19, 5)")]
        public decimal? TransPoint { get; set; }
        [Column("content")]
        [StringLength(256)]
        public string Content { get; set; }
        [Column("create_date", TypeName = "date")]
        public DateTime? CreateDate { get; set; }

        [ForeignKey(nameof(WalletId))]
        [InverseProperty("TransactionDetails")]
        public virtual Wallet Wallet { get; set; }
    }
}
