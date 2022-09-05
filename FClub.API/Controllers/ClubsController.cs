using FClub.Business.Service;
using FClub.Data.Database;
using Microsoft.AspNetCore.Authorization;
using FClub.Data.Helper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FClub.API.Controllers
{
    [Route("api/v1/clubs")]
    [ApiController]
    [Authorize]
    public class ClubsController : ControllerBase
    {
        private readonly ClubService _clubService;

        public ClubsController(ClubService clubService)
        {
            _clubService = clubService;
        }

        [HttpGet]
        public IActionResult GetClubs([FromQuery] ClubParameter club, [FromQuery] PagingParameter paging)
        {
            var data = _clubService.GetAllClub(club, paging);
            return Ok(data);
        }

        [HttpGet]
        [Route("withapproved")]
        public IActionResult GetClubsForMobile([FromQuery] ClubParameter club, [FromQuery] PagingParameter paging, int userId)
        {
            var data = _clubService.GetAllClubWithMemberApproved(club, paging, userId);
            return Ok(data);
        }

        [HttpGet]
        [Route("without-manager")]
        public IActionResult GetClubsWithOutManager()
        {
            var data = _clubService.getClubWithoutManager();
            return Ok(data);
        }

        [HttpPost]
        public IActionResult AddClub(Club club)
        {
            if (_clubService.Add(club))
            {
                return Ok();
            }
            return BadRequest();
        }


        [HttpPut]
        public IActionResult UpdateClub(Club club)
        {

            if (_clubService.Update(club))
            {
                return Ok();
            }
            return BadRequest();
        }

        [HttpPut("{id}/{status}")]
        public IActionResult UpdateClubStatus(string id, bool status)
        {

            Club club = _clubService.GetClubById(id);
            if (club != null)
            {
                club.Status = status;
                if (_clubService.Update(club))
                {
                    return Ok();
                }
            }
            return BadRequest();
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteClubById(string id)
        {
            if (_clubService.DeleteById(id))
            {
                return Ok();
            }
            return BadRequest();
        }

        [HttpGet]
        [Route("rank")]
        public IActionResult RankClub()
        {
            return Ok(_clubService.GetClubAmountMemberRank());
        }
    }
}
