using FClub.Data.Database;
using FClub.Data.Helper;
using FClub.Data.Interface;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace FClub.Business.Service
{
    public class TaskService
    {
        private readonly ITaskRepository _repository;

        public TaskService(ITaskRepository repository)
        {
            _repository = repository;
        }

        public List<Task> Get() => _repository.GetAll().ToList();

        public PagedList<Task> GetBy(TaskParameter task, PagingParameter paging)
        {
            var values = _repository.GetAll(includeProperties: task.includeProperties);

            if (task.Id != null)
            {
                values = values.Where(x => x.Id == task.Id);
            }
            if (!string.IsNullOrWhiteSpace(task.TypeId))
            {
                values = values.Where(x => x.TypeId.Contains(task.TypeId, StringComparison.InvariantCultureIgnoreCase));
            }
            if (task.CreatorId != null)
            {
                values = values.Where(x => x.CreatorId == task.CreatorId);
            }
            if (task.AwardPoint != null)
            {
                values = values.Where(x => x.AwardPoint == task.AwardPoint);
            }
            if (task.PennaltyPoint != null)
            {
                values = values.Where(x => x.PennaltyPoint == task.PennaltyPoint);
            }
            if (task.CreateDate != null)
            {
                values = values.Where(x => x.CreateDate == task.CreateDate);
            }
            if (task.BeginDate != null)
            {
                values = values.Where(x => x.BeginDate == task.BeginDate);
            }
            if (task.DueDate != null)
            {
                values = values.Where(x => x.DueDate == task.DueDate);
            }

            if (!string.IsNullOrWhiteSpace(task.sort))
            {
                switch (task.sort)
                {
                    case "Id":
                        if (task.dir == "asc")
                            values = values.OrderBy(d => d.Id);
                        else if (task.dir == "desc")
                            values = values.OrderByDescending(d => d.Id);
                        break;
                    case "CreateDate":
                        if (task.dir == "asc")
                            values = values.OrderBy(d => d.CreateDate);
                        else if (task.dir == "desc")
                            values = values.OrderByDescending(d => d.CreateDate);
                        break;
                    case "BeginDate":
                        if (task.dir == "asc")
                            values = values.OrderBy(d => d.BeginDate);
                        else if (task.dir == "desc")
                            values = values.OrderByDescending(d => d.BeginDate);
                        break;
                    case "DueDate":
                        if (task.dir == "asc")
                            values = values.OrderBy(d => d.DueDate);
                        else if (task.dir == "desc")
                            values = values.OrderByDescending(d => d.DueDate);
                        break;
                }
            }

            return PagedList<Task>.ToPagedList(values.AsQueryable(),
            paging.PageNumber,
            paging.PageSize);
        }

        public Task GetById(int id) => _repository.GetAll().Where(x => x.Id == id).FirstOrDefault();

        public void Create(Task _object)
        {
            _repository.Add(_object);
            _repository.SaveDbChange();
        }

        public void Delete(Task _object)
        {
            _repository.Remove(_object);
            _repository.SaveDbChange();
        }

        public void Update(Task _object)
        {
            _repository.Update(_object);
            _repository.SaveDbChange();
        }
    }
}

