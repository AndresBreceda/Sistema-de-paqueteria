import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Pedido } from "../pages/Formulario/Formulario";

// Función para eliminar un pedido
const deleteData = async (pedidoId: KeyUsage) => {
  try {
    const response = await fetch(`https://localhost:5001/api/Pedidos/${pedidoId}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`HTTP Error: ${response.status} - ${errorText}`);
    }

    const text = await response.text();
    return text ? JSON.parse(text) : null;
  } catch (error) {
    console.error("Fetch error: ", error);
    throw error;
  }
};

// Hook para usar la mutación
export const useDeletePedido = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteData,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["pedidos"] });

    },
  });
};

const fetchDataConfirmados = async (ciudad: string) => {
  try {
    const response = await fetch(`https://localhost:5001/api/Confirmados/${ciudad}`);

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`HTTP Error: ${response.status} - ${errorText}`);
    }

    return response.json();
  } catch (error) {
    console.error("Fetch error:", error);
    throw error;
  }
};

export const useGetConfirmados = (ciudad: string, enabled = true) => {
  return useQuery({
    queryKey: ["confirmados", ciudad],
    queryFn: () => fetchDataConfirmados(ciudad),
    enabled, // desactiva el fetch automático
    refetchInterval: 3 * 60 * 1000,
    refetchIntervalInBackground: true,
    staleTime: 2.5 * 60 * 1000,
    retry: 3,
  });
};


const fetchData = async () => {
  try {
    const response = await fetch(`https://localhost:5001/api/pedidos/`);

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`HTTP Error: ${response.status} - ${errorText}`);
    }

    return response.json();
  } catch (error) {
    console.error("Fetch error:", error);
    throw error;
  }
};

// Hook personalizado con React Query
export const useGetData = () => {
    return useQuery({
      queryKey: ["pedidos"], // Clave de caché
      queryFn: fetchData, // Función de fetch
      refetchInterval: 3 * 60 * 1000, // Refetch cada 3 minutos (en milisegundos)
      refetchIntervalInBackground: true, // Refetch incluso cuando la ventana no está activa
      staleTime: 2.5 * 60 * 1000, // Considera los datos obsoletos después de 2.5 minutos
      retry: 3,
    });
};

const fetchUsers = async (nombre: string) => {
  try {
    const response = await fetch(`https://localhost:5001/api/Log/${nombre}`);

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`HTTP Error: ${response.status} - ${errorText}`);
    }

    return response.json();
  } catch (error) {
    console.error("Fetch error: ", error);
    throw error;
  }
};

export const UseGetUsers = (nombre: string) => {
  return useQuery({
    queryKey: ["user", nombre], // clave de caché única por ID
    queryFn: () => fetchUsers(nombre), // ✅ función que se ejecuta solo cuando react-query lo pide
    retry: 3,
    enabled: !!nombre, // previene fetch si id está vacío
  });
};

export const useCreateConfirm = () => {
  return useMutation({
    mutationFn: (p: any) => createPedidoConfirmado(p),
  });
}

const createPedidoConfirmado = async (pedido: Pedido): Promise<any> => {
  const response = await fetch('https://localhost:5001/api/Confirmados', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(pedido),
  });

  if (!response.ok) {
    const errorText = await response.text(); // <-- leer el mensaje del servidor
    throw new Error('Error al crear el pedido: ' + errorText);
  }

  return response.json();
};
