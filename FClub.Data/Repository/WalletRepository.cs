using FClub.Data.Database;
using FClub.Data.Interface;
using FClub.Data.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace FClub.Data.Repository
{
    public class WalletRepository : Repository<Wallet>, IWalletRepository
    {
        private readonly ClubManagementDBContext _db;
        public WalletRepository(ClubManagementDBContext db) : base(db)
        {
            _db = db;
        }
    }
}
