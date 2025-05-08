import { jsPDF } from "jspdf";
import Divider from "@mui/material/Divider";
import { useGetConfirmados } from "../../Hooks/Hooks";
import { useEffect, useState } from "react";

interface ComponenteCiudadProps {
  ciudad: string;
  mes: string;
}

export const agregarImagen = async (doc: jsPDF) => {
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
  const { data, refetch, isFetching } = useGetConfirmados(ciudad, false); // desactiva fetch automático

  const [ultimaDescarga, setUltimaDescarga] = useState<string | null>(null);


  // Cargar la última fecha al montar el componente
  useEffect(() => {
    const fechaGuardada = localStorage.getItem("ultimaDescarga");
    if (fechaGuardada) {
      setUltimaDescarga(fechaGuardada);
    }
  }, []);

  // Manejador del botón
  const manejarDescarga = () => {
    const fechaActual = new Date().toLocaleString(); // formato legible
    setUltimaDescarga(fechaActual);
    localStorage.setItem("ultimaDescarga", fechaActual);

  };

  const handleDescargarPDF = async () => {
    const { data: datosConfirmados } = await refetch(); // ejecuta fetch manualmente

    const doc = new jsPDF();
    let date = new Date();
    let fechaFormateada = date.toLocaleDateString("es-ES", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });

    doc.setFontSize(16);
    doc.text(`Descarga del día: ${fechaFormateada}`, 90, 25);
    doc.text(`Paquetes de ${ciudad} - ${mes}`, 90, 35);

    await agregarImagen(doc);

    const headers = ["Guía", "Remitente", "Destinatario", "Origen", "Destino", "Artículo", "Peso", "Precio"];
    const startY = 60;
    doc.setFontSize(10);
    let y = startY;

    headers.forEach((header, index) => {
      doc.text(header, 10 + index * 25, y);
    });

    y += 7;

    let totalPrecio = 0;
    let totalPaquetes = 0;

    datosConfirmados?.forEach((item: any) => {
      const precio = parseFloat(item.precio) || 0;
      const paquetes = parseInt(item.numero_paquetes) || 0;

      totalPrecio += precio;
      totalPaquetes += paquetes;

      doc.text(item.numero_guia || "", 10, y);
      doc.text(item.nombre_remitente || "", 35, y);
      doc.text(item.nombre_destinatario || "", 60, y);
      doc.text(item.ciudad_inicio || "", 85, y);
      doc.text(item.ciudad_destino || "", 110, y);
      doc.text(item.articulo || "", 135, y);
      doc.text(item.peso || "", 160, y);
      doc.text(`$${precio.toFixed(2)}`, 185, y);
      y += 7;

      if (y > 280) {
        doc.addPage();
        y = 20;
      }
    });

    y += 10;
    doc.setFontSize(12);
    doc.text(`Total de paquetes: ${totalPaquetes}`, 10, y);
    y += 7;
    doc.text(`Total vendido: $${totalPrecio.toFixed(2)}`, 10, y);

    doc.save(`Paquetes_${ciudad}_${mes}.pdf`);

    manejarDescarga();
  };

  return (
    <>
    <div className="w-full p-6 rounded-lg text-left border border-blue-900 bg-white shadow mt-10">
  
  {/* Título + imagen en la misma línea */}
  <div className="flex items-center justify-between">
    <h2 id={ciudad} className="text-blue-900 text-2xl font-semibold scroll-mt-[200px]">
      {ciudad}
    </h2>
    <img
      src={`public/ciudades/${ciudad}.png`}
      alt={`Escudo de ${ciudad}`}
      className="w-10 ml-4 mb-5"
    />
  </div>

  <Divider sx={{ borderWidth: 3, borderColor: "blue", marginBottom: "10px" }} />
  
  <div className="flex">
  <p className="text-gray-700 mb-5 mr-40">
    Paquetes de {ciudad} del mes de {mes}
    <br></br>
  </p>
  
  {ultimaDescarga && (
        <p className="text-blue-950 text-right">
          Última descarga: {ultimaDescarga}
        </p>
      )}
  </div>    

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
