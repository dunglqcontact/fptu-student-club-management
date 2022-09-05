using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

#nullable disable

namespace FClub.Data.Database
{
    [Table("UserInfo")]
    public partial class UserInfo
    {
        public UserInfo()
        {
            Members = new HashSet<Member>();
        }

        [Key]
        [Column("id")]
        public int Id { get; set; }
        [Required]
        [Column("university_id")]
        [StringLength(32)]
        public string UniversityId { get; set; }
        [Required]
        [Column("email")]
        [StringLength(256)]
        public string Email { get; set; }
        [Column("password")]
        [StringLength(256)]
        public string Password { get; set; }
        [Required]
        [Column("name")]
        [StringLength(256)]
        public string Name { get; set; }
        [Column("phone")]
        [StringLength(32)]
        public string Phone { get; set; }
        [Column("birthday", TypeName = "date")]
        public DateTime? Birthday { get; set; }
        [Column("gender")]
        public int? Gender { get; set; }
        [Column("photo")]
        [StringLength(256)]
        public string Photo { get; set; }
        [Column("bio")]
        [StringLength(3000)]
        public string Bio { get; set; }
        [Column("isAdmin")]
        public bool IsAdmin { get; set; }
        [Required]
        [Column("status")]
        public bool? Status { get; set; }
        [Column("device_id")]
        [StringLength(500)]
        public string DeviceId { get; set; }

        [ForeignKey(nameof(UniversityId))]
        [InverseProperty("UserInfos")]
        public virtual University University { get; set; }
        [InverseProperty(nameof(Member.User))]
        public virtual ICollection<Member> Members { get; set; }
    }
}
