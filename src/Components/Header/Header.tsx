export default function Header() {
  return (
      <header className="bg-blue-950 text-center flex justify-center items-center p-6 text-white shadow-md z-50 w-full fixed top-0 left-0">
          <img className="w-20 h-20" src="./logo.png" alt="logo logipack"></img>
          <div className="text-xl font-bold flex-1 text-center">              
            <a className="text-white m-5">Ver paquetes</a>
            |
            <a className="text-white m-5">Escribir pedidos</a>
          </div>
      </header>
  );
}