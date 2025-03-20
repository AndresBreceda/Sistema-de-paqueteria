import { useQuery } from "@tanstack/react-query";
import Paquete from "./types";
import './styles.css';

const fetchData = async () => {
  try {
      const response = await fetch("https://localhost:5001/api/Pedidos");
  
      // Verificar si la respuesta es válida
      if (!response.ok) {
        const errorText = await response.text(); // Intenta obtener el error detallado
        throw new Error(`HTTP Error: ${response.status} - ${errorText}`);
      }
  
      return response.json();
    } catch (error) {
      console.error("Fetch error: ", error); // Log del error en la consola
      throw error; // React Query manejará este error
  }
};
  
// Hook personalizado con React Query
export const useGetData = () => {
    return useQuery({
      queryKey: ["data"], // Clave de caché
      queryFn: fetchData, // Función de fetch
      refetchInterval: 3 * 60 * 1000, // Refetch cada 3 minutos (en milisegundos)
      refetchIntervalInBackground: true, // Refetch incluso cuando la ventana no está activa
      staleTime: 2.5 * 60 * 1000, // Considera los datos obsoletos después de 2.5 minutos
      retry: 3,
    });
};

export default function Paquetes(){
  const { data, error, isLoading } = useGetData();

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="p-6 bg-gray-100 rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold mb-6 text-blue-900 text-center">Próximos Paquetes</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.map((item: Paquete) => (
          <div
            key={item._id}
            className="border-2 border-blue-300 p-6 rounded-lg bg-white shadow-md hover:shadow-lg transition-all duration-300 ease-in-out"
          >
            <strong className="text-lg text-blue-900">Nombre del remitente:</strong> {item.nombre_remitente}
            <br />
            <strong className="text-lg text-blue-900">Número del camión:</strong> {item.numero_camion}
            <br />
            <strong className="text-lg text-blue-900">Ciudad de Inicio:</strong> {item.ciudad_inicio}
            <br />
            <strong className="text-lg text-blue-900">Ciudad de destino:</strong> {item.ciudad_destino}
            <br />
            <strong className="text-lg text-blue-900">Nombre del destinatario:</strong> {item.nombre_destinatario}
            <br />
            <strong className="text-lg text-blue-900">Número de guía:</strong> {item.numero_guia}
            <br />
            <strong className="text-lg text-blue-900">Número de paquetes:</strong> {item.numero_paquetes}
            <div className="grid grid-cols-2 grid-rows-1 gap-4 mt-10">
              <button>Editar</button>
              <button>Eliminar</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
  
}
