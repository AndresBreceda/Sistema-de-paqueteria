import Header from "../../Components/Header/Header";
import FormularioNew from "../Formulario/FormularioNew";
import Paquetes from "../Paquetes/Paquetes";

export default function General(){
    return(
        <div>
            <Header />

            <div className="col-span-3 col-start-4 bg-white m-2 rounded-2xl flex items-center space-x-4 p-2">
                <Paquetes />
            </div>

            <FormularioNew />
        </div>
    );
}