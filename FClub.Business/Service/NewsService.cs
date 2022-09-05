using FClub.Data.Database;
using FClub.Data.Helper;
using FClub.Data.Interface;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace FClub.Business.Service
{
    public class NewsService
    {
        private readonly INewsRepository _repository;

        public NewsService(INewsRepository repository)
        {
            _repository = repository;
        }
        
        //GET All University Details   
        public PagedList<News> GetAllNews(NewsParameter news, PagingParameter paging)
        {
            var values = _repository.GetAll(includeProperties: news.includeProperties);



            if (news.Id != null)
            {
                values = values.Where(x => x.Id == news.Id);
            }
            if (!string.IsNullOrWhiteSpace(news.Topic))
            {
                values = values.Where(x => x.Topic.Contains(news.Topic, StringComparison.InvariantCultureIgnoreCase));
            }
            if (!string.IsNullOrWhiteSpace(news.Content))
            {
                values = values.Where(x => x.Content.Contains(news.Content, StringComparison.InvariantCultureIgnoreCase));
            }
            if (news.CreatorId != null)
            {
                values = values.Where(x => x.CreatorId == news.CreatorId);
            }
            if (news.CreateDate != null)
            {
                values = values.Where(x => x.CreateDate == news.CreateDate);
            }
            if (news.Status != null)
            {
                values = values.Where(x => x.Status == news.Status);
            }

            if (!string.IsNullOrWhiteSpace(news.sort))
            {
                switch (news.sort)
                {
                    case "Id":
                        if (news.dir == "asc")
                            values = values.OrderBy(d => d.Id);
                        else if (news.dir == "desc")
                            values = values.OrderByDescending(d => d.Id);
                        break;
                    case "CreateDate":
                        if (news.dir == "asc")
                            values = values.OrderBy(d => d.CreateDate);
                        else if (news.dir == "desc")
                            values = values.OrderByDescending(d => d.CreateDate);
                        break;
                }
            }

            return PagedList<News>.ToPagedList(values.AsQueryable(),
            paging.PageNumber,
            paging.PageSize);
        }
        //Get University by University Id  
        public News GetNewsById(int id)
        {
            return _repository.GetAll().Where(x => x.Id == id).FirstOrDefault();
        }
        //Add University
        public bool AddNews(News news)
        {
            try
            {
                _repository.Add(news);
                _repository.SaveDbChange();
                return true;
            }
            catch
            {
                return false;
            }
        }

        //Update University Details  
        public bool UpdateNews(News news)
        {
            try
            {
                _repository.Update(news);
                _repository.SaveDbChange();
                return true;
            }
            catch
            {
                return false;
            }
        }

        public bool DeleteNews(News _object)
        {
            try
            {
                _repository.Remove(_object);
                _repository.SaveDbChange();
                return true;
            }
            catch
            {
                return false;
            }
        }
    }
}
