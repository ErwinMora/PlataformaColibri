import Auth from "../models/auth.model.js";

class AuthRepository {
    async findByEmail(email) {
        return await Auth.findOne({ email });
    }

    async createAuth(authData) {
        const newAuth = new Auth(authData);
        return await newAuth.save();
    }

}

export default new AuthRepository();