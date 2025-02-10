export default function FormularioNew(){
    return(
    <div className="grid grid-cols-6 grid-rows-8 gap-4">

            vacio
            <div className="col-span-3">1</div>

            Fecha de expedicion
            <div className="col-span-3 col-start-4">2</div>
            
            Remitente-Envia
            <div className="col-span-3 row-span-3 row-start-2">3</div>

            Destinatario-recibe
            <div className="col-span-3 row-span-3 col-start-4 row-start-2">4</div>

            tipo de servicio
            <div className="col-span-2 row-start-5">5</div>

            contenido y observaciones
            <div className="col-span-2 col-start-3 row-start-5">6</div>

            Concepto-importe-tabla    
            <div className="col-span-2 row-span-4 col-start-5 row-start-5">7</div>

            peso
            <div className="col-span-2 row-start-6">8</div>

            no. paquetes
            <div className="col-span-2 col-start-1 row-start-7">9</div>

            tipo de envio
            <div className="col-span-2 col-start-1 row-start-8">10</div>

            Remitente-and-anything-left
            <div className="col-span-2 row-span-3 col-start-3 row-start-6">12</div>
    </div>
    );
}

    