import mongoose from 'mongoose';

const authSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, unique: true },
    role: { type: String, default: "Pasajero" }
});

export default mongoose.model("Auth", authSchema);
