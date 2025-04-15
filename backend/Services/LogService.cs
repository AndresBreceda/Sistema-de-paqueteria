using MongoDB.Driver;
using MongoDB.Bson;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;

public class LogService
{
    private readonly IMongoCollection<Log> _usuarios;

    public LogService(IMongoDatabase database)
    {
        _usuarios = database.GetCollection<Log>("Usuarios");
    }

    // Obtener todos los pedidos (nombrado como usuarios en el controlador)
    public async Task<List<Log>> GetUsuariosAsync() =>
        await _usuarios.Find(_ => true).ToListAsync();

    // Obtener un pedido específico por ID
    public async Task<Log?> GetUsuarioAsync(string id)
    {
        ObjectId objectId;
        if (ObjectId.TryParse(id, out objectId))
        {
            return await _usuarios.Find(p => p.id == id).FirstOrDefaultAsync();
        }
        return null;
    }

}