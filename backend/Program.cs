
// using Logipackdb.Models;
// using MongoDB.Driver;

using Microsoft.Extensions.Options;
using MongoDB.Driver;

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
        policy => policy.WithOrigins("http://localhost:5173") // Dirección del frontend en React
                        .AllowAnyMethod()
                        .AllowAnyHeader());
});

var mongoSettings = builder.Configuration.GetSection("MongoDB").Get<MongoDbSettings>();

Console.WriteLine($"Connection String: {mongoSettings?.ConnectionString}");
Console.WriteLine($"Database Name: {mongoSettings?.DatabaseName}");


// Configuración de MongoDB
builder.Services.Configure<MongoDbSettings>(
builder.Configuration.GetSection("MongoDB"));

builder.Services.AddSingleton<IMongoClient>(s =>
{
    var settings = s.GetRequiredService<IOptions<MongoDbSettings>>().Value;

    if (string.IsNullOrEmpty(settings.ConnectionString))
    {
        throw new ArgumentNullException(nameof(settings.ConnectionString), "La cadena de conexión a MongoDB no puede ser nula o vacía.");
    }

    return new MongoClient(settings.ConnectionString);
});

builder.Services.AddScoped<PedidosService>();


builder.Services.AddScoped(s =>
{
    var settings = s.GetRequiredService<IOptions<MongoDbSettings>>().Value;
    var client = s.GetRequiredService<IMongoClient>();
    return client.GetDatabase(settings.DatabaseName);
});

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();


var app = builder.Build();

// Obtener el servicio de UsuarioService
using (var scope = app.Services.CreateScope())
{
    var usuarioService = scope.ServiceProvider.GetRequiredService<PedidosService>();

}

app.UseAuthorization();
app.MapControllers();

// 🔹 Configurar middleware
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection(); //activar esta variable a la hora de production
app.UseCors("AllowReactApp"); // Aplicar política de CORS
app.MapControllers();


app.Run();

