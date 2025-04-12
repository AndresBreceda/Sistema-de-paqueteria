using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

public class Usuarios
{
    [BsonId]
    [BsonRepresentation(BsonType.ObjectId)]
    public string? id { get; set; }
    
    public string correo { get; set; } = null!;
    public string contraseña { get; set; } = null!;
    

}
