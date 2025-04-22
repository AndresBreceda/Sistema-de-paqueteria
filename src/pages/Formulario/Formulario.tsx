import { Check, CircleOff, DollarSign, Hash, House, Pencil, Send, User, Weight } from "lucide-react";
import { ChangeEvent, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import './Formulario.css';

const ciudades = [
  "Aguascalientes", "Calvillo", "Jalpa", "Tabasco", "Juchipila",
  "Villa Hidalgo", "Teocaltiche", "Loreto", "Pinos", "Ojuelos", "San Luis"
];

interface Pedido {
  nombre_remitente: string;
  numero_guia: string;
  numero_camion: string;
  numero_paquetes: string;
  ciudad_inicio: string;
  ciudad_destino: string;
  nombre_destinatario: string;
  peso: string;
  articulo: string;
  precio: string;
}

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
    destino: "",
    destinatario: "",
    peso: "",
    articulo: "",
    precio: ""
  });

  const [message, setMessage] = useState({ text: '', isError: false });
  const [mismoLugarError, setMismoLugarError] = useState(false);

  const mutation = useMutation({
    mutationFn: (data: typeof formData) => {
      const pedido: Pedido = {
        nombre_remitente: data.quien,
        numero_guia: data.guia,
        numero_camion: data.camion,
        numero_paquetes: data.paquetes,
        ciudad_inicio: data.inicio,
        ciudad_destino: data.destino,
        nombre_destinatario: data.destinatario,
        articulo: data.articulo,
        peso: data.peso,
        precio: data.precio
      };

      return createPedido(pedido);
    },
    onSuccess: () => {
      setMessage({ text: '¡Pedido creado exitosamente!', isError: false });
      setFormData({
        quien: "",
        guia: "",
        camion: "",
        paquetes: "",
        inicio: "",
        destino: "",
        destinatario: "",
        peso: "",
        articulo: "",
        precio: ""
      });
      setTimeout(() => setMessage({ text: '', isError: false }), 3000);
    },
    onError: (error) => {
      setMessage({ text: `Error: ${error instanceof Error ? error.message : 'Ocurrió un error desconocido'}`, isError: true });
      setTimeout(() => setMessage({ text: '', isError: false }), 5000);
    }
  });

  function handleChange(e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    const { name, value } = e.target;
    const newForm = {
      ...formData,
      [name]: value,
    };

    if (newForm.inicio && newForm.destino && newForm.inicio === newForm.destino) {
      setMismoLugarError(true);
    } else {
      setMismoLugarError(false);
    }

    setFormData(newForm);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    mutation.mutate(formData);
  }

  return (
    <div className="p-6 bg-gray-100 rounded-lg shadow-md">
      <h2 className="text-lg font-semibold mb-4 text-blue-900">Información del paquete</h2>

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
            { label: "Ciudad de inicio:", name: "inicio", icon: <House size={20} /> },
            { label: "Ciudad de destino:", name: "destino", icon: <House size={20} /> },
            { label: "Nombre del destinatario:", name: "destinatario", icon: <User size={20} />, placeholder: "Nombre del destinatario" },
            { label: "Peso del paquete", name: "peso", icon: <Weight size={20} />, placeholder: "1 kg", type: "text" },
            { label: "Nombre del articulo", name: "articulo", icon: <Pencil size={20} />, placeholder: "Articulo", type: "text" },
            { label: "Precio", name: "precio", icon: <DollarSign size={20} />, placeholder: "$", type: "text" },
          ].map(({ label, name, icon, placeholder, type = "text" }) => (
            <div key={name} className="flex items-center gap-4">
              <label htmlFor={name} className="text-gray-700 font-medium w-48 text-right">
                {label}
              </label>
              <div className="relative flex flex-col items-start w-full">
                <div className="w-full relative flex items-center">
                  <span className="absolute left-3 text-gray-500">{icon}</span>
                  {["inicio", "destino"].includes(name) ? (
                    <select
                      id={name}
                      name={name}
                      value={formData[name as keyof typeof formData]}
                      onChange={handleChange}
                      required
                      className={`w-full pl-10 pr-4 py-2 border rounded-md bg-white text-gray-900
                        ${mismoLugarError ? 'border-red-500 ring-red-300 focus:ring-red-300' : 'border-gray-400 focus:ring-blue-600'}
                      `}
                    >
                      <option value="">Selecciona una ciudad</option>
                      {ciudades.map((ciudad) => (
                        <option key={ciudad} value={ciudad}>{ciudad}</option>
                      ))}
                    </select>
                  ) : (
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
                  )}
                </div>
                {["inicio", "destino"].includes(name) && mismoLugarError && (
                  <p className="text-red-600 text-sm mt-1">La ciudad de origen y destino no pueden ser iguales.</p>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center gap-4 mt-4">
          <button
            type="button"
            className="buttonEdit"
            onClick={() => setFormData({
              quien: "",
              guia: "",
              camion: "",
              paquetes: "",
              inicio: "",
              destino: "",
              destinatario: "",
              peso: "",
              articulo: "",
              precio: ""
            })}
          >
            <CircleOff size={16} /> Cancelar
          </button>
          <button
            type="submit"
            className="button"
            disabled={mutation.isPending || mismoLugarError}
          >
            <Check size={16} /> {mutation.isPending ? 'Enviando...' : 'Enviar'}
          </button>
        </div>
      </form>
    </div>
  );
}
