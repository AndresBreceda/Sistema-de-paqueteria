import { jsPDF } from "jspdf";
import Divider from "@mui/material/Divider";

interface ComponenteCiudadProps {
  ciudad: string;
  mes: string;
}

const ComponenteCiudad: React.FC<ComponenteCiudadProps> = ({ ciudad, mes }) => {
  
  const handleDescargarPDF = () => {
    const doc = new jsPDF();
    // Si quieres agregar algo, puedes usar: doc.text("Texto", x, y);
    doc.save(`Paquetes_${ciudad}_${mes}.pdf`);
  };

  return (
    <div className="w-full p-6 rounded-lg text-left border border-blue-900 bg-white shadow">
      <h2 className="text-blue-900 text-2xl font-semibold">{ciudad}</h2>
      <span id={ciudad}></span>
      <Divider sx={{ borderWidth: 3, borderColor: "blue", marginBottom: "10px" }} />
      <p className="text-gray-700">Paquetes de {ciudad} del mes de {mes}</p>
      <button
        onClick={handleDescargarPDF}
        className="text-blue-600 underline mt-2 inline-block cursor-pointer"
      >
        Descargar
      </button>
    </div>
  );
};

export default ComponenteCiudad;
