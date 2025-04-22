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

  if (ciudadesConPaquetes.length === 0) {
    return (
      <div className="flex">
        <Header />
        <div className="mb-15 border-2 border-blue-300 p-6 rounded-lg bg-white shadow-md hover:shadow-lg transition-all duration-300 ease-in-">
          <h2 className="text-left text-blue-900 text-2xl mb-5">No hay paquetes</h2>
          <p>Crea un paquete</p>
          <a href="/Formulario" className="text-blue-600 underline mt-2 inline-block cursor-pointer">aqui</a>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Header />

      {/* Navegación de ciudades */}
      <div className="mt-[100px] px-6 mb-8 flex flex-wrap gap-2 justify-center">
        {ciudadesConPaquetes.map((ciudad: any) => (
          <div className="mt-10">
            <a
              key={ciudad}
              href={`#${ciudad}`}
              className="bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full shadow hover:bg-blue-200 transition"
            >
              {ciudad}
            </a>
          </div>

        ))}
      </div>

      <div className="px-6">
        {ciudadesConPaquetes.map((ciudad: any) => {
          const paquetesFiltrados = data.filter((p: any) => p.ciudad_destino === ciudad);

          return (
            <div
              key={ciudad}
              className="mb-15 border-2 border-blue-300 p-6 rounded-lg bg-white shadow-md hover:shadow-lg transition-all duration-300 ease-in-"
            >
              {/* ENCABEZADO CON ID Y MARGEN DE SCROLL */}
              <div className="paquete-header mb-5 flex items-center justify-between">
                <h2
                  id={ciudad}
                  className="text-blue-900 text-3xl scroll-mt-[200px]"
                >
                  {ciudad}
                </h2>
                <Church />
              </div>

              <Divider sx={{ borderWidth: 3, borderColor: "blue", marginBottom: "10px" }} />

              <div className="w-full">
                {paquetesFiltrados.map((p: any) => (
                  <div key={p.id} className="grid grid-cols-3 gap-4 mb-5">
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
                      <div className="ml-5 grid grid-cols-1 gap-4">
                        <button className="button-delete" onClick={() => console.log("Eliminar", p.id)}>
                          Cancelar Paquete
                        </button>
                        <button className="button-approve">
                          Aprovar
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
