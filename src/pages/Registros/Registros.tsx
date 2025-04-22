import CiudadComponente from "../../Components/Ciudad_registro/CiudadComponente";
import { Header } from "../../Components/Header";

export default function Registros() {
    return (
        <div className="min-h-screen flex flex-col">
            <Header />

            {/* Esto crea un espacio debajo del header fijo */}
            <div className="mt-[100px] flex-1 flex justify-center items-start p-6">
                <div className="w-full max-w-4xl bg-white rounded-2xl shadow p-6">
                    <h2 className="text-sm text-black font-medium mb-4">
                        Descarga los paquetes de tu sucursal al final del mes
                    </h2>
                    <CiudadComponente ciudad={"Aguascalientes"} mes={"Abril"} />
                </div>
            </div>
        </div>
    );
}
