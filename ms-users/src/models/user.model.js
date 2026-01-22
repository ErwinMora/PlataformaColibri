import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    nombre: { type: String, required: true },
    apellidos: { type: String, required: true },
    fechanacimiento: { type: Date, required: true },
    telefono: { type: String, required: true, unique: true }
});

export default mongoose.model("User", userSchema);