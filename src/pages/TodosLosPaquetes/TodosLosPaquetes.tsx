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

  const ciudadesConPaquetes = [...new Set(data.map((p: any) => p.ciudad_destino))];

  return (
    <div>
      <Header />

      <div className="mt-30 ">
        {ciudadesConPaquetes.map((ciudad: any) => {
          const paquetesFiltrados = data.filter((p: any) => p.ciudad_destino === ciudad);
          
          // Si no hay paquetes, mostrar un mensaje
          if (paquetesFiltrados.length === 0) {
            return (
              <div key={ciudad} className="mb-15 border-2 border-blue-300 p-6 rounded-lg bg-white shadow-md hover:shadow-lg transition-all duration-300 ease-in-">
                <p className="text-center text-blue-900">No hay paquetes para la ciudad de {ciudad}</p>
              </div>
            );
          }

          return (
            <div
              key={ciudad}
              className="mb-15 border-2 border-blue-300 p-6 rounded-lg bg-white shadow-md hover:shadow-lg transition-all duration-300 ease-in-"
            >
              <div className="paquete-header mb-5 flex items-center justify-between">
                <h2 className="text-blue-900 text-3xl">{ciudad}</h2>
                <Church />
              </div>

              <Divider sx={{ borderWidth: 3, borderColor: "blue", marginBottom: "10px" }} />

              <div className="w-full">
                {paquetesFiltrados.map((p: any) => (
                  <div key={p.id} className="grid grid-cols-3 grid-rows-1 gap-4 mb-5">
                    <div className="col-span-2">
                      <p><strong>Nombre del remitente:</strong> {p.nombre_remitente}</p>
                      <p><strong>Numero de guia:</strong> {p.numero_guia}</p>
                      <p><strong>Numero de camión:</strong> {p.numero_camion}</p>
                      <p><strong>Numero de paquetes:</strong> {p.numero_paquetes}</p>
                      <p><strong>Ciudad de inicio:</strong> {p.ciudad_inicio}</p>
                      <p><strong>Ciudad de destino:</strong> {p.ciudad_destino}</p>
                      <p><strong>Nombre del destinatario:</strong> {p.nombre_destinatario}</p>
                    </div>

                    <div className="col-start-3 mt-15">
                      <div className="ml-5 grid grid-cols-1 grid-rows-2 gap-4">
                        <button className="button-delete" onClick={() => console.log("Eliminar", p.id)}>
                          Eliminar
                        </button>
                        <button className="button-approve">
                          Cancelar
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
