using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

#nullable disable

namespace FClub.Data.Database
{
    [Table("Club")]
    [Index(nameof(Id), Name = "i")]
    public partial class Club
    {
        public Club()
        {
            Members = new HashSet<Member>();
        }

        [Key]
        [Column("id")]
        [StringLength(32)]
        public string Id { get; set; }
        [Required]
        [Column("university_id")]
        [StringLength(32)]
        public string UniversityId { get; set; }
        [Required]
        [Column("name")]
        [StringLength(256)]
        public string Name { get; set; }
        [Column("balance", TypeName = "numeric(19, 5)")]
        public decimal? Balance { get; set; }
        [Required]
        [Column("logo")]
        [StringLength(256)]
        public string Logo { get; set; }
        [Column("about")]
        [StringLength(3000)]
        public string About { get; set; }
        [Required]
        [Column("status")]
        public bool? Status { get; set; }

        [ForeignKey(nameof(UniversityId))]
        [InverseProperty("Clubs")]
        public virtual University University { get; set; }
        [InverseProperty(nameof(Member.Club))]
        public virtual ICollection<Member> Members { get; set; }
    }
}
