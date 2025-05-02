import { Header } from "../../Components/Header";
import { Formulario } from "../Formulario";
import './General.css';

export default function General() {
    return (
        <div>
            <Header />

            <div className="mt-30 mb-20 bg-white p-6 shadow-md rounded-lg">
                <Formulario />
            </div>
        </div>
    );
}
