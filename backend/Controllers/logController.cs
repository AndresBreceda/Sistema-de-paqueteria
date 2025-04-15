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
    [HttpGet("{nombre}")]
    public async Task<ActionResult<Log>> GetUsuarios(string nombre)
    {
        try
        {
            var usuario = await _usuarios.Find(p => p.nombre == nombre).FirstOrDefaultAsync();

            if (usuario == null)
            {
                return NotFound($"El usuario con nombre: {nombre} no fue encontrado");
            }

            return Ok(usuario);
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Error interno del servidor: {ex.Message}");
        }
    }

}