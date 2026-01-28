import AuthRepository from "../repository/auth.repository.js";

import BuildLoginChain from "./validators/login.chain.js";
import BuildRegisterChain from "./validators/register.chain.js";

import { encryptPassword } from "../utils/encription.js";
import { generateToken } from "../utils/tokens.js";

class AuthService {
    constructor() {
        this.registerValidators = BuildRegisterChain();
        this.loginValidators = BuildLoginChain();
    }

    // Método para registrar un nuevo usuario
    async register(email, password) {
        try {
            // Validación con Chain of Responsibility
            await this.registerValidators.validate({ email, password });

            const hashedPassword = await encryptPassword(password); // Encriptar contraseña
            await AuthRepository.createAuth({ // Crear nuevo usuario
                email,
                password: hashedPassword
            });
            console.log("Se registro el usuario correctamente.");
            const msg = "Se registro el usuario correctamente.";
            return msg;
        } catch (error) {
            console.error("Error al registrar el usuario el correo ya esta siendo usado.");
            throw error;
        }
    }

    // Método para iniciar sesión
    async login(email, password) {
        try {
            // Validación con Chain of Responsibility
            const result = await this.loginValidators.validate({ email, password });
            const token = generateToken(result.user);

            /* return { token, user: { id: result.user.id, email: result.user.email, role: result.user.role } } */
            return { token, msg: "Inicio de sesión exitoso" }
        } catch (error) {
            console.error("Error al iniciar sesión", error);
            throw error;
        }
    }
}

export default new AuthService();