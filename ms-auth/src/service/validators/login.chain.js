import { DataValidator, EmailValidator, EmailExistsValidator, PasswordValidator } from "./auth.validator.js";

export default function BuildLoginChain() {
    const data = new DataValidator();
    const email = new EmailValidator();
    const exists = new EmailExistsValidator();
    const pass = new PasswordValidator();

    data.setNext(email).setNext(exists).setNext(pass);

    return data;
}