using FClub.Data.Database;
using FClub.Data.Interface;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FClub.Data.Repository
{
    public class UserInfoRepository : Repository<UserInfo>, IUserInfoRepository
    {
        ClubManagementDBContext _dbContext;

        public UserInfoRepository(ClubManagementDBContext ClubManagementDBContext) : base(ClubManagementDBContext)
        {
            _dbContext = ClubManagementDBContext;
        }
    }
}
