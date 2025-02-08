using RepiperSignalR.Hubs;
using RepiperSignalR.Services;

namespace RepiperSignalR
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            builder.Services.AddControllers();
            builder.Services.AddSignalR();
            builder.Services.AddSingleton<PollService>();

            builder.Services.AddSpaStaticFiles(configuration =>
            {

                configuration.RootPath = "ClientApp/dist";

            });

            builder.Services.AddCors(options =>

            {

                options.AddPolicy("AllowSpecificOrigins", policy =>
                {
                    policy.WithOrigins("http://localhost:3000") 
                          .AllowAnyMethod()
                          .AllowAnyHeader()
                          .AllowCredentials();
                });

            });

            var app = builder.Build();

            app.UseStaticFiles();
            app.UseSpaStaticFiles();

            app.UseAuthorization();

            app.UseCors("AllowSpecificOrigins");

            app.MapControllers();
            app.MapHub<VoteHub>("/voteHub");

            app.Run();
        }
    }
}
