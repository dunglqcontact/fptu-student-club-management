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
    [Route("api/v1/member-tasks")]
    [ApiController]
    [Authorize]
    public class MemberTaskController : ControllerBase
    {
        private readonly MemberTaskService _memberTaskService;

        public MemberTaskController(MemberTaskService memberTaskService)
        {
            _memberTaskService = memberTaskService;
        }

        [HttpGet]
        public ActionResult<PagedList<MemberTask>> GetMemberTasks([FromQuery] MemberTaskParameter memberTask, [FromQuery] PagingParameter paging)
        {
            var data = _memberTaskService.GetAllMemberTask(memberTask, paging);
            var metadata = new
            {
                data.TotalCount,
                data.PageSize,
                data.CurrentPage,
                data.TotalPages,
                data.HasNext,
                data.HasPrevious
            };
            return Ok(new { data, metadata });
        }

        [HttpPost]
        public IActionResult AddMemberTask(MemberTask memberTask)
        {
            if(_memberTaskService.Add(memberTask))
            {
                return Ok();
            }
            else
            {
                return BadRequest();
            }
        }


        [HttpPut]
        public IActionResult UpdateMemberTask(MemberTask memberTask)
        {
            if (_memberTaskService.Update(memberTask))
            {
                return Ok();
            }
            else
            {
                return BadRequest();
            }
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteMemberTaskById(int id)
        {
            if (_memberTaskService.DeleteById(id))
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
