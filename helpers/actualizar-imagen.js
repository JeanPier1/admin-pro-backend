const Usuario = require("../models/usuario");
const Medico = require("../models/medico");
const Hospital = require("../models/hospital");
const fs = require("fs");

const borrarImgen = (archivo, tipo) => {
  const pathViejo = `./uploads/${tipo}/${archivo.img}`;
  if (fs.existsSync(pathViejo)) {
    // borrar la imagen anterior
    fs.unlinkSync(pathViejo);
  }
};

const actualizarImagen = async (tipo, id, path, nombreArchivo) => {
  switch (tipo) {
    case "medicos":
      const medico = await Medico.findById(id);
      if (!medico) {
        console.log("No es medico por id");
        return false;
      }
      borrarImgen(medico,'medicos');
      medico.img = nombreArchivo;
      await medico.save();
      return true;

      break;
    case "hospitales":
      const hospital = await Hospital.findById(id);
      if (!hospital) {
        console.log("No es hospital por id");
        return false;
      }
      borrarImgen(hospital,'hospitales');
      hospital.img = nombreArchivo;
      await hospital.save();
      return true;
      break;
    case "usuarios":
      const usuario = await Usuario.findById(id);
      if (!usuario) {
        console.log("No es usuarios por id");
        return false;
      }
      borrarImgen(usuario,'usuarios');
      usuario.img = nombreArchivo;
      await usuario.save();
      return true;
      break;
  }
};

module.exports = {
  actualizarImagen,
};
