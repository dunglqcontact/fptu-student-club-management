using FClub.Business.Service;
using FClub.Data.Database;
using FClub.Data.Helper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;

namespace FClub.API.Controllers
{
    [Route("api/v1/task-types")]
    [ApiController]
    [Authorize]
    public class TaskTypesController : ControllerBase
    {
        private readonly TaskTypeService _service;

        public TaskTypesController(TaskTypeService service)
        {
            _service = service;
        }

        [HttpGet]
        public ActionResult<PagedList<TaskType>> Get([FromQuery] TaskTypeParameter taskType, [FromQuery] PagingParameter paging)
        {
            var data = _service.GetBy(taskType, paging);
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
        public IActionResult Create(TaskType _object)
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
        public IActionResult Update(TaskType _object)
        {
            if (_service.GetById(_object.Id) == null)
            {
                return NotFound();
            }
            _service.Delete(_object);
            return Ok();
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(string id)
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
