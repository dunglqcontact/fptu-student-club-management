using FClub.Data.Database;
using FClub.Data.Helper;
using FClub.Data.Interface;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace FClub.Business.Service
{
    public class MemberService
    {
        private readonly IMemberRepository _repository;

        public MemberService(IMemberRepository repository)
        {
            _repository = repository;
        }

        public List<Member> Get() => _repository.GetAll().ToList();

        public int CountByClub(string clubID)
        {
            return _repository.GetAll().Where(x => x.ClubId == clubID).Count();
        }

        public int CountByUserId(int userId)
        {
            return _repository.GetAll().Where(x => x.UserId == userId).Count();
        }

        public PagedList<Member> GetBy(MemberParameter member, PagingParameter paging)
        {

            var values = _repository.GetAll(includeProperties: member.includeProperties);

            if (member.Id != null)
            {
                values = values.Where(x => x.Id == member.Id);
            }
            if (member.UserId != null)
            {
                values = values.Where(x => x.UserId == member.UserId);
            }
            if (!string.IsNullOrWhiteSpace(member.ClubId))
            {
                values = values.Where(x => x.ClubId == member.ClubId);
            }
            if (member.RoleId != null)
            {
                values = values.Where(x => x.RoleId.Equals(member.RoleId));
            }
            if (member.Status != null)
            {
                values = values.Where(x => x.Status == member.Status);
            }
            if (member.IsApproved != null)
            {
                values = values.Where(x => x.IsApproved == member.IsApproved);
            }

            if (!string.IsNullOrWhiteSpace(member.sort))
            {
                switch (member.sort)
                {
                    case "Id":
                        if (member.dir == "asc")
                            values = values.OrderBy(d => d.Id);
                        else if (member.dir == "desc")
                            values = values.OrderByDescending(d => d.Id);
                        break;
                }
            }

            if (member.includeProperties != null)
            {
                string[] includeList = member.includeProperties.Split(new char[] { ',' }, StringSplitOptions.RemoveEmptyEntries);
                foreach (var item in values)
                {
                    if (includeList.Contains("User"))
                    {
                        //item.User.Members = new HashSet<Member>();
                        item.User.Members.Clear();
                    }
                    if (includeList.Contains("Club"))
                    {
                        item.Club.Members.Clear();
                    }
                }
            }

            var orderValues = values.OrderBy(x => x.RoleId == 1 ? 1: x.RoleId == 3 ? 2: x.RoleId == 4 ? 3: 4);

            return PagedList<Member>.ToPagedList(orderValues.AsQueryable(),
            paging.PageNumber,
            paging.PageSize);
        }

        public Member GetById(int id) => _repository.GetAll().Where(x => x.Id == id).FirstOrDefault();

        public void Create(Member _object)
        {
            //_object.IsApproved = false;
            var values = _repository.GetAll().Where(x => x.UserId == _object.UserId && x.ClubId.Equals(_object.ClubId)).FirstOrDefault();
            if (values != null) throw new Exception();
            _repository.Add(_object);
            _repository.SaveDbChange();
        }
        public void Delete(Member _object)
        {
            _repository.Remove(_object);
            _repository.SaveDbChange();
        }

        public void Update(Member _object)
        {
            _repository.Update(_object);
            _repository.SaveDbChange();
        }

        public void ChangeStatus(int id)
        {
            Member mem = _repository.GetFirstOrDefault(x => x.Id == id);
            mem.Status = !mem.Status;
            _repository.Update(mem);
            _repository.SaveDbChange();
        }

        public void ChangeRole(int id, int roleId)
        {
            Member mem = _repository.GetFirstOrDefault(x => x.Id == id);
            mem.RoleId = roleId;
            _repository.Update(mem);
            _repository.SaveDbChange();
        }
    }
}
