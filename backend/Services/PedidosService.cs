using MongoDB.Driver;

public class PedidosService
{
    private readonly IMongoCollection<Pedidos> _usuarios;

    public PedidosService(IMongoDatabase database)
    {
        _usuarios = database.GetCollection<Pedidos>("pedidos");
    }

    public async Task<List<Pedidos>> GetUsuariosAsync() =>
        await _usuarios.Find(_ => true).ToListAsync();

    public async Task<Pedidos?> GetUsuarioAsync(string id) =>
        await _usuarios.Find(u => u._id == id).FirstOrDefaultAsync();

    public async Task CreateUsuarioAsync(Pedidos usuario)
        {
            if (usuario == null)
            {
                throw new ArgumentNullException(nameof(usuario), "El usuario no puede ser nulo.");
            }

            await _usuarios.InsertOneAsync(usuario);
        }
}
