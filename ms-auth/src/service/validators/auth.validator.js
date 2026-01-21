import AuthRepository from "../../repository/auth.repository.js";
import dotenv from "dotenv";
import { comparePassword } from "../../utils/encription.js";
dotenv.config();

class AuthValidator {
    setNext(validator) {
        this.next = validator;
        return validator;
    }

    async validate(data) {
        if (this.next) {
            return this.next.validate(data);
        }
        return data;
    }
}

class DataValidator extends AuthValidator {
    async validate(data) {
        const { email, password } = data;
        if (!email || !password) {
            console.log("Favor de completar los campos.");
            throw new Error("Email y contraseñas son obligatorios.")
        }
        return super.validate(data);
    }
}

class EmailValidator extends AuthValidator {
    async validate(data) {
        const { email } = data;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            console.log("El formato del correo es inválido.");
            throw new Error("Formato de correo inválido.");
        }
        return super.validate(data);
    }
}

class EmailExistsValidator extends AuthValidator {
    async validate(data) {
        const { email } = data;
        const exits = await AuthRepository.findByEmail(email);
        if (!exits) {
            console.log("El correo electronico no esta registrado");
            throw new Error("Correo no registrado.")
        }
        
        data.user = exits;
        return super.validate(data);
    }
}

class EmailNotExistsValidator extends AuthValidator {
    async validate(data) {
        const { email } = data;
        const exits = await AuthRepository.findByEmail(email);
        if (exits) {
            console.log("El correo electronico ya esta siendo usado.");
            throw new Error("Correo ya registrado.");
        }
        return super.validate(data);
     }
}

class RoleValidator extends AuthValidator {
    async validate(data) {
        const { role } = data;
        const rolesvalid = process.env.ROLES_VALID.split(",");
        if (!rolesvalid.includes(role)) {
            console.log("No esta difinido el el rol del usuario.");
            throw new Error("Rol de usuario no valido.")
        }
        return super.validate(data);
    }
}

class PasswordValidator extends AuthValidator {
    async validate(data) {
        const { password } = data;
        const passvalid = await comparePassword(password, data.user.password);
        if (!passvalid) {
            console.log("Contraseña incorrecta.");
            throw new Error("Contraseña es incorrecta.");
        }
        return super.validate(data);
    }
}



export { DataValidator, EmailValidator, EmailExistsValidator, EmailNotExistsValidator, RoleValidator, PasswordValidator };