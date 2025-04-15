using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Driver;
using MongoDB.Bson;

[ApiController]
[Route("api/[controller]")]
public class LogController : ControllerBase
{
    private readonly IMongoCollection<Log> _usuarios;

    public LogController(IMongoDatabase database)
    {
        _usuarios = database.GetCollection<Log>("Usuarios");
    }

    // GET: api/Usuarios
    [HttpGet]
    public async Task<ActionResult<List<Log>>> GetUsuarios()
    {
        try
        {
            var usuarios = await _usuarios.Find(_ => true).ToListAsync();
            return Ok(usuarios);
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Error interno del servidor: {ex.Message}");
        }
    }

    // GET: api/Usuarios/{id}
    [HttpGet("{id:length(24)}")]
    public async Task<ActionResult<Log>> GetUsuarios(string id)
    {
        try
        {
            var usuario = await _usuarios.Find(p => p.id == id).FirstOrDefaultAsync();

            if (usuario == null)
            {
                return NotFound($"El usuario con ID {id} no fue encontrado");
            }

            return Ok(usuario);
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Error interno del servidor: {ex.Message}");
        }
    }

}