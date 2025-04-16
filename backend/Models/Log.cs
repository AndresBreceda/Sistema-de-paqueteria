using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

public class Log
{
    [BsonId]
    [BsonRepresentation(BsonType.ObjectId)]
    public string? id { get; set; }
    public string nombre {get; set;} = string.Empty;
    public string contraseña {get; set;} = string.Empty;
    public List<string> autorizacion_ciudad { get; set; } = new List<string>();

    
}
