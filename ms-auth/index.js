import express from "express";
import dotenv from "dotenv";
import CORS from "cors";

import conexion from "./src/config/conexion.js";
import authroute from "./src/routes/auth.routes.js";
import limiter from "./src/middleware/rate.limit.js";

dotenv.config(); // Cargar variables de entorno
conexion(); // Conexión a la base de datos
const port = process.env.PORT || 3000; // Puerto de la conexión del servidor o puerto por defecto
const uri = process.env.URI_AUTH;
const app = express(); // Crear la instancia de la apliación express
app.use(CORS()); // Habilitar los CORS
app.use(express.json()); // Habilitar JSON para las peticiones
app.use(limiter); // Limitar las peticiones al servidor
app.use(uri, authroute); // Rutas de la autntificación


app.listen(port, () => {
    console.log(`Servidor corriendo en ${port}`);
});