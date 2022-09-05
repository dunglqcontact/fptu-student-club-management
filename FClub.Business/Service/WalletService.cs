using FClub.Data.Database;
using FClub.Data.Helper;
using FClub.Data.Interface;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace FClub.Business.Service
{
    public class WalletService
    {
        private readonly IWalletRepository _walletRepository;

        public WalletService(IWalletRepository walletRepository)
        {
            _walletRepository = walletRepository;
        }


        public bool Add(Wallet wallet)
        {
            try
            {
                if (_walletRepository.GetAll().Where(x => x.MemberId == wallet.MemberId).FirstOrDefault() != null)
                {
                    return false;
                }
                _walletRepository.Add(wallet);
                _walletRepository.SaveDbChange();
                return true;
            }
            catch
            {
                return false;
            }
           
        }

        public bool Update(Wallet wallet)
        {
            try
            {
                _walletRepository.Update(wallet);
                _walletRepository.SaveDbChange();
                return true;
            }
            catch
            {
                return false;
            }
        }

        public bool DeleteById(int id)
        {
            var objFromDb = _walletRepository.Get(id);
            if(objFromDb == null)
            {
                return false;
            }
            _walletRepository.Remove(id);
            _walletRepository.SaveDbChange();
            return true;
        }

        public Wallet GetWalletById(int id)
        {
            var wallet = _walletRepository.Get(id);
            return wallet;
        }

        public PagedList<Wallet> GetAllWallet(WalletParameter wallet, PagingParameter paging)
        {
            var values = _walletRepository.GetAll();

            if (wallet.id != null)
            {
                values = values.Where(x => x.Id == wallet.id);
            }
            if (wallet.memberId != null)
            {
                values = values.Where(x => x.MemberId == wallet.memberId);
            }
            if (!string.IsNullOrWhiteSpace(wallet.sort))
            {
                switch (wallet.sort)
                {
                    case "Id":
                        if (wallet.dir == "asc")
                            values = values.OrderBy(d => d.Id);
                        else if (wallet.dir == "desc")
                            values = values.OrderByDescending(d => d.Id);
                        break;
                    case "MemberId":
                        if (wallet.dir == "asc")
                            values = values.OrderBy(d => d.MemberId);
                        else if (wallet.dir == "desc")
                            values = values.OrderByDescending(d => d.MemberId);
                        break;
                }
            }

            return PagedList<Wallet>.ToPagedList(values.AsQueryable(),
            paging.PageNumber,
            paging.PageSize);
        }
        /*    public IEnumerable<Wallet> GetListDes()
            {
                var walletList = _walletRepository.GetAll(orderBy: x => x.);
                return walletList;
            }*/
    }
}
