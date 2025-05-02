import Header from "../../Components/Header/Header";
import Divider from '@mui/material/Divider';
import "./styles.css";
import { Check, Church, Pencil } from "lucide-react";
import { useGetData } from "../../Hooks/Hooks";
import { useNavigate } from "react-router-dom";
import { useDeletePedido } from "../../Hooks/Hooks";
import { useCreateConfirm } from "../../Hooks/Hooks";
import Swal from "sweetalert2";
import { useEffect, useState } from "react";

function pedido_lleno(obj: any) {
  const camposRequeridos = ['numero_camion', 'hora_salida'];
  return camposRequeridos.every(campo => obj[campo] !== null && obj[campo] !== undefined && obj[campo] !== '');
}

export default function TodosLosPaquetes() {
  const { isError, isLoading, data, refetch } = useGetData();
  const { mutate: deletePedido, isSuccess } = useDeletePedido();
  const { mutate: createConfirm } = useCreateConfirm();
  const navigate = useNavigate();
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [deletingId, setDeletingId] = useState<number | null>(null);

  useEffect(() => {
    if (isSuccess) {
      setShowSuccessMessage(true);
      refetch();
      const timer = setTimeout(() => {
        setShowSuccessMessage(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isSuccess, refetch]);

  async function sureDelete(id: any) {
    if (deletingId !== null) return;
  
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
      // Guardar posición de scroll
      const scrollY = window.scrollY;
  
      setDeletingId(id);
      deletePedido(id, {
        onSettled: () => {
          setDeletingId(null);
          // Restaurar scroll después del siguiente repaint
          setTimeout(() => window.scrollTo(0, scrollY), 0);
        },
      });
    }
  }

  async function aprobarYEliminar(p: any) {
    if (deletingId !== null) return;

    const result = await Swal.fire({
      title: '¿Estás seguro?',
      text: "Confirmar de que el paquete fue recibido y este ha sido entregado al cliente",
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, confirmar',
      cancelButtonText: 'Cancelar'
    });

    if (result.isConfirmed) {
      setDeletingId(p.id);
      createConfirm({
        nombre_remitente: p.nombre_remitente,
        numero_camion: p.numero_camion,
        ciudad_inicio: p.ciudad_inicio,
        nombre_destinatario: p.nombre_destinatario,
        numero_guia: p.numero_guia,
        numero_paquetes: p.numero_paquetes,
        ciudad_destino: p.ciudad_destino,
        peso: p.peso,
        articulo: p.articulo,
        precio: p.precio,
        hora_captura: p.hora_captura,
        hora_salida: p.hora_salida,
      });
      deletePedido(p.id, {
        onSettled: () => setDeletingId(null),
      });
      Swal.fire('¡Enviado!', 'El paquete ha sido confirmado de entregado, gracias  .', 'success');
    } else {
      Swal.fire('Cancelado', 'El paquete no fue confirmado.', 'info');
    }
  }

  function CompletarPaquete(p: any) {
    navigate("/Formulario#formulario", { state: { paquete: p, paqueteId: p.id, Captura: p.hora_captura } });
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
          <a href="/Formulario" className="text-blue-600 underline mt-2 inline-block cursor-pointer">aquí</a>
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
          <div key={ciudad} className="mt-10">
            <a
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
              <div className="paquete-header mb-5 flex items-center justify-between">
                <h2 id={ciudad} className="text-blue-900 text-3xl scroll-mt-[200px]">
                  {ciudad}
                </h2>
                <Church />
              </div>

              <Divider sx={{ borderWidth: 3, borderColor: "blue", marginBottom: "10px" }} />

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {paquetesFiltrados.map((p: any) => (
                  <div key={p.id} className="relative border-2 p-4 rounded-lg shadow-md text-left">
                    <button
                      onClick={() => sureDelete(p.id)}
                      disabled={!!deletingId && deletingId === p.id}
                      className="button-base button-active"
                      title="Eliminar paquete"
                    >
                      ✖
                    </button>
                    <p><strong>Nombre del remitente:</strong> {p.nombre_remitente}</p>
                    <p><strong>Numero de guía:</strong> {p.numero_guia}</p>
                    <p><strong>Numero de camión:</strong> {p.numero_camion || <span className="text-red-600 font-semibold">[Por llenar]</span>}</p>
                    <p><strong>Numero de paquetes:</strong> {p.numero_paquetes}</p>
                    <p><strong>Ciudad de inicio:</strong> {p.ciudad_inicio}</p>
                    <p><strong>Ciudad de destino:</strong> {p.ciudad_destino}</p>
                    <p><strong>Nombre del destinatario:</strong> {p.nombre_destinatario}</p>
                    <p><strong>Hora de marcaje:</strong> {" " + p.hora_captura}</p>
                    <p><strong>Hora de salida:</strong> {p.hora_salida || <span className="text-red-600 font-semibold">[Por llenar]</span>}</p>

                    <div className="mt-4">
                      {!pedido_lleno(p) ? (
                        <button onClick={() => CompletarPaquete(p)} className="flex ml-10 bg-amber-400 button-almost-approve">
                          <Pencil></Pencil>
                          Completar paquete
                        </button>
                      ) : (
                        <button onClick={() => aprobarYEliminar(p)} className="flex ml-10 button-approve">
                          <Check></Check>
                          Confirmar de entregado
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
