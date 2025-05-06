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

    [HttpPost("login")]
    public async Task<ActionResult> Login([FromBody] Log request)
    {
        try
        {
            var usuario = await _usuarios.Find(p => p.nombre == request.nombre).FirstOrDefaultAsync();

            if (usuario == null)
            {
                return Unauthorized("Usuario o contraseña incorrectos");
            }

            // Compara la contraseña hasheada
            bool contraseñaValida = BCrypt.Net.BCrypt.Verify(request.contraseña, usuario.contraseña);
            if (!contraseñaValida)
            {
                return Unauthorized("Usuario o contraseña incorrectos");
            }

            return Ok(new
            {
                usuario.nombre_formulario,
                usuario.autorizacion_ciudad
            });
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Error interno del servidor: {ex.Message}");
        }
    }

    [HttpPost("register")]
    public async Task<ActionResult> Register([FromBody] Log request)
    {
        try
        {
            var usuarioExistente = await _usuarios.Find(u => u.nombre == request.nombre).FirstOrDefaultAsync();

            if (usuarioExistente != null)
            {
                return BadRequest("Ya existe un usuario con ese email.");
            }

            var nuevoUsuario = new Log
            {
                nombre = request.nombre,
                contraseña = BCrypt.Net.BCrypt.HashPassword(request.contraseña),
                nombre_formulario = request.nombre_formulario,
                autorizacion_ciudad = request.autorizacion_ciudad
            };

            await _usuarios.InsertOneAsync(nuevoUsuario);

            return Ok("Usuario registrado exitosamente.");
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Error interno del servidor: {ex.Message}");
        }
    }


}