const Usuario = require("../models/usuario");

const getUsuarios = (req,res)=>{
    res.json({
        ok:true,
        msg:'get Ususario'
    })
}

const crearUsuario = async(req,res) =>{

    const { email, password, nombre} = req.body;

    const usuario = new Usuario(req.body);

    await usuario.save();

    console.log(req.body);
    res.json({
        ok:true,
        usuario
    });
}



module.exports = {
    getUsuarios,crearUsuario
}