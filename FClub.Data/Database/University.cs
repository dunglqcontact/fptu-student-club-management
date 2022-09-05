using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

#nullable disable

namespace FClub.Data.Database
{
    [Table("University")]
    [Index(nameof(Id), Name = "i")]
    public partial class University
    {
        public University()
        {
            Clubs = new HashSet<Club>();
            UserInfos = new HashSet<UserInfo>();
        }

        [Key]
        [Column("id")]
        [StringLength(32)]
        public string Id { get; set; }
        [Required]
        [Column("name")]
        [StringLength(256)]
        public string Name { get; set; }
        [Required]
        [Column("logo")]
        [StringLength(256)]
        public string Logo { get; set; }
        [Column("address")]
        [StringLength(256)]
        public string Address { get; set; }

        [InverseProperty(nameof(Club.University))]
        public virtual ICollection<Club> Clubs { get; set; }
        [InverseProperty(nameof(UserInfo.University))]
        public virtual ICollection<UserInfo> UserInfos { get; set; }
    }
}
