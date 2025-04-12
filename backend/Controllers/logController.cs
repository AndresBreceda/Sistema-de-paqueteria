using Microsoft.AspNetCore.Mvc;
using MongoDB.Driver;
using System.Collections.Generic;
using System.Threading.Tasks;

[ApiController]
[Route("api/[controller]")]
public class UsuariosController : ControllerBase
{
    private readonly IMongoCollection<Usuarios> _usuariosCollection;

    public UsuariosController(IMongoDatabase database)
    {
        _usuariosCollection = database.GetCollection<Usuarios>("Usuarios");
    }

    // GET: api/usuarios
    [HttpGet]
    public async Task<ActionResult<List<Usuarios>>> GetUsuarios()
    {
        var usuarios = await _usuariosCollection.Find(_ => true).ToListAsync();
        return Ok(usuarios);
    }

    // GET: api/usuarios/{id}
    [HttpGet("{id:length(24)}")]
    public async Task<ActionResult<Usuarios>> GetUsuario(string id)
    {
        var usuario = await _usuariosCollection.Find(u => u.id == id).FirstOrDefaultAsync();
        if (usuario == null)
        {
            return NotFound();
        }
        return Ok(usuario);
    }

    // POST: api/usuarios (registro)
    [HttpPost]
    public async Task<ActionResult<Usuarios>> CrearUsuario(Usuarios nuevoUsuario)
    {
        await _usuariosCollection.InsertOneAsync(nuevoUsuario);
        return CreatedAtAction(nameof(GetUsuario), new { id = nuevoUsuario.id }, nuevoUsuario);
    }

    // DELETE: api/usuarios/{id}
    [HttpDelete("{id:length(24)}")]
    public async Task<IActionResult> EliminarUsuario(string id)
    {
        var resultado = await _usuariosCollection.DeleteOneAsync(u => u.id == id);
        if (resultado.DeletedCount == 0)
        {
            return NotFound();
        }
        return NoContent();
    }
}
