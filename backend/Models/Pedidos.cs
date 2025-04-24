using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

public class Pedidos
{
    [BsonId]
    [BsonRepresentation(BsonType.ObjectId)]
    public string? id { get; set; }
    
    public string nombre_remitente { get; set; } = null!;
    
    public string numero_camion { get; set; } = null!;
    public string ciudad_inicio { get; set; } = null!;
    public string nombre_destinatario { get; set; } = null!;
    public string numero_guia { get; set; } = null!;
    public string numero_paquetes { get; set; } = null!;
    public string ciudad_destino { get; set; } = null!;

    public string peso {get; set;} = null!;
    public string articulo {get; set;} = null!;
    public string precio {get; set;} = null!;
    public string hora_salida {get; set;} = null!;
    public bool entregado { get; set; } = false;
    public DateTime? fecha_entrega { get; set; }
}
