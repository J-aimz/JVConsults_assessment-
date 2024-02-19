using Microsoft.AspNetCore.DataProtection.KeyManagement;
using MovieAppApi.Interfaces;
using MovieAppApi.Services;
using MovieAppApi.Utility;

namespace MovieAppApi.Extensions
{
    public static class RegisterServices
    {
        public static void AddConfig(this IServiceCollection services, IConfiguration configuration)
        {
            services.AddScoped<IExternalCalls, ExternalCalls>();

            StaticDetails.ApiKey = configuration.GetSection("ExternalApi")["ApiKey"];
            StaticDetails.ExternalUrl = configuration.GetSection("ExternalApi")["BaseUrl"]+"/?apikey="+ StaticDetails.ApiKey;

            services.AddCors(opt =>
            {
                opt.AddPolicy("AllowOrigins", x => x.WithOrigins("http://localhost:3000").AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod());
            });

        }
    }
}
