import Paquete from "./types";
import './styles.css';
import { useGetData, useDeletePedido } from "../../Hooks/Hooks";

export default function Paquetes(){
  const { data, error, isLoading } = useGetData();
  const { mutate: deletePedido, error: isErrorDelete, isError: isLoadingDelete } = useDeletePedido();

  const handleDelete = (id: any) => {
    deletePedido(id);
  };

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  // Obtener los últimos 10 paquetes
  const ultimosDiez = [...data].slice(-10).reverse(); // `reverse` para que el más reciente esté primero

  return (
    <div className="p-6 bg-gray-100 rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold mb-6 text-blue-900 text-center">Últimos 10 Paquetes</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {ultimosDiez.length === 0 &&
          <div className="flex justify-center items-cente">
            <div className="text-lg text-blue-900 rounded-lg">
              ...No hay paquetes...
            </div>
          </div> 
        }
        {ultimosDiez.map((item: Paquete) => (
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
            <br />
            <strong className="text-lg text-blue-900">Peso:</strong> {item.peso}
            <br />
            <strong className="text-lg text-blue-900">Artículo:</strong> {item.articulo}
            <div className="grid grid-cols-2 grid-rows-1 gap-4 mt-10">
              <button className="button-edit">Editar</button>
              <button className="button-delete" onClick={() => handleDelete(item._id)} disabled={isLoadingDelete}>
                {isLoadingDelete ? "Eliminando..." : "Eliminar"}
              </button>
              {isErrorDelete && <p className="text-red-500">{isErrorDelete.message}</p>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
