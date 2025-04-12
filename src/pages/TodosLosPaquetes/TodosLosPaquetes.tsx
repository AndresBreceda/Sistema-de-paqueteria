import Header from "../../Components/Header/Header";
import Divider from '@mui/material/Divider';
import "./styles.css";
import { Church } from "lucide-react";
import { useGetData } from "../../Hooks/Hooks";

export default function TodosLosPaquetes() {
    const { isError, isLoading, data } = useGetData();

    if (isLoading) {
        return <p className="text-center mt-10">Cargando datos...</p>;
    }

    if (isError || !data) {
        return <p className="text-center mt-10 text-red-500">Ocurrió un error al cargar los paquetes.</p>;
    }

    // Obtener todas las ciudades únicas con paquetes
    const ciudadesConPaquetes = [...new Set(data.map((p: any) => p.ciudad_destino))];

    return (
        <div>
            <Header />

            <div className="p-4 mt-30">
                {ciudadesConPaquetes.map((ciudad: any) => {
                    const paquetesFiltrados = data.filter((p: any) => p.ciudad_destino === ciudad);
                    if (paquetesFiltrados.length === 0) return null;

                    return (
                        <div key={ciudad} className="mb-15 border-2 border-blue-300 p-6 rounded-lg bg-white shadow-md hover:shadow-lg transition-all duration-300 ease-in-out">
                            <div className="paquete-header mb-5 flex items-center justify-between">
                                <h2 className="text-blue-900 text-3xl">{ciudad}</h2>
                                <Church />
                            </div>
                            <Divider sx={{ borderWidth: 3, borderColor: "black" }} />
                            <ul className="paquete-list mt-5 space-y-4">
                                {paquetesFiltrados.map((p: any) => (
                                    <li key={p.id} className="border p-4 rounded-lg bg-gray-50 shadow">
                                        <p><strong>Nombre del remitente:</strong> {p.nombre_remitente}</p>
                                        <p><strong>Numero de guia:</strong> {p.numero_guia}</p>
                                        <p><strong>Numero de camión:</strong> {p.numero_camion}</p>
                                        <p><strong>Numero de paquetes:</strong> {p.numero_paquetes}</p>
                                        <p><strong>Ciudad de inicio:</strong> {p.ciudad_inicio}</p>
                                        <p><strong>Ciudad de destino:</strong> {p.ciudad_destino}</p>
                                        <p><strong>Nombre del destinatario:</strong> {p.nombre_destinatario}</p>

                                        <div className="grid grid-cols-2 gap-4 mt-4">
                                            <button className="button-edit">Editar</button>
                                            <button
                                                className="button-delete"
                                                onClick={() => console.log("Eliminar", p.id)}
                                            >
                                                Eliminar
                                            </button>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
