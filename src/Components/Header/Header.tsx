import { LogOut, NotebookPen, PackageCheck } from "lucide-react";
import './styles.css';

export default function Header() {
  return (
    <header className="bg-blue-950 text-center flex justify-center items-center p-6 text-white shadow-md z-50 w-full fixed top-0 left-0">
      <img className="w-20 h-20" src="./logo.png" alt="logo logipack" />
      <div className="text-xl font-bold flex-1 text-center flex justify-center gap-6">
        <a href="/Pedidos" className="text-white flex items-center gap-2 referencia">
          <NotebookPen size={20} />
          Ver paquetes
        </a>
        |
        <a href="/Formulario" className="text-white flex items-center gap-2 referencia">
          <PackageCheck size={20} />
          Escribir pedidos
        </a>
      </div>
      <a href="/" className="ml-6 flex gap-2 referencia">
        <LogOut size={20} ></LogOut> 
        Salir
      </a>
    </header>
  );
}
