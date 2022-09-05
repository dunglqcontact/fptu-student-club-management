using FClub.Data.Database;
using FClub.Business.Service;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FClub.Data.Helper;
using Microsoft.AspNetCore.Authorization;

namespace FClub.API.Controllers
{
    [Route("api/v1/transaction-details")]
    [ApiController]
    [Authorize]
    public class TransactionDetailController : ControllerBase
    {
        private readonly TransactionDetailService _transactionDetailService;

        public TransactionDetailController(TransactionDetailService transactionDetailService)
        {
            _transactionDetailService = transactionDetailService;
        }

        [HttpGet]
        public ActionResult<PagedList<TransactionDetail>> GetTransactionDetails([FromQuery] TransactionDetailParameter transactionDetail, [FromQuery] PagingParameter paging)
        {
            var data = _transactionDetailService.GetAllTransactionDetail(transactionDetail, paging);
            return data;
        }

        [HttpPost]
        public IActionResult AddTransactionDetail(TransactionDetail transactionDetail)
        {
            if(_transactionDetailService.Add(transactionDetail))
            {
                return Ok();
            }
            else
            {
                return BadRequest();
            }
        }


        [HttpPut]
        public IActionResult UpdateTransactionDetail(TransactionDetail transactionDetail)
        {
            if (_transactionDetailService.Update(transactionDetail))
            {
                return Ok();
            }
            else
            {
                return BadRequest();
            }
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteTransactionDetailById(int id)
        {
            if (_transactionDetailService.DeleteById(id))
            {
                return Ok();
            }
            else
            {
                return BadRequest();
            }
        }
    }
}
