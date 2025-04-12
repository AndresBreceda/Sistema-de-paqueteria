using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Driver;
using MongoDB.Bson;

[ApiController]
[Route("api/[controller]")]
public class Log_Service : ControllerBase
{
    private readonly IMongoCollection<Pedidos> _pedidosCollection;

    public Log_Service(IMongoDatabase database)
    {
        _pedidosCollection = database.GetCollection<Pedidos>("Pedidos");
    }

    // GET: api/pedidos
    [HttpGet]
    public async Task<ActionResult<List<Pedidos>>> GetLog()
    {
        try
        {
            var pedidos = await _pedidosCollection.Find(_ => true).ToListAsync();
            return Ok(pedidos);
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Error interno del servidor: {ex.Message}");
        }
    }

    // GET: api/pedidos/{id}
    [HttpGet("{id:length(24)}")]
    public async Task<ActionResult<Pedidos>> GetLog(string id)
    {
        try
        {
            var pedido = await _pedidosCollection.Find(p => p.id == id).FirstOrDefaultAsync();

            if (pedido == null)
            {
                return NotFound($"El usuario con ID {id} no fue encontrado");
            }

            return Ok(pedido);
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Error interno del servidor: {ex.Message}");
        }
    }


}