using FClub.Data.Database;
using FClub.Data.Helper;
using FClub.Data.Interface;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FClub.Business.Service
{
    public class UniversityService
    {
        private readonly IUniversityRepository _university;

        public UniversityService(IUniversityRepository university)
        {
            _university = university;
        }
        //GET All University Details By Name
        public List<University> GetUniversityByName(string name)
        {
            return _university.GetAll().Where(x => x.Name.Contains(name, StringComparison.CurrentCultureIgnoreCase)).ToList();
        }
        //GET All University Details   
        public PagedList<University> GetAllUniversity(UniversityParameter university, PagingParameter paging)
        {
            var values = _university.GetAll();

            if (!string.IsNullOrWhiteSpace(university.id))
            {
                values = values.Where(x => x.Id == university.id);
            }
            if (!string.IsNullOrWhiteSpace(university.name))
            {
                values = values.Where(x => x.Name.Contains(university.name, StringComparison.InvariantCultureIgnoreCase));
            }
            if (!string.IsNullOrWhiteSpace(university.address))
            {
                values = values.Where(x => x.Address.Contains(university.address, StringComparison.InvariantCultureIgnoreCase));
            }

            if (!string.IsNullOrWhiteSpace(university.sort))
            {
                switch (university.sort)
                {
                    case "Id":
                        if (university.dir == "asc")
                            values = values.OrderBy(d => d.Id);
                        else if (university.dir == "desc")
                            values = values.OrderByDescending(d => d.Id);
                        break;
                    case "Name":
                        if (university.dir == "asc")
                            values = values.OrderBy(d => d.Id);
                        else if (university.dir == "desc")
                            values = values.OrderByDescending(d => d.Id);
                        break;
                }
            }

            return PagedList<University>.ToPagedList(values.AsQueryable(),
            paging.PageNumber,
            paging.PageSize);
        }
        //Get University by University Id  
        public University GetUniversityById(string id)
        {
            return _university.GetAll().Where(x => x.Id.Equals(id)).FirstOrDefault();
        }
        //Add University
        public bool AddUniversity(University university)
        {
            try
            {
                _university.Add(university);
                _university.SaveDbChange();
                return true;
            } catch
            {
                return false;
            }
        }
        //Delete University   
        public bool DeleteUniversityByName(string name)
        {

            try
            {
                var University = _university.GetAll().Where(x => x.Name.Equals(name)).FirstOrDefault();
                _university.Remove(University);
                _university.SaveDbChange();
                return true;
            }
            catch
            {
                return false;
            }

        }
        //Update University Details  
        public bool UpdateUniversity(University university)
        {
            try
            {
                _university.Update(university);
                _university.SaveDbChange();
                return true;
            }
            catch
            {
                return false;
            }
        }

        public bool DeleteUniversity(University _object)
        {
            try
            {
                _university.Remove(_object);
                _university.SaveDbChange();
                return true;
            }
            catch
            {
                return false;
            }
        }
    }
}