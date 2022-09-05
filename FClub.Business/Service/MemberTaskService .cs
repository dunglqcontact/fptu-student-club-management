using FClub.Data.Database;
using FClub.Data.Helper;
using FClub.Data.Interface;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace FClub.Business.Service
{
    public class MemberTaskService
    {
        private readonly IMemberTaskRepository _memberTaskRepository;

        public MemberTaskService(IMemberTaskRepository memberTaskRepository)
        {
            _memberTaskRepository = memberTaskRepository;
        }


        public bool Add(MemberTask memberTask)
        {
            try
            {
                _memberTaskRepository.Add(memberTask);
                _memberTaskRepository.SaveDbChange();
                return true;
            }
            catch
            {
                return false;
            }
           
        }

        public bool Update(MemberTask memberTask)
        {
            try
            {
                _memberTaskRepository.Update(memberTask);
                _memberTaskRepository.SaveDbChange();
                return true;
            }
            catch
            {
                return false;
            }
        }

        public bool DeleteById(int id)
        {
            var objFromDb = _memberTaskRepository.Get(id);
            if(objFromDb == null)
            {
                return false;
            }
            _memberTaskRepository.Remove(id);
            _memberTaskRepository.SaveDbChange();
            return true;
        }

        public MemberTask GetMemberTaskById(int id)
        {
            var memberTask = _memberTaskRepository.Get(id);
            return memberTask;
        }

        public PagedList<MemberTask> GetAllMemberTask(MemberTaskParameter memberTask, PagingParameter paging)
        {
            var values = _memberTaskRepository.GetAll(includeProperties: memberTask.includeProperties);

            if (memberTask.id != null)
            {
                values = values.Where(x => x.Id == memberTask.id);
            }
            if (memberTask.taskId != null)
            {
                values = values.Where(x => x.TaskId == memberTask.taskId);
            }
            if (memberTask.memberId != null)
            {
                values = values.Where(x => x.MemberId == memberTask.memberId);
            }
            if (memberTask.completeDate != null)
            {
                values = values.Where(x => x.CompleteDate == memberTask.completeDate);
            }
            if (memberTask.isFinish != null)
            {
                values = values.Where(x => x.IsFinish == memberTask.isFinish);
            }
            if (!string.IsNullOrWhiteSpace(memberTask.sort))
            {
                switch (memberTask.sort)
                {
                    case "Id":
                        if (memberTask.dir == "asc")
                            values = values.OrderBy(d => d.Id);
                        else if (memberTask.dir == "desc")
                            values = values.OrderByDescending(d => d.Id);
                        break;
                    case "TaskId":
                        if (memberTask.dir == "asc")
                            values = values.OrderBy(d => d.TaskId);
                        else if (memberTask.dir == "desc")
                            values = values.OrderByDescending(d => d.TaskId);
                        break;
                    case "MemberId":
                        if (memberTask.dir == "asc")
                            values = values.OrderBy(d => d.MemberId);
                        else if (memberTask.dir == "desc")
                            values = values.OrderByDescending(d => d.MemberId);
                        break;
                    case "CompleteDate":
                        if (memberTask.dir == "asc")
                            values = values.OrderBy(d => d.CompleteDate);
                        else if (memberTask.dir == "desc")
                            values = values.OrderByDescending(d => d.CompleteDate);
                        break;
                    case "IsFinish":
                        if (memberTask.dir == "asc")
                            values = values.OrderBy(d => d.IsFinish);
                        else if (memberTask.dir == "desc")
                            values = values.OrderByDescending(d => d.IsFinish);
                        break;
                }
            }

            return PagedList<MemberTask>.ToPagedList(values.AsQueryable(),
            paging.PageNumber,
            paging.PageSize);
        }
    }
}
