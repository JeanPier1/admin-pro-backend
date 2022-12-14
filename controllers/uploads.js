const { join } = require('path');
const { response } = require("express");
const { v4: uuidv4 } = require('uuid');
const { actualizarImagen } = require("../helpers/actualizar-imagen");
const fs = require("fs");


const fileUpload = (req, res = response) =>{

    const tipo = req.params.tipo;
    const id = req.params.id;


    // Validar tipo
    const tiposValidos = ['hospitales','medicos','usuarios'];
    if (!tiposValidos.includes(tipo)) {
        return res.status(400).json({
            ok:false,
            msg:"No es un medico, usuario u hospital"
        });
    } 

    // Validar que exista un archivo

    if(!req.files || Object.keys(req.files).lenght===0){
        return res.status(400).json({
            ok:false,
            msg:'No hay ningun archivo'
        });
    }

    // Procesando la imagen...
    const file = req.files.imagen;

    const nombreCortado = file.name.split('.');
    const extensionArchivo = nombreCortado[ nombreCortado.length -1];

    // Validar extension

    const extensionesValida = ['png','jpg','jpeg','gif','PNG'];
    if (!extensionesValida.includes(extensionArchivo)) {
        return res.status(400).json({
            ok:false,
            msg:"No es una extension permitida"
        });
    }

    // Generar el nombre del archivo 

    const nombreArchivo = `${uuidv4()}.${extensionArchivo}`;
    

    // Path para guardar la imagen

    const path = `./uploads/${tipo}/${nombreArchivo}`;

    // Move la imagen
    file.mv(path, (err)=>{
        if (err) {
            console.log(err);
            return res.status(500).json({
                ok:false,
                msg:"Error al mover la imagen"
            });
        }

        // Actualizar la base de datos
        actualizarImagen(tipo,id,path,nombreArchivo)

        res.json({
            ok:true,
            msg:'Archivo subido',
            nombreArchivo
        });
    });

}



const retornaImagen = (req,res = response)=>{

    const tipo = req.params.tipo;
    const foto = req.params.foto;

    const pathImg = join(__dirname,`../uploads/${tipo}/${foto}`)
    if(fs.existsSync(pathImg)){
        res.sendFile( pathImg );
    }else{
        const pathImg = join(__dirname,'../uploads/no-img.jpg')
        res.sendFile(pathImg);
    }
} 


module.exports = {
    fileUpload,
    retornaImagen
}
