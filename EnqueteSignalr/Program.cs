using EnqueteSignalr.Hubs;
using EnqueteSignalr.Services;

var builder = WebApplication.CreateBuilder(args);

// Adicionar servi�os
builder.Services.AddControllers();
builder.Services.AddSignalR();
builder.Services.AddSingleton<PollService>();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Configura��o correta do CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowSpecificOrigins", policy =>
    {
        policy.WithOrigins("http://localhost:4200") // Permite chamadas do frontend Angular
              .AllowAnyMethod()
              .AllowAnyHeader()
              .AllowCredentials(); // Permite cookies, tokens, etc.
    });
});

var app = builder.Build();

// Configura��o do pipeline de requisi��es
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

// Middleware CORS: Certifique-se de que vem **antes** do Authorization
app.UseCors("AllowSpecificOrigins");

app.UseAuthorization();

app.MapControllers();
app.MapHub<VoteHub>("/voteHub");

app.Run();
