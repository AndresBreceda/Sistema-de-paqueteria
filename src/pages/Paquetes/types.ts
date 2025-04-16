import { Key } from "react";

interface Paquete {
    _id: Key; // o 'Key' si prefieres usar un tipo especial de clave
    nombre_remitente: string;
    numero_camion: string;
    ciudad_inicio: string;
    nombre_destinatario: string;
    numero_guia: string;
    numero_paquetes: string;
    ciudad_destino: string;
    peso: string;
    articulo: string;
}

export default Paquete;
  