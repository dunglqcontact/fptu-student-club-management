using FClub.Data.Database;
using FClub.Data.Interface;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace FClub.Business.Service
{
    public class RoleService
    {
        private readonly IRoleRepository _repository;

        public RoleService(IRoleRepository repository)
        {
            _repository = repository;
        }

        public List<Role> Get() => _repository.GetAll().ToList();

        public Role GetById(int id) => _repository.GetAll().Where(x => x.Id == id).FirstOrDefault();

        public void Create(Role _object)
        {
            _repository.Add(_object);
            _repository.SaveDbChange();
        }
        public void Delete(Role _object)
        {
            _repository.Remove(_object);
            _repository.SaveDbChange();
        }

        public void Update(Role _object)
        {
            _repository.Update(_object);
            _repository.SaveDbChange();
        }
    }
}
