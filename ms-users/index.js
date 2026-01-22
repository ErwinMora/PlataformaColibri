import express from "express"; // Libreria para crear el servidor
import dotenv from "dotenv"; // Libreria para manejar las variables de entorno
import CORS from "cors"; // Libreria para manejar CORS

import conexion from "./src/config/conexion.js"; // Importar archivo de configuración a la base de datos
import userroute from "./src/routes/user.routes.js"; // Importar las rutas de usuario

dotenv.config(); // Cargar variables de entorno
conexion(); // Conexión a la base de datos
const app = express(); // Crear la instancia de la apliación express
const port = process.env.PORT || 3000; // Puerto del servidor
const uri = process.env.URI_CREATE;

app.use(express.json()); // Habilitar Json para las peticiones
app.use(CORS()); // Habilitamos CORS para las peticiones
app.use(uri, userroute); // Rutas de la aplicación

app.listen(port, () => {
    console.log(`Microservicio de usuarios corriendo en el puerto ${port}`);
});