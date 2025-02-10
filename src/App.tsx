// App.js
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Importar tus componentes o páginas
import Home from './Home';
import Formulario from './pages/Formulario/Formulario';

function App() {
  return (
    <Router>
      <Routes>
        {/* Definir las rutas */}
        <Route path="/" element={<Home />} />
        <Route path="/Formulario" element={<Formulario />} />
      </Routes>
    </Router>
  );
}

export default App;
