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
    [Route("api/v1/universities")]
    [ApiController]
    [Authorize]
    public class UniversitysController : ControllerBase
    {
        private readonly UniversityService _universityService;

        public UniversitysController(UniversityService UniversityService)
        {
            _universityService = UniversityService;
        }
        //Add University  
        [HttpPost]
        public IActionResult AddUniversity([FromBody] University university)
        {
            if (_universityService.AddUniversity(university))
            {
                return Ok();
            }
            return BadRequest();
        }
        //Delete University  
        [HttpDelete("{id}")]
        public IActionResult DeleteUniversity(string id)
        {
            if (_universityService.GetUniversityById(id) == null)
            {
                return NotFound();
            }
            _universityService.DeleteUniversity(_universityService.GetUniversityById(id));
            return Ok();
        }
        //Update University  
        [HttpPut]
        public IActionResult UpdateUniversity(University university)
        {
            if (_universityService.GetUniversityById(university.Id) == null)
            {
                return NotFound();
            }
            _universityService.UpdateUniversity(university);
            return Ok();
        }
        //GET All University  
        [AllowAnonymous]
        [HttpGet]
        public ActionResult<PagedList<University>> GetUniversitys([FromQuery] UniversityParameter university, [FromQuery] PagingParameter paging)
        {
            var data = _universityService.GetAllUniversity(university, paging);
            
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
            return Ok( new { data , metadata});
        }
    }
}
