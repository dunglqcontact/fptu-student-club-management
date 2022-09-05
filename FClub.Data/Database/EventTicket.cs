using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

#nullable disable

namespace FClub.Data.Database
{
    [Table("EventTicket")]
    public partial class EventTicket
    {
        [Key]
        [Column("id")]
        public int Id { get; set; }
        [Column("participant_id")]
        public int ParticipantId { get; set; }
        [Required]
        [Column("ticket_type_id")]
        [StringLength(32)]
        public string TicketTypeId { get; set; }

        [ForeignKey(nameof(ParticipantId))]
        [InverseProperty("EventTickets")]
        public virtual Participant Participant { get; set; }
        [ForeignKey(nameof(TicketTypeId))]
        [InverseProperty("EventTickets")]
        public virtual TicketType TicketType { get; set; }
    }
}
