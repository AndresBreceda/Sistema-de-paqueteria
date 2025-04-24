import { jsPDF } from "jspdf";
import Divider from "@mui/material/Divider";

interface ComponenteCiudadProps {
  ciudad: string;
  mes: string;
}

const agregarImagen = async (doc: jsPDF) => {
  const imgUrl = "/logo.png"; // desde la carpeta public
  const img = await fetch(imgUrl);
  const blob = await img.blob();
  const reader = new FileReader();

  return new Promise<void>((resolve) => {
    reader.onloadend = () => {
      const base64data = reader.result as string;
      doc.addImage(base64data, "PNG", 10, 10, 50, 50); // "PNG" o "JPEG" según la imagen
      resolve();
    };
    reader.readAsDataURL(blob);
  });
};



const ComponenteCiudad: React.FC<ComponenteCiudadProps> = ({ ciudad, mes }) => {
  
  const handleDescargarPDF = async () => {
      const doc = new jsPDF();
      let date = new Date();
      let fechaFormateada = date.toLocaleDateString("es-ES", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric"
      });
    
      // Título
      doc.setFontSize(16);
      doc.text(`Descarga del día: ${fechaFormateada}`, 60, 15);
      doc.text(`Paquetes de ${ciudad} - ${mes}`, 90, 35);
      

      // Imagen (espera la carga)
      await agregarImagen(doc);
      // Si quieres agregar algo, puedes usar: doc.text("Texto", x, y);
      doc.save(`Paquetes_${ciudad}_${mes}.pdf`);
  };

  return (
    <>
    <div className="w-full p-6 rounded-lg text-left border border-blue-900 bg-white shadow mt-10">

    <h2 id={ciudad} className="text-blue-900 text-2xl font-semibold scroll-mt-[200px]">{ciudad}</h2>

    <Divider sx={{ borderWidth: 3, borderColor: "blue", marginBottom: "10px" }} />
    <p className="text-gray-700">Paquetes de {ciudad} del mes de {mes}</p>
    <button
      onClick={handleDescargarPDF}
      className="text-blue-600 underline mt-2 inline-block cursor-pointer"
    >
      Descargar
    </button>
    </div>
    </>

  );
};

export default ComponenteCiudad;
