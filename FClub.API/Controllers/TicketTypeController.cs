using FClub.Business.Service;
using FClub.Data.Database;
using FClub.Data.Helper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System;

namespace FClub.API.Controllers
{
    [Route("api/v1/ticket-types")]
    [ApiController]
    [Authorize]
    public class TicketTypeController : ControllerBase
    {
        private readonly TicketTypeService _ticketTypeService;

        public TicketTypeController(TicketTypeService ticketTypeService)
        {
            _ticketTypeService = ticketTypeService;
        }

        [HttpGet]
        public IActionResult GetTicketType([FromQuery] TicketTypeParameter ticketType, [FromQuery] PagingParameter param)
        {
            var data = _ticketTypeService.GetBy(ticketType, param);
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
        public IActionResult AddType(TicketType ticketType)
        {
            if(_ticketTypeService.Add(ticketType))
            {
                return Ok();
            }
            else
            {
                return BadRequest();
            }
        }


        [HttpPut]
        public IActionResult UpdateType(TicketType ticketType)
        {
            if (_ticketTypeService.Update(ticketType))
            {
                return Ok();
            }
            else
            {
                return BadRequest();
            }
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteType(string id)
        {
            if (_ticketTypeService.Delete(id))
            {
                return Ok();
            }
                return BadRequest();
        }
    }
}
