using FClub.Business.Service;
using FClub.Data.Database;
using FClub.Data.Helper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FClub.API.Controllers
{
    [Route("api/v1/event-tickets")]
    [ApiController]
    [Authorize]
    public class EventTicketController : ControllerBase
    {
        private readonly EventTicketService _ticketService;

        public EventTicketController(EventTicketService ticketService)
        {
            _ticketService = ticketService;
        }

        [HttpGet]
        public IActionResult GetEventTicket([FromQuery] EventTicketParameter eventTicket, [FromQuery] PagingParameter param)
        {
            var data = _ticketService.GetBy(eventTicket, param);
            var metadata = new
            {
                data.TotalCount,
                data.PageSize,
                data.CurrentPage,
                data.TotalPages,
                data.HasNext,
                data.HasPrevious
            };
            //Response.Headers.Add("X-Pagination", JsonConvert.SerializeObject(metadata));
            return Ok(new { data, metadata });
        }

        [HttpPost]
        public IActionResult AddTicket(EventTicket ticket)
        {
            if(_ticketService.Add(ticket))
            {
                return Ok();
            }
            else
            {
                return BadRequest();
            }
        }


        [HttpPut]
        public IActionResult UpdateTicket(EventTicket ticket)
        {
            if (_ticketService.Update(ticket))
            {
                return Ok();
            }
            else
            {
                return BadRequest();
            }
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteTicket(int id)
        {
            if (_ticketService.DeleteById(id))
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
