import express from "express"; // Libreria de express para el servidor
import CORS from "cors"; // Cors para proteger rutas de origen
import dotenv from "dotenv";

dotenv.config(); // Cargamos las variables de entorno (.env)
const port = process.env.PORT;
const app = express();  // Creamos la instancia de la aplicación


app.use(express.json()); // Habilitamos JSON para las peticiones
app.use(CORS()); // Habilitamos CORS

app.listen(port, () => {
    console.log(`Servidor corriendo en ${port}`);
});

