import CiudadComponente from "../../Components/Ciudad_registro/CiudadComponente";
import {Header} from "../../Components/Header"; // Quita las llaves, es default

//Obtener fecha actual y solo agrrar el mes
const fecha = new Date();
const nombreMes = fecha.toLocaleString("es-MX", { month: "long" }); // Ej: "abril"
const anio = fecha.getFullYear(); // 2025
const mesConAnio = `${nombreMes} ${anio}`; // "abril 2025"

const ciudades = [
  "Aguascalientes", "Calvillo", "Jalpa", "Tabasco", "Juchipila",
  "Villa Hidalgo", "Teocaltiche", "Loreto", "Pinos", "Ojuelos", "San Luis"
];

export default function Registros() {

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <Header />

      {/* Espacio debajo del header */}
      <div className="mt-[100px] flex-1 flex flex-col items-center p-6">
        <div className="w-full max-w-4xl bg-white rounded-2xl shadow p-6">
          <h2 className="text-sm text-black font-medium mb-4">
            Descarga los paquetes de tu sucursal al final del mes
          </h2>

          {/* Navegación de ciudades */}
          <div className="flex flex-wrap gap-2 mb-6">
            {ciudades.map((ciudad) => (
              <a
                key={ciudad}
                href={`#${ciudad}`}
                className="bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full shadow hover:bg-blue-200 transition"
              >
                {ciudad}
              </a>
            ))}
          </div>

          {/* Secciones por ciudad */}
          {ciudades.map((ciudad) => (
            <CiudadComponente key={ciudad} ciudad={ciudad} mes={mesConAnio} />
          ))}
        </div>
      </div>
    </div>
  );
}
