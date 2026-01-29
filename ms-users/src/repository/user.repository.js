import User from "../models/user.model.js";

class UserRepository {
    // Método para ver usuarios
    async getUsers() {
        return await User.find();
    }

    // Método para actualizar usuario
    async updateUser() {}

    // Método para eliminar usuario
    async deleteUser() {}
}

export default new UserRepository();