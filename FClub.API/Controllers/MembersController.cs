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
    [Route("api/v1/members")]
    [Authorize]
    [ApiController]
    public class MembersController : ControllerBase
    {
        private readonly MemberService _service;
        private readonly FCMService _noti;
        private readonly ClubService _clubService;
        private readonly UserInforService _userService;

        public MembersController(MemberService service, FCMService noti, ClubService clubService, UserInforService userService)
        {
            _service = service;
            _noti = noti;
            _clubService = clubService;
            _userService = userService;
        }

        [HttpGet]
        public ActionResult<PagedList<Member>> Get([FromQuery] MemberParameter member, [FromQuery] PagingParameter paging)
        {
            var data = _service.GetBy(member, paging);
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

        [HttpGet]
        [Route("count")]
        public ActionResult<int> Count(string ClubId)
        {
            return Ok(_service.CountByClub(ClubId));
        }

        [HttpPost]
        public IActionResult Create(Member _object)
        {
            try
            {
                _service.Create(_object);
                return Ok();
            }
            catch
            {
                return BadRequest();
            }
        }

        [HttpPut]
        [Route("approved")]
        public IActionResult Approved(int id)
        {
            var member = _service.GetById(id);
            if (member == null)
            {
                return NotFound();
            }
            member.IsApproved = true;
            _service.Update(member);

            Club club = _clubService.GetClubById(_service.GetById(member.Id).ClubId);

            List<string> registrationTokens = new List<string>();

            //registrationTokens.Add("csgoZF1BTLKWX8z1ldqGnn:APA91bG9aJAz88dH84X1bPGCMWWptdcPVZijpdjWyM-xUf8Kwtv7iA959xXE1k8UNZyYl6B5OPOtcRoscvagI8SZRblwWBtzxkEo3M-KUkslMez_vq36nggFYT1RWT9MWTSHyhVP9WIA");
            //registrationTokens.Add("dYe7INjeQm2bmIf6AUypKM:APA91bGRQPU7vWYqt_jTezFCjncLcMb0LfovTtMtXIuxEOPg3TLbxTWCVfJpZpUinhzUGGGbQFzKRxGlLhKrUwb6bdBC32Y7ZIkY-A1oNe7Kc7snIEXyuvNRf5vdt9bTV9lgv88pIwEZ");
            //registrationTokens.Add("elvZ4HINTAiHUeHP2NHSF9:APA91bFPL52KFOrzUHZF71N6eycBfHR49G7UKSCtVjeWQDQvWju6nZEzSUBmxLgZrH-bTiovDYLHiawiT4ioLczFxE7xc3AJHggIcPqyjshOuHqGnP_Xx7ow8QZdlAKw5uNzZh4_hRh1");

            var deviceId = _userService.GetUsersById(member.UserId).DeviceId;
            if (deviceId != null && !registrationTokens.Contains(deviceId))
            {
                registrationTokens.Add(deviceId);
                Console.WriteLine(deviceId);
            }

            Dictionary<string, string> data = new Dictionary<string, string>();
            data.Add("MemberId", id + "");
            data.Add("ClubID", club.Id);
            //data.Add("Content", eventinfo.Content);

            string clubname = club.Name;

            _noti.SendNoti(registrationTokens, data, "Approved!!!", "Your request to " + clubname + " is approved! Let's go!");

            return Ok();
        }

        [HttpPut]
        public IActionResult Update(Member _object)
        {
            if (_service.GetById(_object.Id) == null)
            {
                return NotFound();
            }
            _service.Update(_object);
            return Ok();
        }

        [HttpPut]
        [Route("ban")]
        public IActionResult ChangeMemberStatus(int id)
        {
            if (_service.GetById(id) == null)
            {
                return NotFound();
            }
            _service.ChangeStatus(id);
            return Ok();
        }

        [HttpPut]
        [Route("update-role")]
        public IActionResult ChangeMemberRole(int id, int roleId)
        {
            if (_service.GetById(id) == null)
            {
                return NotFound();
            }
            _service.ChangeRole(id, roleId);
            return Ok();
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            if (_service.GetById(id) == null)
            {
                return NotFound();
            }
            _service.Delete(_service.GetById(id));
            return Ok();
        }
    }
}
