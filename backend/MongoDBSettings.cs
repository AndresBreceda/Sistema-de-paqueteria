using MongoDB.Driver;
using Microsoft.Extensions.Configuration;

namespace MongoConfiguration
{
    public class MongoDBSettings
    {
        public required string ConnectionString { get; set; }
        public required string DatabaseName { get; set; }
        
    }
}

public class MongoDbService
// corre en https://localhost:5001/swagger
{
    private readonly IMongoDatabase _database;

    public MongoDbService(IConfiguration config)
    {
        var connectionString = config["MongoDB:ConnectionString"];
        var databaseName = config["MongoDB:DatabaseName"];

        var client = new MongoClient(connectionString);
        _database = client.GetDatabase(databaseName);

        // Verificar conexión
        try
        {
            client.ListDatabaseNames(); // Intenta obtener la lista de bases de datos
            Console.WriteLine("✅ Conexión exitosa a MongoDB");
        }
        catch (Exception ex)
        {
            Console.WriteLine($"❌ Error de conexión a MongoDB: {ex.Message}");
        }
    }

    public IMongoCollection<T> GetCollection<T>(string collectionName)
    {
        return _database.GetCollection<T>(collectionName);
    }
}
