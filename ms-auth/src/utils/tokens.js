import jwt from "jsonwebtoken"; // Libreria para manejar tokens
import dotenv from "dotenv"; // Libreria para manejar las variables de entorno

dotenv.config(); // Cargar varibales de entorno

const key = process.env.JWT_SECRET;

// Método para generar el token
export const generateToken = (user) => {
    const payload = {
        sub: user.id,
        email: user.email,
        role: user.role,
    };

    const token = jwt.sign(payload, key, { expiresIn: "1h" });

    console.log("El token se generó correctamente.");
    return token;
}

// Método para verificar el token
export const verifyToken = (token) => {
    try {
        if (token.startsWith("Bearer ")) {
            token = token.split(" ")[1];
        }

        const decoded = jwt.verify(token, key);

        console.log("El token es válido");
        return decoded;
    } catch (error) {
        console.error(error.message);
        throw new Error("Token inválido");
    }
}

// Método para refrescar el token
export const refreshToken = (token) => {
    try {
        const decoded = verifyToken(token);

        const newPayload = {
            sub: decoded.sub,
            email: decoded.email,
            role: decoded.role,
        };

        return jwt.sign(newPayload, key, { expiresIn: "1h" });
    } catch (error) {
        throw new Error("No se pudo refrescar el token");
    }
}