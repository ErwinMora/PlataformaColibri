import EventEmitter from "events"; // Libreria para manejar eventos
import axios from "axios";

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
            const newAuth = await AuthRepository.createAuth({ // Crear nuevo usuario
                email,
                password: hashedPassword
            });

            const userService = process.env.USER_SERVICE_URL;
            try {
                await axios.post(userService, newAuth);
                console.log("Envio evento a otro microservicio");
            } catch (error) {
                console.error("No se pudo realizar", error);
            }
            console.log("Se registro el usuario correctamente.");
            return newAuth;
        } catch (error) {
            console.error("Error al registrar el usuario", error);
            throw error;
        }
    }

    // Método para iniciar sesión
    async login(email, password) {
        try {
            // Validación con Chain of Responsibility
            const result = await this.loginValidators.validate({ email, password });
            const token = generateToken(result.user);

            return {
                token,
                user: {
                    id: result.user.id,
                    email: result.user.email,
                    role: result.user.role
                }
            }
        } catch (error) {
            console.error("Error al iniciar sesión", error);
            throw error;
        }
    }
}

export default new AuthService();