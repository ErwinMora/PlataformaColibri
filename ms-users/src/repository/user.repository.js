import User from "../models/user.model.js";

class UserRepository {
    // Método para crear un nuevo usuario
    async createUser(userdata) {
        const newUser = new User(userdata);
        return await newUser.save();
    }
}

export default new UserRepository();