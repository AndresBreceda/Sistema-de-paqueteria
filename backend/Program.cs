using Microsoft.Extensions.Options;
using MongoDB.Driver;
using MongoConfiguration;

var builder = WebApplication.CreateBuilder(args);
//corre en http://localhost:5000/swagger/index.html
// corre en https://localhost:5001/swagger recuerda poner el swagger no solo localhost

// 🔹 Agregar servicios
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddControllers();

// 🔹 Configurar CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReactApp",
        policy => policy.WithOrigins("http://localhost:3000") // Dirección del frontend en React
                        .AllowAnyMethod()
                        .AllowAnyHeader());
});

// 🔹 Configurar MongoDB
builder.Services.Configure<MongoDBSettings>(builder.Configuration.GetSection("MongoDBSettings"));
builder.Services.AddSingleton<IMongoClient>(sp =>
{
    var settings = sp.GetRequiredService<IOptions<MongoDBSettings>>().Value;
    return new MongoClient(settings.ConnectionString);
});

builder.Services.AddScoped<IMongoDatabase>(sp =>
{
    var client = sp.GetRequiredService<IMongoClient>();
    var settings = sp.GetRequiredService<IOptions<MongoDBSettings>>().Value;
    return client.GetDatabase(settings.DatabaseName);
});

var dataBase = WebApplication.CreateBuilder(args);

// Cargar configuración de MongoDB desde appsettings.json
builder.Services.Configure<MongoConfiguration.MongoDBSettings>(
    builder.Configuration.GetSection("MongoDB"));

// Registrar MongoDbService como Singleton
builder.Services.AddSingleton<MongoDbService>();

var app1 = dataBase.Build();



var app = builder.Build();

// 🔹 Configurar middleware
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection(); //activar esta variable a la hora de production
app.UseCors("AllowReactApp"); // Aplicar política de CORS
app.MapControllers();

// 🔹 Ruta de prueba "WeatherForecast"
var summaries = new[]
{
    "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
};

app.MapGet("/weatherforecast", () =>
{
    var forecast = Enumerable.Range(1, 5).Select(index =>
        new WeatherForecast
        (
            DateOnly.FromDateTime(DateTime.Now.AddDays(index)),
            Random.Shared.Next(-20, 55),
            summaries[Random.Shared.Next(summaries.Length)]
        ))
        .ToArray();
    return forecast;
})
.WithName("GetWeatherForecast")
.WithOpenApi();

app.Run();

// 🔹 Definición del record
record WeatherForecast(DateOnly Date, int TemperatureC, string? Summary)
{
    public int TemperatureF => 32 + (int)(TemperatureC / 0.5556);
}
