import React from "react";
import './styles.css';
import { useNavigate } from "react-router-dom";

const NotFound: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="">
      <h1 className="text-6xl font-bold text-red-600">404</h1>
      <p className="text-xl text-black mt-4">Pagina no encontrada</p>
      <p className="text-xl text-black mt-4">Da click al boton para volver</p>
      <br></br>
      <button 
        onClick={() => navigate("/")} 
        className="text-black mt-12 px-4 py-2 bg-blue-500 rounded-lg hover:bg-blue-600 transition"
      >
        Volver
      </button>
    </div>
  );
};

export default NotFound;
