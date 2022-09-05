using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

#nullable disable

namespace FClub.Data.Database
{
    [Table("Participant")]
    public partial class Participant
    {
        public Participant()
        {
            EventTickets = new HashSet<EventTicket>();
        }

        [Key]
        [Column("id")]
        public int Id { get; set; }
        [Column("event_id")]
        public int EventId { get; set; }
        [Column("member_id")]
        public int MemberId { get; set; }
        [Column("regis_date", TypeName = "date")]
        public DateTime? RegisDate { get; set; }
        [Column("bonus_point", TypeName = "numeric(19, 5)")]
        public decimal? BonusPoint { get; set; }
        [Column("attendance")]
        public bool? Attendance { get; set; }
        [Column("rate")]
        public double? Rate { get; set; }

        [ForeignKey(nameof(EventId))]
        [InverseProperty(nameof(EventInfo.Participants))]
        public virtual EventInfo Event { get; set; }
        [ForeignKey(nameof(MemberId))]
        [InverseProperty("Participants")]
        public virtual Member Member { get; set; }
        [InverseProperty(nameof(EventTicket.Participant))]
        public virtual ICollection<EventTicket> EventTickets { get; set; }
    }
}
