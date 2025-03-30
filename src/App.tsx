// App.js
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

// Importar tus componentes o páginas
import Home from './Home';
import General from './pages/General/General';
import { TodosLosPaquetes } from './pages/TodosLosPaquetes';
import NotFound from './pages/NotFound/NoEncontrado';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          {/* Definir las rutas */}
          <Route path="/" element={<Home />} />
          <Route path="/Formulario" element={<General />} />
          <Route path="/Pedidos" element={<TodosLosPaquetes />} />
          {/* Ruta para páginas no encontradas */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
