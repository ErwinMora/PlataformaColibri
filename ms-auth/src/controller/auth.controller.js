import AuthService from "../service/auth.service.js";

export const registerController = async (req, res) => {
    try {
        const { email, password } = req.body;
        const auth = await AuthService.register(email, password);
        res.status(201).json(auth);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}

export const loginController = async (req, res) => {
    try {
        const { email, password } = req.body;
        const auth = await AuthService.login(email, password);
        res.status(200).json(auth);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}