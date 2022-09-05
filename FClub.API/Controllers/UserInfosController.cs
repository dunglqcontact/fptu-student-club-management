using FClub.Business.Service;
using FClub.Data.Database;
using FClub.Data.Helper;
using FClub.Data.Interface;
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
    [Route("api/v1/users")]
    [ApiController]
    [Authorize]
    public class UserInfosController : ControllerBase
    {
        private readonly UserInforService _userInforService;

        public UserInfosController(UserInforService UsertService)
        {
            _userInforService = UsertService;
        }
        //Add User  
        [HttpPost]
        public IActionResult AddUser([FromBody] UserInfo user)
        {
            try
            {
                _userInforService.AddUserInfo(user);
                return Ok();
            }
            catch (Exception)
            {

                return BadRequest();
            }
        }
        //Delete User  
        [HttpDelete("{id}")]
        public IActionResult DeleteUser(int id)
        {
            if (_userInforService.GetUsersById(id) == null)
            {
                return NotFound();
            }
            _userInforService.DeleteUser(_userInforService.GetUsersById(id));
            return Ok();
        }
        //Update User  
        [HttpPut]
        public IActionResult UpdateUser([FromBody] UserInfo _object)
        {
            if (_userInforService.GetUsersById(_object.Id) == null)
            {
                return NotFound();
            }
            _userInforService.UpdateUser(_object);
            return Ok();
        }

        [HttpPut("{id}/{status}")]
        public IActionResult UpdateUserStatus(int id, bool status)
        {

            UserInfo userInfo = _userInforService.GetUsersById(id);
            if (userInfo != null)
            {
                userInfo.Status = status;
                if (_userInforService.UpdateUser(userInfo))
                {
                    return Ok();
                }
            } else
            {
                return NotFound();
            }
            return BadRequest();
        }
        //GET All User by Name
        [HttpGet]
        public IActionResult GetUsers([FromQuery] UserParameter user, [FromQuery] PagingParameter param)
        {
            var data = _userInforService.GetUsersInfor(user, param);
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
            return Ok(new { data, metadata});
        }

        [HttpGet]
        [Route("rank")]
        public IActionResult RankUser()
        {
            return Ok(_userInforService.GetUserJoinClubRank());
        }

        [HttpGet]
        [Route("is-manager")]
        public IActionResult isManager()
        {
            return Ok(_userInforService.GetUserIsManager());
        }
    }
}
