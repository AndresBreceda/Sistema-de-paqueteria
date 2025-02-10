import { useState } from "react";
import { Mail, User, MessageSquare } from "lucide-react";
import Header from "../../Components/Landing/Header/Header";
import './Formulario.css';

export default function Formulario() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    domicilio: "",
    colonia: "",
    ciudad: "",
    cp: "",
    rfc: "",
    telefono:"",
  });

  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleChange = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    console.log("Form Data Submitted:", formData);
    setShowConfirmation(true);

    setFormData(
      { 
      name: "", 
      email: "",
      message: "",
      domicilio:"",
      colonia: "",
      ciudad:"",
      cp:"", 
      rfc:"", 
      telefono:"", 
      }
    );
  };

  const handleClose = () => {
    setShowConfirmation(false);
  };

  return (
    <div>
      {/* <Header /> */}
      <div className="p-6 bg-white rounded-2xl shadow-xl">
        <form onSubmit={handleSubmit} className="space-y-4">
          <p className="text-gray-700 text-center bg-gray-300">
            Remitente-Envia
          </p>

          {/* Nombre */}
          <div>
            <label htmlFor="name" className="block text-gray-600 font-medium">
              Nombre:
            </label>
            <div className="relative flex items-center">
              <User className="absolute left-3 text-gray-400" size={20} />
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Escriba su nombre aquí."
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full pl-10 pr-4 py-2 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              />
            </div>
          </div>

          {/* Domicilio */}
          <div>
            <label htmlFor="domicilio" className="block text-gray-600 font-medium">
              Domicilio:
            </label>
            <div className="relative flex items-center">
              <Mail className="absolute left-3 text-gray-400" size={20} />
              <input
                type="text"
                id="domicilio"
                name="domicilio"
                placeholder="Escriba un domicilio válido aquí."
                value={formData.domicilio}
                onChange={handleChange}
                required
                className="w-full pl-10 pr-4 py-2 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              />
            </div>
          </div>

          {/* Colonia */}
          <div>
            <label htmlFor="Colonia" className="block text-gray-600 font-medium">
            Colonia:
            </label>
            <div className="relative flex items-start">
              <MessageSquare className="absolute left-3 top-4 text-gray-400" size={20} />
              <textarea
                id="colonia"
                name="colonia"
                placeholder="Coloque la colonia a la que esta destidado el paquete."
                value={formData.colonia}
                onChange={handleChange}
                required
                className="w-full pl-10 pr-4 py-4 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 h-32 transition"
              />
            </div>
          </div>

          <div>
            <label htmlFor="Ciudad" className="block text-gray-600 font-medium">
            Ciudad:
            </label>
            <div className="relative flex items-start">
              <MessageSquare className="absolute left-3 top-4 text-gray-400" size={20} />
              <textarea
                id="ciudad"
                name="ciudad"
                placeholder="Coloque la ciudad a la que esta destidado el paquete."
                value={formData.ciudad}
                onChange={handleChange}
                required
                className="w-full pl-10 pr-4 py-4 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 h-32 transition"
              />
            </div>
          </div>

          <div>
            <label htmlFor="Email" className="block text-gray-600 font-medium">
            Email:
            </label>
            <div className="relative flex items-start">
              <MessageSquare className="absolute left-3 top-4 text-gray-400" size={20} />
              <textarea
                id="email"
                name="email"
                placeholder="Coloque un email valido."
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full pl-10 pr-4 py-4 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 h-32 transition"
              />
            </div>
          </div>

          <div>
            <label htmlFor="CodiogoPostal" className="block text-gray-600 font-medium">
            Codigo Postal (CP):
            </label>
            <div className="relative flex items-start">
              <MessageSquare className="absolute left-3 top-4 text-gray-400" size={20} />
              <textarea
                id="cp"
                name="cp"
                placeholder="Coloque un codigo postal valido."
                value={formData.cp}
                onChange={handleChange}
                required
                className="w-full pl-10 pr-4 py-4 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 h-32 transition"
              />
            </div>
          </div>

          <div>
            <label htmlFor="RFC" className="block text-gray-600 font-medium">
            RFC:
            </label>
            <div className="relative flex items-start">
              <MessageSquare className="absolute left-3 top-4 text-gray-400" size={20} />
              <textarea
                id="rfc"
                name="rfc"
                placeholder="Coloque un rfc valido."
                value={formData.rfc}
                onChange={handleChange}
                required
                className="w-full pl-10 pr-4 py-4 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 h-32 transition"
              />
            </div>
          </div>

          <div>
            <label htmlFor="Telefono" className="block text-gray-600 font-medium">
            Telefono:
            </label>
            <div className="relative flex items-start">
              <MessageSquare className="absolute left-3 top-4 text-gray-400" size={20} />
              <textarea
                id="telefono"
                name="telefono"
                placeholder="Coloque un telefono valido."
                value={formData.telefono}
                onChange={handleChange}
                required
                className="w-full pl-10 pr-4 py-4 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 h-32 transition"
              />
            </div>
          </div>

          {/* Botón */}
          <button
            type="submit"
            className="botton  w-full py-2 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-300"
          >
            Enviar
          </button>
        </form>

        {/* Mensaje de confirmación */}
        {showConfirmation && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-xl shadow-lg text-center">
              <h2 className="text-lg font-bold text-blue-500">Mensaje Enviado</h2>
              <p>Paquete regisrado.</p>
              <button
                onClick={handleClose}
                className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300"
              >
                Cerrar
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
