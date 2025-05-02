import { useState, useEffect } from "react";
import Paquete from "./types";
import './styles.css';
import Swal from 'sweetalert2';
import { useGetData, useDeletePedido } from "../../Hooks/Hooks";

export default function Paquetes() {
  const { data, error, isLoading, refetch } = useGetData();
  const { mutate: deletePedido, isSuccess, isError: isLoadingDelete } = useDeletePedido();
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  // Mostrar mensaje y actualizar datos cuando se elimina un paquete
  useEffect(() => {
    if (isSuccess) {
      setShowSuccessMessage(true);
      refetch(); // Refresca los datos
      const timer = setTimeout(() => {
        setShowSuccessMessage(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isSuccess, refetch]);

   async function sureDelete(id: any) {
    const result = await Swal.fire({
      title: "¿Estás seguro?",
      text: "Esta acción eliminará el paquete de forma permanente.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    });

    if (result.isConfirmed) {
      deletePedido(id);
    }
  }

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p className="text-red-600">Error: {error.message}</p>;

  const ultimosDiez = [...data].slice(-10).reverse();

  return (
    <div className="p-6 bg-gray-100 rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold mb-6 text-blue-900 text-center">Últimos 10 Paquetes</h2>

      {showSuccessMessage && (
        <p className="text-green-600 font-semibold mb-4 text-center">
          ✅ Paquete eliminado correctamente
        </p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {ultimosDiez.length === 0 && (
          <div className="flex justify-center items-center col-span-full">
            <div className="text-lg text-blue-900 rounded-lg">
              No hay paquetes
            </div>
          </div>
        )}

        {ultimosDiez.map((item: Paquete) => (
          <div
            key={item.id}
            className="border-2 border-blue-300 p-6 rounded-lg bg-white shadow-md hover:shadow-lg transition-all duration-300 ease-in-out"
          >
            <strong className="text-lg text-blue-900">Nombre del remitente:</strong> {item.nombre_remitente}
            <br />
            <strong className="text-lg text-blue-900">Número del camión:</strong> {item.numero_camion || <span className="text-red-600 font-semibold">[Por llenar]</span>}
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
            <br />
            <strong className="text-lg text-blue-900">Hora de salida:</strong> {item.hora_salida || <span className="text-red-600 font-semibold">[Por llenar]</span>}
            <div className="grid grid-cols-2 gap-4 mt-10">
              <button className="button-edit">Editar</button>
              <button
                className="button-delete"
                onClick={() => sureDelete(item.id)}
                disabled={isLoadingDelete}
              >
                {isLoadingDelete ? "Eliminando..." : "Eliminar"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
