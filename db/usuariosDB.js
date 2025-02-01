import User from "../models/usuarioModelo.js";
import { encriptarPassword, validarPassword } from "../middlewares/funcionesPassword.js";
import { mensajes } from "../libs/mensajes.js";

export const register = async ({ username, email, password }) => {
    try {
        const usuarioDuplicado = await User.findOne({username});
        const emailDuplicado = await User.findOne({email});
        if(usuarioDuplicado || emailDuplicado){
            return mensajes(400,"El usuario ya existe");
        }
        const { salt, hash } = encriptarPassword(password);
        const dataUser = new User({ username, email, password: hash, salt });
        const respuestaMongo = await dataUser.save();
        return mensajes(200, "Usuario registrado correctamente");

    } catch (error) {
        return mensajes(400, "Error al registrar al usuario", error);
    }
};


export const login = async ({ username, password }) => {

}

export const obtenerUsuarios = async () => {
    try {
        const usuarios = await User.find({}, {password: 0, salt: 0}); // Excluimos password y salt por seguridad
        if (usuarios.length === 0) {
            return mensajes(404, "No hay usuarios registrados");
        }
        return {
            status: 200,
            mensajeUsuario: "Usuarios encontrados",
            datos: usuarios
        };
    } catch (error) {
        return mensajes(400, "Error al obtener usuarios", error);
    }
}

export const buscarUsuarioPorId = async (id) => {
    try {
        const usuarioEncontrado = await User.findById(id);
        if(!usuarioEncontrado) {
            return mensajes(400, "Usuario no encontrado");
        }
        return {
            status: 200,
            mensajeUsuario: "Usuario encontrado",
            datos: usuarioEncontrado
        };
    } catch(error) {
        return mensajes(400, "Error al buscar el usuario", error);
    }
}

export const eliminarUsuario = async (id) => {
    try {
        const usuarioBorrado = await User.findByIdAndDelete(id);
        if(!usuarioBorrado) {
            return mensajes(400, "Usuario no encontrado");
        }
        return mensajes(200, "Usuario borrado correctamente");
    } catch(error) {
        return mensajes(400, "Error al eliminar el usuario", error);
    }
    
}


export const actualizarUsuario = async (id, { username, email, password }) => {
    try {
        // Si hay contraseña, la encriptamos
        let datosActualizar = { username, email };
        if (password) {
            const { salt, hash } = encriptarPassword(password);
            datosActualizar.password = hash;
            datosActualizar.salt = salt;
        }

        const usuarioActualizado = await User.findByIdAndUpdate(
            id,
            datosActualizar,
            { new: true }
        );

        if (!usuarioActualizado) {
            return mensajes(400, "Usuario no encontrado");
        }

        return mensajes(200, "Usuario actualizado");
    } catch (error) {
        return mensajes(400, "Error al actualizar el usuario", error);
    }
}