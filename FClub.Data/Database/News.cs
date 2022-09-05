using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

#nullable disable

namespace FClub.Data.Database
{
    public partial class News
    {
        [Key]
        [Column("id")]
        public int Id { get; set; }
        [Required]
        [Column("topic")]
        [StringLength(256)]
        public string Topic { get; set; }
        [Column("content")]
        [StringLength(3000)]
        public string Content { get; set; }
        [Column("creator_id")]
        public int CreatorId { get; set; }
        [Column("create_date", TypeName = "date")]
        public DateTime? CreateDate { get; set; }
        [Column("status")]
        public bool? Status { get; set; }

        [ForeignKey(nameof(CreatorId))]
        [InverseProperty(nameof(Member.News))]
        public virtual Member Creator { get; set; }
    }
}
