import Header from "../../Components/Header/Header";
import Divider from '@mui/material/Divider';
import "./styles.css";
import { Church } from "lucide-react";
import { useGetData } from "../../Hooks/Hooks";

interface Package {
  id: number;
  destino: string;
  nombre: string;
}

const paquetes: Package[] = [
  { id: 1, destino: "Aguascalientes", nombre: "Paquete 1" },
  { id: 2, destino: "Calvillo", nombre: "Paquete 2" },
  { id: 3, destino: "Jalpa", nombre: "Paquete 3" },
  { id: 4, destino: "Tabasco", nombre: "Paquete 4" },
  { id: 5, destino: "Ojuelos", nombre: "Paquete 5" },
];

const ciudades = [
  "Aguascalientes",
  "Calvillo",
  "Jalpa",
  "Tabasco",
  "Juchipila",
  "Villa Hidalgo",
  "Teocaltiche",
  "Loreto",
  "Pinos",
  "Ojuelos",
  "San Luis",
];

export default function TodosLosPaquetes() {
    let isLoadingDelete = false;
    let id = 0;

    let isErrorDelete = {
        isErrorDelete: false,
        message: "Hola mundo"
    };


    return (
        <div>
            <Header />

            <div className="p-4 mt-30">
                {ciudades.map((ciudad) => {
                    const paquetesFiltrados = paquetes.filter((p) => p.destino === ciudad);
                    if (paquetesFiltrados.length === 0) return null; // Ocultar si no hay paquetes

                    function handleDelete(_id: any): void {
                        console.log("Hola mundo");
                    }

                    return (
                        <div key={ciudad} className="mb-15 border-2 border-blue-300 p-6 rounded-lg bg-white shadow-md hover:shadow-lg transition-all duration-300 ease-in-out">
                            <div className="paquete-header mb-5 flex">
                                <h2 className="text-blue-900 text-3xl">{ciudad}</h2>
                                <Church className="ml-50"/>
                            </div>
                            <Divider sx={{ borderWidth: 3, borderColor:"black" }} />
                            <ul className="paquete-list items-center text-left mt-5">
                                {paquetesFiltrados.map((p) => (
                                    <>
                                    <li key={p.id}>
                                        <label className="text-blue-900 text-lg">{p.nombre}</label> Texto do seu parágrafo <br />
                                        <label className="text-blue-900 text-lg">Numero de guia:</label> Texto do seu parágrafo <br />
                                        <label className="text-blue-900 text-lg">Numero de camion:</label> Texto do seu parágrafo <br />
                                        <label className="text-blue-900 text-lg">Numero de paquetes:</label> Texto do seu parágrafo <br />
                                        <label className="text-blue-900 text-lg">Ciudad de inicio:</label> Texto do seu parágrafo <br />
                                        <label className="text-blue-900 text-lg">Ciudad de destino:</label> Texto do seu parágrafo <br />
                                        <label className="text-blue-900 text-lg">Nombre del destinatario:</label> Texto do seu parágrafo <br />
                                    </li>
                                    
                                    <div className="grid grid-cols-2 grid-rows-1 gap-4 mt-10">
                                        <button className="button-edit">Editar</button>
                                        <button className="button-delete" onClick={() => handleDelete(id)} disabled={isLoadingDelete}>
                                        {isLoadingDelete ? "Eliminando..." : "Eliminar"}
                                        </button>
                                        {isErrorDelete && <p className="text-red-500">{isErrorDelete.message}</p>}
                                    </div>
                                    </>
                                ))}
                            </ul>

                        </div>
                    );
                })}
            </div>
        </div>
    );
}
