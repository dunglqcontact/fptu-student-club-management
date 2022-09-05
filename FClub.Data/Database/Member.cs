using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

#nullable disable

namespace FClub.Data.Database
{
    [Table("Member")]
    public partial class Member
    {
        public Member()
        {
            EventInfos = new HashSet<EventInfo>();
            MemberTasks = new HashSet<MemberTask>();
            News = new HashSet<News>();
            Participants = new HashSet<Participant>();
            Tasks = new HashSet<Task>();
            Wallets = new HashSet<Wallet>();
        }

        [Key]
        [Column("id")]
        public int Id { get; set; }
        [Column("user_id")]
        public int UserId { get; set; }
        [Required]
        [Column("club_id")]
        [StringLength(32)]
        public string ClubId { get; set; }
        [Column("role_id")]
        public int RoleId { get; set; }
        [Column("status")]
        public bool? Status { get; set; }
        [Column("isApproved")]
        public bool IsApproved { get; set; }

        [ForeignKey(nameof(ClubId))]
        [InverseProperty("Members")]
        public virtual Club Club { get; set; }
        [ForeignKey(nameof(RoleId))]
        [InverseProperty("Members")]
        public virtual Role Role { get; set; }
        [ForeignKey(nameof(UserId))]
        [InverseProperty(nameof(UserInfo.Members))]
        public virtual UserInfo User { get; set; }
        [InverseProperty(nameof(EventInfo.Creator))]
        public virtual ICollection<EventInfo> EventInfos { get; set; }
        [InverseProperty(nameof(MemberTask.Member))]
        public virtual ICollection<MemberTask> MemberTasks { get; set; }
        [InverseProperty("Creator")]
        public virtual ICollection<News> News { get; set; }
        [InverseProperty(nameof(Participant.Member))]
        public virtual ICollection<Participant> Participants { get; set; }
        [InverseProperty(nameof(Task.Creator))]
        public virtual ICollection<Task> Tasks { get; set; }
        [InverseProperty(nameof(Wallet.Member))]
        public virtual ICollection<Wallet> Wallets { get; set; }
    }
}
