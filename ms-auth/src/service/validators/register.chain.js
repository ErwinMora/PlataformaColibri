import { DataValidator, EmailValidator, EmailNotExistsValidator } from "./auth.validator.js";

export default function BuildRegisterChain() {
    const data = new DataValidator();
    const email = new EmailValidator();
    const exists = new EmailNotExistsValidator();

    data.setNext(email).setNext(exists);

    return data;
}