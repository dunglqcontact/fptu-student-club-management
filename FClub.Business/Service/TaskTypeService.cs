using FClub.Data.Database;
using FClub.Data.Helper;
using FClub.Data.Interface;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace FClub.Business.Service
{
    public class TaskTypeService
    {
        private readonly ITaskTypeRepository _repository;

        public TaskTypeService(ITaskTypeRepository repository)
        {
            _repository = repository;
        }

        public List<TaskType> Get() => _repository.GetAll().ToList();

        public PagedList<TaskType> GetBy(TaskTypeParameter taskType, PagingParameter paging)
        {
            var values = _repository.GetAll();

            if (!string.IsNullOrWhiteSpace(taskType.Id))
            {
                values = values.Where(x => x.Id == taskType.Id);
            }
            if (!string.IsNullOrWhiteSpace(taskType.Name))
            {
                values = values.Where(x => x.Name.Contains(taskType.Name, StringComparison.InvariantCultureIgnoreCase));
            }
            

            if (!string.IsNullOrWhiteSpace(taskType.sort))
            {
                switch (taskType.sort)
                {
                    case "Id":
                        if (taskType.dir == "asc")
                            values = values.OrderBy(d => d.Id);
                        else if (taskType.dir == "desc")
                            values = values.OrderByDescending(d => d.Id);
                        break;
                    case "Name":
                        if (taskType.dir == "asc")
                            values = values.OrderBy(d => d.Id);
                        else if (taskType.dir == "desc")
                            values = values.OrderByDescending(d => d.Id);
                        break;
                }
            }

            return PagedList<TaskType>.ToPagedList(values.AsQueryable(),
            paging.PageNumber,
            paging.PageSize);
        }

        public TaskType GetById(string id) => _repository.GetAll().Where(x => x.Id.Equals(id)).FirstOrDefault();

        public void Create(TaskType _object)
        {
            _repository.Add(_object);
            _repository.SaveDbChange();
        }

        public void Delete(TaskType _object)
        {
            _repository.Remove(_object);
            _repository.SaveDbChange();
        }

        public void Update(TaskType _object)
        {
            _repository.Update(_object);
            _repository.SaveDbChange();
        }
    }
}
