import { Hash, House, Send, User } from "lucide-react";
import { ChangeEvent, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import './Formulario.css';

// Definimos la interface para el pedido
interface Pedido {
  nombre_remitente: string;
  numero_guia: string;
  numero_camion: string;
  numero_paquetes: string;
  ciudad_inicio: string;
  ciudad_destino: string;
  nombre_destinatario: string;
}

// Función para enviar los datos a la API
const createPedido = async (pedido: Pedido): Promise<any> => {
  const response = await fetch('https://localhost:5001/api/Pedidos', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(pedido),
  });
  
  if (!response.ok) {
    throw new Error('Error al crear el pedido');
  }
  
  return response.json();
};

export default function Formulario() {
    const [formData, setFormData] = useState({    
        quien: "",
        guia: "",
        camion: "",
        paquetes: "",
        inicio: "",
        destino: "", // Corregido el nombre para que coincida con el mapeado de campos
        destinatario: "",
    });
    
    const [message, setMessage] = useState({ text: '', isError: false });

    // Configurar la mutación con TanStack Query
    const mutation = useMutation({
        mutationFn: (data: typeof formData) => {
            // Transformar los datos del formulario al formato esperado por la API
            const pedido: Pedido = {
                nombre_remitente: data.quien,
                numero_guia: data.guia,
                numero_camion: data.camion,
                numero_paquetes: data.paquetes,
                ciudad_inicio: data.inicio,
                ciudad_destino: data.destino,
                nombre_destinatario: data.destinatario
            };
            
            return createPedido(pedido);
        },
        onSuccess: () => {
            setMessage({ text: '¡Pedido creado exitosamente!', isError: false });
            // Limpiar el formulario después de enviar con éxito
            setFormData({
                quien: "",
                guia: "",
                camion: "",
                paquetes: "",
                inicio: "",
                destino: "",
                destinatario: "",
            });
            
            // Limpiar el mensaje después de 3 segundos
            setTimeout(() => setMessage({ text: '', isError: false }), 3000);
        },
        onError: (error) => {
            setMessage({ text: `Error: ${error instanceof Error ? error.message : 'Ocurrió un error desconocido'}`, isError: true });
            
            // Limpiar el mensaje de error después de 5 segundos
            setTimeout(() => setMessage({ text: '', isError: false }), 5000);
        }
    });

    function handleChange(e: ChangeEvent<HTMLInputElement>) {
        const { name, value } = e.target;
        setFormData({
          ...formData,
          [name]: value,
        });
    }

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        // Enviar datos usando la mutación
        mutation.mutate(formData);
    }

    return (
        <div className="p-6 bg-gray-100 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold mb-4 text-blue-900">Información del paquete</h2>
            
            {/* Mensaje de éxito o error */}
            {message.text && (
                <div className={`mb-4 p-3 rounded ${message.isError ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'}`}>
                    {message.text}
                </div>
            )}
            
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                    {[
                        { label: "Quien manda:", name: "quien", icon: <User size={20} />, placeholder: "Nombre" },
                        { label: "Numero de guia:", name: "guia", icon: <Hash size={20} />, placeholder: "no1234" },
                        { label: "Numero de camion:", name: "camion", icon: <Hash size={20} />, placeholder: "no1234" },
                        { label: "Numero de paquetes:", name: "paquetes", icon: <Send size={20} />, placeholder: "1", type: "number" },
                        { label: "Ciudad de inicio:", name: "inicio", icon: <House size={20} />, placeholder: "Aguascalientes" },
                        { label: "Ciudad de destino:", name: "destino", icon: <House size={20} />, placeholder: "Destino" },
                        { label: "Nombre del destinatario:", name: "destinatario", icon: <User size={20} />, placeholder: "Nombre del destinatario" },
                    ].map(({ label, name, icon, placeholder, type = "text" }) => (
                        <div key={name} className="flex items-center gap-4">
                            <label htmlFor={name} className="text-gray-700 font-medium w-48 text-right">
                                {label}
                            </label>
                            <div className="relative flex items-center w-full">
                                <span className="absolute left-3 text-gray-500">{icon}</span>
                                <input
                                    type={type}
                                    id={name}
                                    name={name}
                                    placeholder={placeholder}
                                    value={formData[name as keyof typeof formData]}
                                    onChange={handleChange}
                                    required
                                    className="w-full pl-10 pr-4 py-2 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 bg-white text-gray-900"
                                />
                            </div>
                        </div>
                    ))}
                </div>
                <button 
                    type="submit" 
                    className="button"
                    disabled={mutation.isPending}
                >
                    {mutation.isPending ? 'Enviando...' : 'Enviar'}
                </button>
            </form>
        </div>
    );
}