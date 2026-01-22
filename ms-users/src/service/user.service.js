import userRepository from "../repository/user.repository.js";

class UserService {
    constructor(parameters) {
        
    }

    // Método para crear a un nuevo usuario
    async createUser(userdata) {
        return await userRepository.createUser(userdata);
    }
    
}

export default new UserService();