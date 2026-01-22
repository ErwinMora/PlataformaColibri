import express from "express";
import dotenv from "dotenv";

dotenv.config(); // Cargar variables de entorno

const createuser = new process.env.URI_CREATE;

const router = express.Router();

router.post(createuser, userController);

export default router;
