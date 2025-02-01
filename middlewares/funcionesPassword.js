
import crypto from "crypto";

export function encriptarPassword(password) {
    const salt = crypto.randomBytes(32).toString("hex");
    const hash = crypto.scryptSync(password, salt, 10, 64, "sha512").toString("hex");
    return {
        salt,
        hash
    }
}

export function validarPassword(password, salt, hash) {
    const hashEvaluar = crypto.scryptSync(password, salt, 10, 64, "sha512").toString("hex");
    return hashEvaluar == hash; //comparar ambas contraseñas encryptadad
}

export function usuarioAutorizado() {

}

export function adminAutorizado() {

}

