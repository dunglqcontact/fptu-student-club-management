using FClub.Data.Database;
using FClub.Data.Interface;
using System;
using System.Collections.Generic;
using System.Text;

namespace FClub.Data.Repository
{
    public class RoleRepository : Repository<Role>, IRoleRepository
    {
        ClubManagementDBContext _dbContext;

        public RoleRepository(ClubManagementDBContext ClubManagementDBContext) : base(ClubManagementDBContext)
        {
            _dbContext = ClubManagementDBContext;
        }
    }
}
