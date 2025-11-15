# 📦 LogiPack – Sistema de Gestión de Paquetería  
Aplicación completa para la gestión y seguimiento de pedidos, desarrollada con **.NET 7 (C#)** y **React**.  
Permite registrar pedidos, filtrarlos por ciudad, consultar estados, administrar clientes y gestionar el flujo logístico de una empresa de paquetería.

---

## 🚀 Tecnologías utilizadas

### **Frontend**
- React 18  
- Vite  
- TypeScript  
- TanStack Query (React Query)  
- TailwindCSS  
- React Router  

### **Backend**
- .NET 7 Web API  
- C#  
- Mongo DB  
- Swagger  

---


## 🗄️ Funcionalidades principales

### **Frontend**
- Visualizar todos los pedidos.
- Filtrar por ciudad en tiempo real.
- Mostrar detalles de un pedido.
- Cargar nuevos pedidos.
- UI responsive y modular.

### **Backend**
- CRUD completo de pedidos.
- Endpoints REST para ciudades, clientes y rutas.
- Validación de datos.
- Documentación con Swagger.
- Servicios y repositorios desacoplados.

---

### Endpoints principales
Pedidos
- GET	/api/pedidos	Obtener todos los pedidos
- GET	/api/pedidos/{id}	Obtener pedido por ID
- GET	/api/pedidos/ciudad/{ciudad}	Filtrar por ciudad
- POST	/api/pedidos	Crear un pedido
- PUT	/api/pedidos/{id}	Actualizar un pedido
- DELETE	/api/pedidos/{id}	Eliminar un pedido

