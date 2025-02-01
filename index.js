import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import usuariosrutas from "./routes/usuariosRutas.js";
import { conectarBD } from "./db/db.js";

const app=express();
const respuesta = conectarBD();
respuesta.then((value)=>{
    console.log(value);
    
})


app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use("/api",usuariosrutas);

const PORT = process.env.PORT || 3000;

app.listen(PORT, ()=>{
    console.log(`Servidor en http://localhost:${PORT}`);
}); 