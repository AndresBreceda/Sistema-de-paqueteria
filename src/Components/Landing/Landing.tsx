import { useState } from "react";
import Header from "./Header/Header";
import { Mail, LockOpen } from "lucide-react"; 
import { useNavigate } from "react-router-dom";

export default function LandingPage() {
  const navigate = useNavigate();

  function handleSubmit(event: { preventDefault: () => void; }) {
    event.preventDefault();
    navigate('/Formulario');
  }

  const [formData, setFormData] = useState({
    password: "",
    email: "",
  });

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  }

  return (
    <div className="absolute inset-0 bg-cover bg-center bg-no-repeat w-full h-full bg-black flex items-center justify-center">
  <Header />

  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl w-full px-8 py-12 bg-opacity-70 bg-black rounded-lg shadow-lg">
    {/* Imagen */}
    <div className="flex justify-center">
      <img src="/logo.png" alt="LogiPack Logo" className="w-72 h-auto" />
    </div>

    {/* Formulario */}
    <div className="flex flex-col justify-center">
      <h2 className="text-4xl font-bold text-white mb-6 text-center">Iniciar Sesión</h2>
      <form onSubmit={handleSubmit} className="space-y-4">

        {/* Campo Email */}
        <div>
          <label htmlFor="email" className="block text-white">Email:</label>
          <div className="relative flex items-center">
            <Mail className="absolute left-3 text-white" size={20} />
            <input
              type="text"
              id="email"
              name="email"
              placeholder="Escriba un correo válido aquí."
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full pl-10 pr-4 py-2 mt-2 border rounded-lg border-white focus:outline-none focus:ring-2 focus:ring-white bg-transparent text-white"
            />
          </div>
        </div>

        {/* Campo Contraseña */}
        <div>
          <label htmlFor="password" className="block text-white">Contraseña:</label>
          <div className="relative flex items-center">
            <LockOpen className="absolute left-3 text-white" size={20} />
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Ingrese su contraseña"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full pl-10 pr-4 py-2 mt-2 border rounded-lg border-white focus:outline-none focus:ring-2 focus:ring-white bg-transparent text-white"
            />
          </div>
        </div>

        {/* Botón de envío */}
        <button
          type="submit"
          className="w-full py-2 mt-4 bg-transparent text-black border border-white rounded-lg hover:bg-white hover:text-black focus:outline-none focus:ring-2 focus:ring-white transition"
        >
          Entrar
        </button>
      </form>
    </div>
  </div>
</div>

  );
}
