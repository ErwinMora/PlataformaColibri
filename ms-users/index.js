import express from "express"; // Libreria para crear el servidor
import dotenv from "dotenv"; // Libreria para manejar las variables de entorno
import CORS from "cors"; // Libreria para manejar CORS

dotenv.config(); // Cargar variables de entorno
const app = express(); // Crear la instancia de la apliación express
app.use(express.json()); // Habilitar Json para las peticiones
app.use(CORS()); // Habilitamos CORS para las peticiones

const port = process.env.PORT || 3000; // Puerto del servidor

app.listen(port, () => {
    console.log(`Microservicio de usuarios corriendo en el puerto ${port}`);
});