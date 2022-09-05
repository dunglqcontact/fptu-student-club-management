using FClub.Business.Service;
using FClub.Data.Database;
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
    [Route("api/v1/news")]
    [ApiController]
    [Authorize]
    public class NewsController : ControllerBase
    {
        private readonly NewsService _service;

        public NewsController(NewsService service)
        {
            _service = service;
        }
        //Add User  
        [HttpPost]
        public IActionResult Add([FromBody] News news)
        {
            try
            {
                _service.AddNews(news);
                return Ok();
            }
            catch (Exception)
            {

                return BadRequest();
            }
        }
        //Delete User  
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            if (_service.GetNewsById(id) == null)
            {
                return NotFound();
            }
            _service.DeleteNews(_service.GetNewsById(id));
            return Ok();
        }
        //Update User  
        [HttpPut]
        public IActionResult Update([FromBody] News _object)
        {
            if (_service.GetNewsById(_object.Id) == null)
            {
                return NotFound();
            }
            _service.UpdateNews(_object);
            return Ok();
        }

        //GET All User by Name
        [HttpGet]
        public IActionResult Get([FromQuery] NewsParameter news, [FromQuery] PagingParameter param)
        {
            var data = _service.GetAllNews(news, param);
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
    }
}
