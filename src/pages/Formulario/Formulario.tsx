import { Check, CircleOff, DollarSign, Hash, House, Pencil, Send, Timer, User, Weight } from "lucide-react";
import { ChangeEvent, useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import './Formulario.css';
import { useLocation, useNavigate } from "react-router-dom";
import { useEditarPedido } from "../../Hooks/Hooks";
import { agregarImagen } from "../../Components/Ciudad_registro/CiudadComponente";
import jsPDF from "jspdf";
import { agregarEncabezado } from "../../Components/Ciudad_registro/CiudadComponente";

const ciudades = [
  "Aguascalientes", "Calvillo", "Jalpa", "Tabasco", "Juchipila",
  "Villa Hidalgo", "Teocaltiche", "Loreto", "Pinos", "Ojuelos", "San Luis"
];

export interface Pedido {
  id?: string;
  pedido?: string;
  nombre_remitente?: string;
  numero_guia: string;
  numero_camion?: string;
  numero_paquetes: string;
  ciudad_inicio: string;
  ciudad_destino: string;
  nombre_destinatario: string;
  peso: string;
  articulo: string;
  precio: string;
  hora_salida?: string;
  hora_captura?:string;

}

function obtenerHoraYFechaSalida() {
  const ahora = new Date();

  // Formatear la fecha como "YYYY-MM-DD"
  const año = ahora.getFullYear();
  const mes = String(ahora.getMonth() + 1).padStart(2, '0'); // Los meses son indexados desde 0
  const dia = String(ahora.getDate()).padStart(2, '0');
  const fecha = `${año}-${mes}-${dia}`;

  // Formatear la hora como "HH:MM:SS"
  const horas = String(ahora.getHours()).padStart(2, '0');
  const minutos = String(ahora.getMinutes()).padStart(2, '0');
  const segundos = String(ahora.getSeconds()).padStart(2, '0');
  const hora = `${horas}:${minutos}:${segundos}`;

  // Combinar fecha y hora
  return `Dia:${fecha} Hora:${hora}`;
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
    throw new Error('Error al crear el pedido' + Error);
  }

  return response.json();
};

////////////////
////////////////
//////////////// INICIO COMPONENTE
////////////////
////////////////
////////////////
export default function Formulario() { 
  const { mutate } = useEditarPedido();
  const location = useLocation();
  const paqueteRecibido = location.state?.paquete;
  const idPaquete = location.state?.paqueteId;
  const navigate = useNavigate();
  

  const [formData, setFormData] = useState(() => ({
    guia: paqueteRecibido?.numero_guia || "",
    camion: paqueteRecibido?.numero_camion || "",
    paquetes: paqueteRecibido?.numero_paquetes || "",
    inicio: paqueteRecibido?.ciudad_inicio || "",
    destino: paqueteRecibido?.ciudad_destino || "",
    destinatario: paqueteRecibido?.nombre_destinatario || "",
    peso: paqueteRecibido?.peso || "",
    articulo: paqueteRecibido?.articulo || "",
    precio: paqueteRecibido?.precio || "",
    hora_salida: paqueteRecibido?.hora_salida || ""
  }));



  const [message, setMessage] = useState({ text: '', isError: false });
  const [mismoLugarError, setMismoLugarError] = useState(false);

  const nombre_cuenta_entrante = localStorage.getItem("nombre_usuario") || '';

  const mutation = useMutation({
    mutationFn: (data: typeof formData) => {
      const pedido: Pedido = {
        nombre_remitente: nombre_cuenta_entrante,
        numero_guia: data.guia,
        numero_camion: data.camion,
        numero_paquetes: data.paquetes,
        ciudad_inicio: data.inicio,
        ciudad_destino: data.destino,
        nombre_destinatario: data.destinatario,
        articulo: data.articulo,
        peso: data.peso,
        precio: data.precio,
        hora_captura: obtenerHoraYFechaSalida(),
        hora_salida: data.hora_salida
      };

      return createPedido(pedido);
    },
    onSuccess: () => {
      setMessage({ text: '¡Pedido creado exitosamente!', isError: false });
      setFormData({
        guia: "",
        camion: "",
        paquetes: "",
        inicio: "",
        destino: "",
        destinatario: "",
        peso: "",
        articulo: "",
        precio: "",
        hora_salida: ""
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

  const [errores, setErrores] = useState<{ [key: string]: string }>({});

  function validarCampos() {
    const nuevosErrores: { [key: string]: string } = {};
  
    const camposObligatorios = [
      { key: 'guia', label: 'Número de guía' },
      { key: 'paquetes', label: 'Número de paquetes' },
      { key: 'inicio', label: 'Ciudad de inicio' },
      { key: 'destino', label: 'Ciudad de destino' },
      { key: 'destinatario', label: 'Nombre del destinatario' },
      { key: 'peso', label: 'Peso del paquete' },
      { key: 'articulo', label: 'Nombre del artículo' },
      { key: 'precio', label: 'Precio' },
    ];
  
    camposObligatorios.forEach(({ key, label }) => {
      if (!formData[key as keyof typeof formData]) {
        nuevosErrores[key] = `${label} es obligatorio`;
      }
    });
  
    if (formData.inicio && formData.destino && formData.inicio === formData.destino) {
      nuevosErrores.inicio = "La ciudad de inicio no puede ser igual a la de destino";
      nuevosErrores.destino = "La ciudad de destino no puede ser igual a la de inicio";
    }
  
    setErrores(nuevosErrores);
  
    return Object.keys(nuevosErrores).length === 0; // true si no hay errores
  }

  async function imprimirRegistro(paquete: any) {
    const doc = new jsPDF();
    const date = new Date();
    const fechaFormateada = date.toLocaleDateString("es-ES", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });

    agregarEncabezado(doc);

    const numeroPaquete = `PK-${paquete.destino.slice(0, 3).toUpperCase()}-${date.getTime()}`;
  
    doc.setFontSize(16);
    doc.text(`Paquete del día: ${fechaFormateada}`, 70, 15);
  
    doc.setFontSize(10);
    doc.text(`No. Guía: ${paquete.guia}`, 100, 35);
    doc.text(`No. Paquete: ${numeroPaquete}`, 140, 35);
  
    // Remitente
    doc.text(`Remitente: ${nombre_cuenta_entrante}`, 100, 40);
    doc.text(`Ciudad Origen: ${paquete.inicio}`, 100, 45);
    doc.text(`Hora de salida: ${paquete.hora_salida}`, 100, 50);
  
    // Destinatario
    doc.text("DESTINATARIO - RECIBE:", 100, 60);
    doc.text(`Destino: ${paquete.destino}`, 100, 65);
    doc.text(`Nombre: ${paquete.destinatario}`, 100, 70);
    doc.text("Domicilio: __________________________", 100, 75);
    doc.text("Colonia: _____________________________", 100, 80);
    doc.text("Ciudad: ______________________________", 100, 85);
  
    // Detalles del paquete
    doc.text(`Número de paquetes: ${paquete.paquetes}`, 10, 90);
    doc.text(`Peso: ${paquete.peso} kg`, 10, 95);
    doc.text(`Artículo: ${paquete.articulo}`, 10, 100);
    doc.text(`Precio declarado: $${paquete.precio}`, 10, 105);
    doc.text(`Hora de captura: ${obtenerHoraYFechaSalida()}`, 10, 110);
    doc.text(`Hora de salida: ${paquete.hora_salida}`, 10, 115);
  
    // === Tipo de Servicio (en forma de tabla con casillas) ===
    doc.text("Tipo de Servicio:", 10, 125);
    doc.rect(10, 130, 100, 30); // Marco principal

    const servicios = ["E.D.", "S.D.", "OCURRE", "R.D."];
    let xServicio = 12;
    let yServicio = 135;

    servicios.forEach((tipo, index) => {
      doc.rect(xServicio, yServicio, 4, 4); // casilla
      doc.text(tipo, xServicio + 6, yServicio + 3);
      xServicio += 24;
    });

    // === Tabla de Concepto e Importe ===
    doc.text("CONCEPTO", 10, 170);
    doc.text("IMPORTE", 80, 170);

    // Cabecera de tabla
    doc.line(10, 172, 120, 172); // línea horizontal debajo del encabezado
    doc.line(10, 170, 10, 220); // línea vertical izquierda
    doc.line(70, 170, 70, 220); // línea vertical separación columna
    doc.line(120, 170, 120, 220); // línea vertical derecha

    const conceptos = ["FLETE", "E.D.", "R.D.", "SEGURO", "OTROS", "SUB-TOTAL", "I.V.A.", "TOTAL"];
    let y = 178;

    conceptos.forEach((concepto) => {
      doc.text(concepto, 12, y);
      doc.text("__________", 72, y);
      y += 6;
    });

    // Línea inferior de la tabla
    doc.line(10, y - 2, 120, y - 2);
  
    // Remitente firma
    doc.text(`Nombre y Firma del Remitente: ${nombre_cuenta_entrante}`, 10, y + 10);
    doc.text("_____________________________", 60, y + 10);
  
    await agregarImagen(doc);
  
    doc.save(`paquete_${numeroPaquete}.pdf`);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
  
    if (validarCampos()) {
      mutation.mutate(formData);

      imprimirRegistro(formData);
    } else {
      setMessage({ text: 'Por favor completa todos los campos obligatorios.', isError: true });
    }
  }
  
  useEffect(() => {
    if (location.hash) {
      const element = document.querySelector(location.hash);
      if (element) {
        const yOffset = -200; // Mover 200px más arriba
        const y = element.getBoundingClientRect().top + window.scrollY + yOffset;
  
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    }
  }, [location]);
  

  const handleEdit = (e: React.FormEvent) => {
    e.preventDefault();

    const pedidoEditado = {
      id: idPaquete, // asegúrate de tener el ID del pedido
      nombre_remitente: nombre_cuenta_entrante,
      numero_camion: formData.camion,
      ciudad_inicio: formData.inicio,
      nombre_destinatario: formData.destinatario,
      numero_guia: formData.guia,
      numero_paquetes: formData.paquetes,
      ciudad_destino: formData.destino,
      peso: formData.peso,
      articulo: formData.articulo,
      precio: formData.precio,
      hora_salida: formData.hora_salida,
      hora_captura: paqueteRecibido.hora_captura
    };
  
    mutate(pedidoEditado);

      setMessage({ text: '¡Pedido editado exitosamente!'});

      setFormData({
        guia: "",
        camion: "",
        paquetes: "",
        inicio: "",
        destino: "",
        destinatario: "",
        peso: "",
        articulo: "",
        precio: "",
        hora_salida: ""
      });

      setTimeout(() => {
        // Navegar a la página de Pedidos

      }, 3000); // 3 segundos de espera
      navigate("/Pedidos");
  };

return (
  <div className="p-6 bg-gray-100 rounded-lg shadow-md">
    <h2 id="formulario" className="text-lg font-semibold mb-4 text-blue-900">Información del paquete</h2>

  {message.text && (
    <div className={`mb-4 p-3 rounded ${message.isError ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'}`}>
      {message.text}
    </div>
  )}


    <form className="space-y-4" onSubmit={handleEdit}>
      <div className="grid grid-cols-2 gap-4">
        {[
          // { label: "Quien manda:", name: "quien", icon: <User size={20} />, placeholder: "Nombre" },
            { label: "Nombre del destinatario:", name: "destinatario", icon: <User size={20} />, placeholder: "Nombre del destinatario" },
            { label: "Numero de guia:", name: "guia", icon: <Hash size={20} />, placeholder: "no1234" },
            { label: "Numero de camion:", name: "camion", icon: <Hash size={20} />, placeholder: "no1234" },
            { label: "Numero de paquetes:", name: "paquetes", icon: <Send size={20} />, placeholder: "1", type: "number" },
            { label: "Ciudad de inicio:", name: "inicio", icon: <House size={20} /> },
            { label: "Ciudad de destino:", name: "destino", icon: <House size={20} /> },
            { label: "Peso del paquete", name: "peso", icon: <Weight size={20} />, placeholder: "1 kg", type: "text" },
            { label: "Nombre del articulo", name: "articulo", icon: <Pencil size={20} />, placeholder: "Articulo", type: "text" },
            { label: "Precio", name: "precio", icon: <DollarSign size={20} />, placeholder: "$", type: "text" },
            { label: "Hora de salida del paquete", name: "hora_salida", icon: <Timer size={20} />, placeholder: "tiempo en que el paquete fue subido al camion", type: "text" },
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
                    className={`w-full pl-10 pr-4 py-2 border rounded-md bg-white text-gray-900
                      ${errores[name] ? 'border-red-500 focus:ring-red-500' : 'border-gray-400 focus:ring-blue-600'}`}
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
                    required={!(name === "hora_salida" || name === "camion")}
                    className={`w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2
                      ${errores[name] ? 'border-red-500 focus:ring-red-500' : 'border-gray-400 focus:ring-blue-600'} 
                      bg-white text-gray-900`}
                  />
                )}
              </div>
              {errores[name] && (
                <p className="text-red-500 text-xs mt-1">{errores[name]}</p>
              )}
              {["inicio", "destino"].includes(name) && mismoLugarError && (
                <p className="text-red-600 text-sm mt-1">La ciudad no puede ser la misma.</p>
              )}
            </div>
          </div>
        ))}
      </div>

      {paqueteRecibido ? (
        <div className="flex justify-center gap-4 mt-4">
          <button
            type="button"
            className="buttonEdit"
            onClick={() => setFormData({
              guia: "",
              camion: "",
              paquetes: "",
              inicio: "",
              destino: "",
              destinatario: "",
              peso: "",
              articulo: "",
              precio: "",
              hora_salida: ""
            })}
          >
            <CircleOff size={16} /> Cancelar
          </button>
          <button
          type="submit"
          className="bg-amber-400 button-edit-1"
          disabled={mutation.isPending || mismoLugarError}
        >
          <Pencil size={16} /> {mutation.isPending ? 'Editando...' : 'Editar'}
        </button>
        </div>
      ) : (
        <div className="flex justify-center gap-4 mt-4">
          <button
            type="button"
            className="buttonEdit"
            onClick={() => setFormData({
              guia: "",
              camion: "",
              paquetes: "",
              inicio: "",
              destino: "",
              destinatario: "",
              peso: "",
              articulo: "",
              precio: "",
              hora_salida: ""
            })}
          >
            <CircleOff size={16} /> Cancelar
          </button>
          <button
            type="submit"
            className="button"
            disabled={mutation.isPending || mismoLugarError}
            onClick={handleSubmit}
          >
            <Check size={16} /> {mutation.isPending ? 'Enviando...' : 'Enviar'}
          </button>
        </div>
      )}
    </form>
  </div>
);
}