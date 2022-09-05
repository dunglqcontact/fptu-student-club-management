using FClub.Data.Database;
using FClub.Data.Interface;
using System;
using System.Collections.Generic;
using System.Text;

namespace FClub.Data.Repository
{
    public class NewsRepository : Repository<News>, INewsRepository
    {
        ClubManagementDBContext _dbContext;

        public NewsRepository(ClubManagementDBContext ClubManagementDBContext) : base(ClubManagementDBContext)
        {
            _dbContext = ClubManagementDBContext;
        }
    }
}
