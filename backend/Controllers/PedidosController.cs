using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Driver;
using MongoDB.Bson;

[ApiController]
[Route("api/[controller]")]
public class PedidosController : ControllerBase
{
    private readonly IMongoCollection<Pedidos> _pedidosCollection;

    public PedidosController(IMongoDatabase database)
    {
        _pedidosCollection = database.GetCollection<Pedidos>("Pedidos");
    }

    // GET: api/pedidos
    [HttpGet]
    public async Task<ActionResult<List<Pedidos>>> GetPedidos()
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
    public async Task<ActionResult<Pedidos>> GetPedido(string id)
    {
        try
        {
            var pedido = await _pedidosCollection.Find(p => p.id == id).FirstOrDefaultAsync();

            if (pedido == null)
            {
                return NotFound($"El pedido con ID {id} no fue encontrado");
            }

            return Ok(pedido);
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Error interno del servidor: {ex.Message}");
        }
    }

    // POST: api/pedidos
    [HttpPost]
    public async Task<ActionResult<Pedidos>> CreatePedido(Pedidos pedido)
    {
        try
        {
            await _pedidosCollection.InsertOneAsync(pedido);
            return CreatedAtAction(nameof(GetPedido), new { id = pedido.id }, pedido);
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Error interno del servidor: {ex.Message}");
        }
    }

    // PUT: api/pedidos/{id}
    [HttpPut("{id:length(24)}")]
    public async Task<IActionResult> UpdatePedido(string id, Pedidos pedidoIn)
    {
        try
        {
            var pedido = await _pedidosCollection.Find(p => p.id == id).FirstOrDefaultAsync();

            if (pedido == null)
            {
                return NotFound($"El pedido con ID {id} no fue encontrado");
            }

            pedidoIn.id = id;
            await _pedidosCollection.ReplaceOneAsync(p => p.id == id, pedidoIn);

            return NoContent();
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Error interno del servidor: {ex.Message}");
        }
    }

    // DELETE: api/pedidos/{id}
    [HttpDelete("{id:length(24)}")]
    public async Task<IActionResult> DeletePedido(string id)
    {
        try
        {
            var result = await _pedidosCollection.DeleteOneAsync(p => p.id == id);

            if (result.DeletedCount == 0)
            {
                return NotFound($"El pedido con ID {id} no fue encontrado");
            }

            return NoContent();
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Error interno del servidor: {ex.Message}");
        }
    }
}