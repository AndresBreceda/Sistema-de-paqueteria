import { useState } from "react";
import Header from "../../Components/Header/Header";
import Formulario from "./Formulario";
import "./Formulario.css";
import { ArrowDown01, CalendarDays, DollarSign, Eye, Signature, TableOfContents, Weight } from "lucide-react";
import Factura from "../../Factura/Factura";

export default function FormularioNew() {
  const [formData, setFormData] = useState({
    expedicion: "",
    peso: "",
    paquetes:"",
    ED:"",
    SD: "",
    Ocurre: "",
    RD: "",
    Unicen:"",
    Otros: "",
    observaciones:"",
    contenido: "",
    declarado: "",
    remitente: "",
    documentador:"",
    importe: "",

  });

  function isValidDate(dateString: string) {
    const regex = /^\d{2}\/\d{2}\/\d{4}$/;
    return regex.test(dateString);
  }

  function handleChange(e: { target: { name: any; value: any; }; }) {
    const { name, value } = e.target;
    if (name === "expedicion" && !isValidDate(value)) {
      alert("Por favor, ingresa una fecha válida en el formato DD/MM/YYYY");
      return;
    }
    setFormData({
      ...formData,
      [name]: value,
    });
  }

  return (
    <>
      <div className="grid grid-cols-6 grid-rows-auto gap-2">
        {/* Fecha de expedición */}
        <div className="col-span-3 col-start-4 bg-white m-2 rounded-2xl flex items-center space-x-4 p-2">
          <label htmlFor="expedicion" className="text-gray-600 font-medium whitespace-nowrap">
            Fecha de expedición:
          </label>
          <div className="relative flex items-center w-full">
            <CalendarDays className="absolute left-3 text-gray-400" size={20} />
            <input
              type="text"
              id="expedicion"
              name="expedicion"
              placeholder="10/10/2025"
              value={formData.expedicion}
              onChange={handleChange}
              required
              className="w-full pl-10 pr-4 py-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
          </div>
        </div>

        {/* Remitente-Envia */}
        <div className="col-span-3 row-span-3 row-start-2">
          <Formulario who="remitente-Envia" />
        </div>

        {/* Destinatario-recibe */}
        <div className="col-span-3 row-span-3 col-start-4 row-start-2">
          <Formulario who="destinatario-Recibe" />
        </div>

        {/* Tipo de servicio */}
        <div className="col-span-2 row-start-5 bg-white m-2 rounded-2xl p-2">
          <label htmlFor="expedicion" className="text-gray-600 font-medium whitespace-nowrap">
            Tipo de servicio
          </label>
          <div>
          E.D.  
          <input
              type="checkbox"
              value={formData.ED}
              onChange={handleChange}
            />
          </div>
          <div>
          S.D.  
          <input
              type="checkbox"
              value={formData.SD}
              onChange={handleChange}
            />
          </div>
          <div>
          Ocurre  
          <input
              type="checkbox"
              value={formData.Ocurre}
              onChange={handleChange}
            />
          </div>
          <div>
          R.D.  
          <input
              type="checkbox"
              value={formData.RD}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* Contenido y observaciones */}
        <div className="col-span-2 col-start-3 row-start-5 bg-white m-2 rounded-2xl p-2">
          <label htmlFor="contenido" className="text-gray-600 font-medium whitespace-nowrap">
            Contenido
          </label>
          <div className="relative flex items-center w-full">
            <TableOfContents className="absolute left-3 text-gray-400" size={20} />
            <input
              type="text"
              id="contenido"
              name="contenido"
              placeholder=""
              value={formData.contenido}
              onChange={handleChange}
              required
              className="w-full pl-10 pr-4 py-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
          </div>
          <label htmlFor="observaciones" className="text-gray-600 font-medium whitespace-nowrap">
            Observaciones
          </label>
          <div className="relative flex items-center w-full">
            <Eye className="absolute left-3 text-gray-400" size={20} />
            <input
              type="text"
              id="observaciones"
              name="observaciones"
              placeholder=""
              value={formData.observaciones}
              onChange={handleChange}
              required
              className="w-full pl-10 pr-4 py-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
          </div>
          <label htmlFor="declarado" className="text-gray-600 font-medium whitespace-nowrap">
            Valor declarado $
          </label>
          <div className="relative flex items-center w-full">
            <DollarSign className="absolute left-3 text-gray-400" size={20} />
            <input
              type="text"
              id="declarado"
              name="declarado"
              placeholder=""
              value={formData.declarado}
              onChange={handleChange}
              required
              className="w-full pl-10 pr-4 py-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
          </div>
        </div>

        {/* Concepto-importe-tabla */}
        <div className="col-span-2 row-span-4 col-start-5 row-start-5 bg-white m-2 rounded-2xl p-2">
          <Factura />
        </div>

        {/* Peso */}
        <div className="col-span-2 row-start-6 bg-white m-2 rounded-2xl p-2">
          <label htmlFor="peso" className="text-gray-600 font-medium whitespace-nowrap">
            Peso
          </label>
          <div className="relative flex items-center w-full">
            <Weight className="absolute left-3 text-gray-400" size={20} />
            <input
              type="text"
              id="peso"
              name="peso"
              placeholder="1 kg"
              value={formData.peso}
              onChange={handleChange}
              required
              className="w-full pl-10 pr-4 py-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
          </div>
        </div>

        {/* No. paquetes */}
        <div className="col-span-2 col-start-1 row-start-7 bg-white m-2 rounded-2xl p-2">
          <label htmlFor="paquetes" className="text-gray-600 font-medium whitespace-nowrap">
            No. paquetes
          </label>
          <div className="relative flex items-center w-full">
            <ArrowDown01 className="absolute left-3 text-gray-400" size={20} />
            <input
              type="text"
              id="paquetes"
              name="paquetes"
              placeholder="1"
              value={formData.paquetes}
              onChange={handleChange}
              required
              className="w-full pl-10 pr-4 py-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
          </div>
        </div>

        {/* Tipo de envío */}
        <div className="col-span-2 col-start-1 row-start-8 bg-white m-2 rounded-2xl p-2">
          <label htmlFor="expedicion" className="text-gray-600 font-medium whitespace-nowrap">
            Tipo de envío
          </label>
          <div>
          UNICEN  
          <input
              type="checkbox"
              value={formData.Unicen}
              onChange={handleChange}
            />
          </div>
          <div>
          Otros  
          <input
              type="checkbox"
              value={formData.Otros}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* Remitente y otros */}
        <div className="col-span-2 row-span-3 col-start-3 row-start-6 bg-white m-2 rounded-2xl p-2">
          <label htmlFor="remitente" className="text-gray-600 font-medium whitespace-nowrap">
            Remitente
          </label>
          <div className="relative flex items-center w-full">
            <Signature className="absolute left-3 text-gray-400" size={20} />
            <input
              type="text"
              id="remitente"
              name="remitente"
              placeholder="Nombre y firma"
              value={formData.remitente}
              onChange={handleChange}
              required
              className="w-full pl-10 pr-4 py-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
          </div>
          <label htmlFor="documentador" className="text-gray-600 font-medium whitespace-nowrap">
            Documentador:
          </label>
          <div className="relative flex items-center w-full">
            <Signature className="absolute left-3 text-gray-400" size={20} />
            <input
              type="text"
              id="documentador"
              name="documentador"
              placeholder="Nombre y firma"
              value={formData.documentador}
              onChange={handleChange}
              required
              className="w-full pl-10 pr-4 py-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
          </div>
          <label htmlFor="importe" className="text-gray-600 font-medium whitespace-nowrap">
            Importe:
          </label>
          <div className="relative flex items-center w-full">
            <DollarSign className="absolute left-3 text-gray-400" size={20} />
            <input
              type="text"
              id="importe"
              name="importe"
              placeholder="en letra"
              value={formData.importe}
              onChange={handleChange}
              required
              className="w-full pl-10 pr-4 py-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
          </div>

        </div>
      </div>
    </>
  );
}