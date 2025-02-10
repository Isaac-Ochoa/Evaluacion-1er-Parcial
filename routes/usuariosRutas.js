import { Router } from "express";
import { actualizarUsuario, buscarUsuario, eliminarUsuario, obtenerUsuarios, register } from "../db/usuariosDB.js";
const router=Router();

router.post("/registro", async(req,res) =>{
    const respuesta = await register(req.body);
    console.log(respuesta.mensajeOriginal);
    res.status(respuesta.status).json(respuesta.mensajesUsuario);
});

router.post("/inicioSesion",(req,res)=>{
    res.json("estas en inicio de sesion");
});

router.get("/cerrarSesion",(req,res)=>{
    res.json("estas en cerrar sesion");
});

router.get("/usuariosLogueados", (req,res)=>{
    res.json("Solo usuarios y administradores");
});

router.get("/administradores", (req,res)=>{
    res.json("Solo administradores");
});


router.get("/libre", (req,res)=>{
    res.json("Aqui puedes entrar sin estar logueado");
});

///////////////////////////////////////////////////////////////////////////

router.get("/usuarios", async(req, res) => {
    const respuesta = await obtenerUsuarios();
    res.status(respuesta.status).json({
        mensaje: respuesta.mensajesUsuario,
        usuarios: respuesta.datos
    });
});

router.get("/buscarUsuario/:id", async(req, res)=>{
    const respuesta = await buscarUsuario(req.params.id);
    res.status(respuesta.status).json({
        mensaje: respuesta.mensajesUsuario,
        usuario: respuesta.datos
    });
});

router.delete("/eliminarUsuario/:id", async(req, res)=>{
    const respuesta = await eliminarUsuario(req.params.id);
    res.status(respuesta.status).json(respuesta.mensajesUsuario);
});


router.put("/actualizarUsuario/:id", async(req, res)=>{
    const respuesta = await actualizarUsuario(req.params.id, req.body);
    res.status(respuesta.status).json(respuesta.mensajesUsuario);
});

export default router;
