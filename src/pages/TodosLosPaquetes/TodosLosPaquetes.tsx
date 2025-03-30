import Header from "../../Components/Header/Header";
import { Paquetes } from "../Paquetes";

export default function TodosLosPaquetes(){
    return(
        <div>
            <Header></Header>

            <div>
                <Paquetes></Paquetes>
            </div>
        </div>
    );
}