import Header from "../../Components/Header/Header";
import Divider from '@mui/material/Divider';
import "./styles.css";
import { Church } from "lucide-react";
import { useGetData } from "../../Hooks/Hooks";
import { useNavigate } from "react-router-dom";

function pedido_lleno(obj: any) {
  const camposRequeridos = [
    'numero_camion',
    'hora_salida',
    // otros campos que sean obligatorios
  ];
  
  return camposRequeridos.every(campo => 
    obj[campo] !== null && 
    obj[campo] !== undefined && 
    obj[campo] !== ''
  );
}

export default function TodosLosPaquetes() {
  const { isError, isLoading, data } = useGetData();

  const navigate = useNavigate();

  function CompletarPaquete(p: any){
    navigate("/Formulario#formulario", { state: { paquete: p } });
  
  }

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

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {paquetesFiltrados.map((p: any) => (
                <div key={p.id} className="border-2 p-4 rounded-lg shadow-md">
                  <p><strong>Nombre del remitente:</strong> {p.nombre_remitente}</p>
                  <p><strong>Numero de guia:</strong> {p.numero_guia}</p>
                  <p><strong>Numero de camión:</strong> {p.numero_camion || <span className="text-red-600 font-semibold">[Por llenar]</span>}</p>
                  <p><strong>Numero de paquetes:</strong> {p.numero_paquetes}</p>
                  <p><strong>Ciudad de inicio:</strong> {p.ciudad_inicio}</p>
                  <p><strong>Ciudad de destino:</strong> {p.ciudad_destino}</p>
                  <p><strong>Nombre del destinatario:</strong> {p.nombre_destinatario}</p>
                  <p><strong>Hora de marcaje de paquete:</strong>
                  <br></br>
                  {" " + p.hora_captura}</p>
                  <p><strong>Hora de salida del paquete:</strong> {p.hora_salida || <span className="text-red-600 font-semibold">[Por llenar]</span>}</p>

                  <div className="mt-4">  
                  {!pedido_lleno(p) ? (
                    <button onClick={()=>CompletarPaquete(p)} className="bg-amber-400 button-almost-approve">
                      Completar paquete
                    </button>
                  ) : (
                    <button onClick={() => console.log("hola")} className="button-approve">
                      Aprobar Paquete
                    </button>
                  )}
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
