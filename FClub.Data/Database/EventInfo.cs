using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

#nullable disable

namespace FClub.Data.Database
{
    [Table("EventInfo")]
    public partial class EventInfo
    {
        public EventInfo()
        {
            Participants = new HashSet<Participant>();
        }

        [Key]
        [Column("id")]
        public int Id { get; set; }
        [Column("creator_id")]
        public int CreatorId { get; set; }
        [Required]
        [Column("title")]
        [StringLength(256)]
        public string Title { get; set; }
        [Required]
        [Column("content")]
        [StringLength(3000)]
        public string Content { get; set; }
        [Column("create_date", TypeName = "date")]
        public DateTime? CreateDate { get; set; }
        [Column("regis_date", TypeName = "date")]
        public DateTime RegisDate { get; set; }
        [Column("end_regis_date", TypeName = "date")]
        public DateTime EndRegisDate { get; set; }
        [Column("begin_date", TypeName = "date")]
        public DateTime BeginDate { get; set; }
        [Column("due_date", TypeName = "date")]
        public DateTime DueDate { get; set; }
        [Column("bonus_point", TypeName = "numeric(19, 5)")]
        public decimal? BonusPoint { get; set; }
        [Column("limit_join")]
        public int? LimitJoin { get; set; }
        [Column("image")]
        [StringLength(256)]
        public string Image { get; set; }
        [Column("location")]
        [StringLength(256)]
        public string Location { get; set; }
        [Column("status")]
        public bool? Status { get; set; }

        [ForeignKey(nameof(CreatorId))]
        [InverseProperty(nameof(Member.EventInfos))]
        public virtual Member Creator { get; set; }
        [InverseProperty(nameof(Participant.Event))]
        public virtual ICollection<Participant> Participants { get; set; }
    }
}
