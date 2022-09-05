using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

#nullable disable

namespace FClub.Data.Database
{
    [Table("Task")]
    public partial class Task
    {
        public Task()
        {
            MemberTasks = new HashSet<MemberTask>();
        }

        [Key]
        [Column("id")]
        public int Id { get; set; }
        [Required]
        [Column("type_id")]
        [StringLength(32)]
        public string TypeId { get; set; }
        [Column("creator_id")]
        public int CreatorId { get; set; }
        [Column("award_point", TypeName = "numeric(19, 5)")]
        public decimal? AwardPoint { get; set; }
        [Column("pennalty_point", TypeName = "numeric(19, 5)")]
        public decimal? PennaltyPoint { get; set; }
        [Column("create_date", TypeName = "date")]
        public DateTime? CreateDate { get; set; }
        [Column("begin_date", TypeName = "date")]
        public DateTime BeginDate { get; set; }
        [Column("due_date", TypeName = "date")]
        public DateTime DueDate { get; set; }
        [Required]
        [Column("title")]
        [StringLength(256)]
        public string Title { get; set; }
        [Column("content")]
        [StringLength(3000)]
        public string Content { get; set; }
        [Column("limit_join")]
        public int? LimitJoin { get; set; }
        [Column("status")]
        public bool? Status { get; set; }

        [ForeignKey(nameof(CreatorId))]
        [InverseProperty(nameof(Member.Tasks))]
        public virtual Member Creator { get; set; }
        [ForeignKey(nameof(TypeId))]
        [InverseProperty(nameof(TaskType.Tasks))]
        public virtual TaskType Type { get; set; }
        [InverseProperty(nameof(MemberTask.Task))]
        public virtual ICollection<MemberTask> MemberTasks { get; set; }
    }
}
