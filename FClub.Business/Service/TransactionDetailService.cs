using FClub.Data.Database;
using FClub.Data.Helper;
using FClub.Data.Interface;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace FClub.Business.Service
{
    public class TransactionDetailService
    {
        private readonly ITransactionDetailRepository _transactionDetailRepository;

        public TransactionDetailService(ITransactionDetailRepository transactionDetailRepository)
        {
            _transactionDetailRepository = transactionDetailRepository;
        }


        public bool Add(TransactionDetail transactionDetail)
        {
            try
            {
                _transactionDetailRepository.Add(transactionDetail);
                _transactionDetailRepository.SaveDbChange();
                return true;
            }
            catch
            {
                return false;
            }
           
        }

        public bool Update(TransactionDetail transactionDetail)
        {
            try
            {
                _transactionDetailRepository.Update(transactionDetail);
                _transactionDetailRepository.SaveDbChange();
                return true;
            }
            catch
            {
                return false;
            }
        }

        public bool DeleteById(int id)
        {
            var objFromDb = _transactionDetailRepository.Get(id);
            if(objFromDb == null)
            {
                return false;
            }
            _transactionDetailRepository.Remove(id);
            _transactionDetailRepository.SaveDbChange();
            return true;
        }

        public TransactionDetail GetTransactionDetailById(int id)
        {
            var transactionDetail = _transactionDetailRepository.Get(id);
            return transactionDetail;
        }

        public PagedList<TransactionDetail> GetAllTransactionDetail(TransactionDetailParameter transactionDetail, PagingParameter paging)
        {
            var values = _transactionDetailRepository.GetAll();

            if (transactionDetail.id != null)
            {
                values = values.Where(x => x.Id == transactionDetail.id);
            }
            if (transactionDetail.walletId != null)
            {
                values = values.Where(x => x.WalletId == transactionDetail.walletId);
            }
            if (transactionDetail.createDate != null)
            {
                values = values.Where(x => x.CreateDate == transactionDetail.createDate);
            }
            if (!string.IsNullOrWhiteSpace(transactionDetail.sort))
            {
                switch (transactionDetail.sort)
                {
                    case "Id":
                        if (transactionDetail.dir == "asc")
                            values = values.OrderBy(d => d.Id);
                        else if (transactionDetail.dir == "desc")
                            values = values.OrderByDescending(d => d.Id);
                        break;
                    case "WalletId":
                        if (transactionDetail.dir == "asc")
                            values = values.OrderBy(d => d.WalletId);
                        else if (transactionDetail.dir == "desc")
                            values = values.OrderByDescending(d => d.WalletId);
                        break;
                    case "CreateDate":
                        if (transactionDetail.dir == "asc")
                            values = values.OrderBy(d => d.CreateDate);
                        else if (transactionDetail.dir == "desc")
                            values = values.OrderByDescending(d => d.CreateDate);
                        break;
                }
            }

            return PagedList<TransactionDetail>.ToPagedList(values.AsQueryable(),
            paging.PageNumber,
            paging.PageSize);
        }
    }
}
