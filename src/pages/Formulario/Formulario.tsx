import { Hash, House, Send, User } from "lucide-react";
import { ChangeEvent, useState } from "react";
import './Formulario.css';

export default function Formulario() {
    const [formData, setFormData] = useState({    
        quien: "",
        guia: "",
        camion: "",
        paquetes: "",
        inicio: "",
        destinatario: "",
    });

    function handleChange(e: ChangeEvent<HTMLInputElement>) {
        const { name, value } = e.target;
        setFormData({
          ...formData,
          [name]: value,
        });
    }

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        console.log(formData);
    }

    return (
        <div className="p-6 bg-gray-100 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold mb-4 text-blue-700">Información del paquete</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                    {[
                        { label: "Quien manda:", name: "quien", icon: <User size={20} />, placeholder: "Nombre" },
                        { label: "Numero de guia:", name: "guia", icon: <Hash size={20} />, placeholder: "no1234" },
                        { label: "Numero de camion:", name: "camion", icon: <Hash size={20} />, placeholder: "no1234" },
                        { label: "Numero de paquetes:", name: "paquetes", icon: <Send size={20} />, placeholder: "1", type: "number" },
                        { label: "Ciudad de inicio:", name: "inicio", icon: <House size={20} />, placeholder: "Aguascalientes" },
                        { label: "Ciudad de destino:", name: "destino", icon: <House size={20} />, placeholder: "Destino" },
                        { label: "Nombre del destinatario:", name: "destinatario", icon: <User size={20} />, placeholder: "Nombre del destinatario" },
                    ].map(({ label, name, icon, placeholder, type = "text" }) => (
                        <div key={name} className="flex items-center gap-4">
                            <label htmlFor={name} className="text-gray-700 font-medium w-48 text-right">
                                {label}
                            </label>
                            <div className="relative flex items-center w-full">
                                <span className="absolute left-3 text-gray-500">{icon}</span>
                                <input
                                    type={type}
                                    id={name}
                                    name={name}
                                    placeholder={placeholder}
                                    value={formData[name as keyof typeof formData]}
                                    onChange={handleChange}
                                    required
                                    className="w-full pl-10 pr-4 py-2 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-900"
                                />
                            </div>
                        </div>
                    ))}
                </div>
                <button type="submit" className="button">Enviar</button>
            </form>
        </div>
    );
}
