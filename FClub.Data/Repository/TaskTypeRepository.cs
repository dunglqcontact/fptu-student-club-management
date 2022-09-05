using FClub.Data.Database;
using FClub.Data.Interface;
using System;
using System.Collections.Generic;
using System.Text;

namespace FClub.Data.Repository
{
    public class TaskTypeRepository : Repository<TaskType>, ITaskTypeRepository
    {
        ClubManagementDBContext _dbContext;

        public TaskTypeRepository(ClubManagementDBContext ClubManagementDBContext) : base(ClubManagementDBContext)
        {
            _dbContext = ClubManagementDBContext;
        }
    }
}
