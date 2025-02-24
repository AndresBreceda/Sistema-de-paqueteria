using Microsoft.AspNetCore.Mvc;

[Route("api/[controller]")]
[ApiController]
public class UsuarioController : ControllerBase
{
    private readonly PedidosService _usuarioService;

    public UsuarioController(PedidosService usuarioService)
    {
        _usuarioService = usuarioService;
    }

    [HttpGet]
    public async Task<ActionResult<List<Pedidos>>> Get() =>
        await _usuarioService.GetUsuariosAsync();

    [HttpGet("{_id}")]
    public async Task<ActionResult<Pedidos>> Get(string _id)
    {
        var usuario = await _usuarioService.GetUsuarioAsync(_id);
        if (usuario == null) return NotFound();
        return usuario;
    }

    [HttpPost]
    public async Task<IActionResult> Create(Pedidos usuario)
    {
        await _usuarioService.CreateUsuarioAsync(usuario);
        return CreatedAtAction(nameof(Get), new { id = usuario._id }, usuario);
    }
}
