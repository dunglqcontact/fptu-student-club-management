using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

#nullable disable

namespace FClub.Data.Database
{
    [Table("TicketType")]
    [Index(nameof(Id), Name = "i")]
    public partial class TicketType
    {
        public TicketType()
        {
            EventTickets = new HashSet<EventTicket>();
        }

        [Key]
        [Column("id")]
        [StringLength(32)]
        public string Id { get; set; }
        [Required]
        [Column("name")]
        [StringLength(256)]
        public string Name { get; set; }
        [Column("bonus_point", TypeName = "numeric(19, 5)")]
        public decimal? BonusPoint { get; set; }
        [Column("price", TypeName = "numeric(19, 5)")]
        public decimal? Price { get; set; }

        [InverseProperty(nameof(EventTicket.TicketType))]
        public virtual ICollection<EventTicket> EventTickets { get; set; }
    }
}
