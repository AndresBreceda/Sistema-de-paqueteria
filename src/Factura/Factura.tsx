import { useState } from "react";
import { DollarSign } from "lucide-react";

export default function Factura() {
  const [formData, setFormData] = useState({
    flete: "",
    ed: "",
    rd: "",
    seguro: "",
    otros: "",
    subtotal: "",
    iva1: "",
    iva2: "",
    total: "",
  });

  const handleChange = (e: { target: { name: any; value: any; }; }) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="w-full max-w-md mx-auto p-4 rounded-lg shadow-lg">
      <h2 className="text-lg font-semibold mb-4">Factura</h2>
      <div className="space-y-2">
        {(Object.keys(formData) as Array<keyof typeof formData>).map((key) => (
          <div key={key}>
            <label htmlFor={key} className="text-gray-600 font-medium whitespace-nowrap capitalize">
              {key.replace(/_/g, " ")}:
            </label>
            <div className="relative flex items-center w-full">
              <DollarSign className="absolute left-3 text-gray-400" size={20} />
              <input
                type="text"
                id={key}
                name={key}
                placeholder="Ingrese el importe"
                value={formData[key]}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
