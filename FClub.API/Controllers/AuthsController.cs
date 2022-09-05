using FClub.Business.Service;
using FClub.Data.Helper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FClub.API.Controllers
{
    [Route("api/v1/auths")]
    [ApiController]
    [AllowAnonymous]
    public class AuthsController : ControllerBase
    {
        private readonly AuthService _authService;

        public AuthsController(AuthService authService)
        {
            _authService = authService;
        }

        [HttpPost("sign-in")]
        public async Task<ActionResult<LoginViewModel>> Post([FromQuery] LoginRequestModel loginRequestModel)
        {
            return Ok(await _authService.Login(loginRequestModel));
        }

        [HttpPost("sign-up")]
        public async Task<ActionResult<LoginViewModel>> SignUp([FromQuery] LoginRequestModel loginRequestModel, [FromQuery] string universityId, [FromQuery] string username)
        {
            return Ok(await _authService.Register(loginRequestModel, universityId, username));
        }
    }
}
