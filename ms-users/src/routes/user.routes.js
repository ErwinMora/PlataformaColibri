import express from "express";
import dotenv from "dotenv";

import { createUserController } from "../controller/user.controller.js"

dotenv.config(); // Cargar variables de entorno

const createuser = process.env.URI_CREATE;

const router = express.Router();

router.post(createuser, createUserController);

export default router;
