import express from "express";
import dotenv from "dotenv";

import { loginController, registerController } from "../controller/auth.controller.js";

dotenv.config();
// const auth = process.env.URI_AUTH;
const login = process.env.URI_LOGIN;
const register = process.env.URI_REGISTER;

const router = express.Router();

router.post(register, registerController);
router.post(login, loginController)

export default router;

