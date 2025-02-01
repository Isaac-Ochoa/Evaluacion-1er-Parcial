import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true, //es requerido
        trim:true, //borra los espacios vacios
        unique:true // debe de ser unico
    },
    email:{
        type:String,
        required:true,
        trim:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    salt:{
        type:String,
        required:true
    }
},
{
    timestamps:true
}

);

export default mongoose.model("User", userSchema);