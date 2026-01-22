import UserService from "../service/user.service.js";

export const createUserController = async (req, res) => {
    try {
        const { userdata } = req.body;
        const user = await UserService.createUser(userdata);
        res.status(201).json(user);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}