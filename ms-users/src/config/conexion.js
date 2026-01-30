import dotenv from "dotenv"; // Libreria para manejar las variables de entorno
import mongoose from "mongoose"; // Libreria para implementar MongoDB

dotenv.config(); // Cargar variables de entorno
const conn = process.env.MONGO_URI; // Cadana de conexión a la base de datos

const conexion = async () => {
    if (!conn) {
        console.log("No se encuentra conexión.");
        return;
    }

    try {
        await mongoose.connect(conn)
        console.log("Conexión con la base de datos establecida.");
    } catch (error) {
        console.log("No se estableció conexión.");
        console.error(error);
    }

    process.on("SIGINT", async () => {
        await mongoose.connection.close();
        console.log("Conexión Mongo cerrada.");
        process.exit(0);
    });
}

export default conexion;