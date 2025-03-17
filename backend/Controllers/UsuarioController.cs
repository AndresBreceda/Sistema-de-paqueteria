using MongoDB.Driver;
using MongoDB.Bson;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;

public class PedidosService
{
    private readonly IMongoCollection<Pedidos> _pedidosCollection;

    public PedidosService(IMongoDatabase database)
    {
        _pedidosCollection = database.GetCollection<Pedidos>("pedidos");
    }

    // Obtener todos los pedidos (nombrado como usuarios en el controlador)
    public async Task<List<Pedidos>> GetUsuariosAsync() =>
        await _pedidosCollection.Find(_ => true).ToListAsync();

    // Obtener un pedido específico por ID
    public async Task<Pedidos?> GetUsuarioAsync(string id)
    {
        ObjectId objectId;
        if (ObjectId.TryParse(id, out objectId))
        {
            return await _pedidosCollection.Find(p => p.id == id).FirstOrDefaultAsync();
        }
        return null;
    }

    // Crear un nuevo pedido
    public async Task<Pedidos> CreateUsuarioAsync(Pedidos pedido)
    {
        await _pedidosCollection.InsertOneAsync(pedido);
        return pedido;
    }

    // Actualizar un pedido existente
    public async Task<bool> UpdateUsuarioAsync(string id, Pedidos pedidoActualizado)
    {
        ObjectId objectId;
        if (!ObjectId.TryParse(id, out objectId))
        {
            return false;
        }

        var result = await _pedidosCollection.ReplaceOneAsync(
            p => p.id == id, 
            pedidoActualizado);

        return result.IsAcknowledged && result.ModifiedCount > 0;
    }

    // Eliminar un pedido
    public async Task DeletePaqueteAsync(string id)
    {
        ObjectId objectId;
        if (ObjectId.TryParse(id, out objectId))
        {
            await _pedidosCollection.DeleteOneAsync(p => p.id == id);
        }
    }
}