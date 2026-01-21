import bcrypt from "bcrypt"; // Libreria para encriptar contraseñas
import dotenv from "dotenv"; // Libreria para manejar varibales de entorno

dotenv.config();

const salt = process.env.SALT;

export const encryptPassword = async (password) => {
    const hashedPassword = await bcrypt.hash(password, Number(salt));
    console.log("Se encripto correctamente la contraseña");
    return hashedPassword;
}

export const comparePassword = async (password, hashedPassword) => {
    const passvalid = await bcrypt.compare(password, hashedPassword);
    if (!passvalid) {
        console.log("Las contraseñas no coinciden.");
        throw new Error("Contraseñas incorrectas.");
    }

    console.log("Las contraseñas coinciden.");
    return passvalid;
}