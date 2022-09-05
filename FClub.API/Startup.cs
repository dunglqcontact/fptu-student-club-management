using FClub.API.Config;
using FClub.Business.Service;
using FClub.Data.Database;
using FClub.Data.Interface;
using FClub.Data.Repository;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using System.Text;

namespace FClub.API
{
    public class Startup
    {
        private readonly IConfiguration _configuration;
        public Startup(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.ConfigFirebaseAuth();

            services.AddDbContext<ClubManagementDBContext>(options => options.UseSqlServer(_configuration.GetConnectionString("DefaultConnection")));
            services.AddControllers();
            services.AddHttpClient();

            services.AddTransient<IUserInfoRepository, UserInfoRepository>();
            services.AddTransient<UserInforService, UserInforService>();
            services.AddTransient<AuthService, AuthService>();

            services.AddTransient<IUniversityRepository, UniversityRepository>();
            services.AddTransient<UniversityService, UniversityService>();

            services.AddTransient<IClubRepository, ClubRepository>();
            services.AddTransient<ClubService, ClubService>();

            services.AddTransient<IMemberRepository, MemberRepository>();
            services.AddTransient<MemberService, MemberService>();

            services.AddTransient<ITaskRepository, TaskRepository>();
            services.AddTransient<TaskService, TaskService>();

            services.AddTransient<ITaskTypeRepository, TaskTypeRepository>();
            services.AddTransient<TaskTypeService, TaskTypeService>();

            services.AddTransient<IRoleRepository, RoleRepository>();
            services.AddTransient<RoleService, RoleService>();

            services.AddTransient<IEventRepository, EventRepository>();
            services.AddTransient<EventInfoService, EventInfoService>();
            services.AddTransient<IEventTicketRepository, EventTicketRepository>();
            services.AddTransient<EventTicketService, EventTicketService>();
            services.AddTransient<ITicketTypeRepository, TicketTypeRepository>();
            services.AddTransient<TicketTypeService, TicketTypeService>();
            services.AddTransient<IParticipantRepository, ParticipantRepository>();
            services.AddTransient<ParticipantService, ParticipantService>();

            services.AddControllersWithViews()
                    .AddNewtonsoftJson(options =>
                    options.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore
                    );
            services.AddTransient<ITransactionDetailRepository, TransactionDetailRepository>();
            services.AddTransient<TransactionDetailService, TransactionDetailService>();
            services.AddTransient<IWalletRepository, WalletRepository>();
            services.AddTransient<WalletService, WalletService>();
            services.AddTransient<IMemberTaskRepository, MemberTaskRepository>();
            services.AddTransient<MemberTaskService, MemberTaskService>();

            services.AddTransient<INewsRepository, NewsRepository>();
            services.AddTransient<NewsService, NewsService>();

            services.AddTransient<FCMService, FCMService>();

            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "FClub.API", Version = "v1" });
            });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseSwagger();
                app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "FClub.API v1"));
            }

            app.UseSwagger();
            app.UseSwaggerUI(c => { c.SwaggerEndpoint("/swagger/v1/swagger.json", "FClub.API v1"); c.RoutePrefix = string.Empty; });

            app.UseHttpsRedirection();

            app.UseRouting();

            app.UseAuthentication();

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
