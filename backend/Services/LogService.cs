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
    public async Task<Log?> GetUsuarioAsync(string nombre)
    {
        if (nombre.Length > 0)
        {
            return await _usuarios.Find(p => p.nombre == nombre).FirstOrDefaultAsync();
        }
        return null;
    }

     public async Task CrearUsuario(Log nuevoUsuario)
    {
        // Hashea la contraseña antes de guardar
        string passwordHash = BCrypt.Net.BCrypt.HashPassword(nuevoUsuario.contraseña);
        nuevoUsuario.contraseña = passwordHash;

        await _usuarios.InsertOneAsync(nuevoUsuario);
    }

}