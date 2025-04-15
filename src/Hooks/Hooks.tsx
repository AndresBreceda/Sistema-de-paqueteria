import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

// Función para eliminar un pedido
const deleteData = async (pedidoId: any) => {
  try {
    const response = await fetch(`https://localhost:5001/api/Pedidos/${pedidoId}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`HTTP Error: ${response.status} - ${errorText}`);
    }

    return response.json(); // Si el backend devuelve algo
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
      queryClient.invalidateQueries(["pedidos"]); // Refrescar la lista después de eliminar
    },
  });
};



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