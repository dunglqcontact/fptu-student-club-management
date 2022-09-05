using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

#nullable disable

namespace FClub.Data.Database
{
    [Table("MemberTask")]
    public partial class MemberTask
    {
        [Key]
        [Column("id")]
        public int Id { get; set; }
        [Column("task_id")]
        public int TaskId { get; set; }
        [Column("member_id")]
        public int MemberId { get; set; }
        [Column("complete_date", TypeName = "date")]
        public DateTime? CompleteDate { get; set; }
        [Column("award_point", TypeName = "numeric(19, 5)")]
        public decimal? AwardPoint { get; set; }
        [Column("evidence")]
        [StringLength(256)]
        public string Evidence { get; set; }
        [Column("isFinish")]
        public bool? IsFinish { get; set; }

        [ForeignKey(nameof(MemberId))]
        [InverseProperty("MemberTasks")]
        public virtual Member Member { get; set; }
        [ForeignKey(nameof(TaskId))]
        [InverseProperty("MemberTasks")]
        public virtual Task Task { get; set; }
    }
}
