using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

#nullable disable

namespace FClub.Data.Database
{
    [Table("Role")]
    [Index(nameof(Id), Name = "i")]
    public partial class Role
    {
        public Role()
        {
            Members = new HashSet<Member>();
        }

        [Key]
        [Column("id")]
        public int Id { get; set; }
        [Required]
        [Column("name")]
        [StringLength(256)]
        public string Name { get; set; }

        [InverseProperty(nameof(Member.Role))]
        public virtual ICollection<Member> Members { get; set; }
    }
}
