const { response } = require("express");
const hospital = require("../models/hospital");
const medico = require("../models/medico");
const usuario = require("../models/usuario");

const getTodo = async (req, res = response) => {
  const busqueda = req.params.busqueda;
  const regex = new RegExp(busqueda, "i");

  const [usuarios, hospitales, medicos] = await Promise.all([
    usuario.find({
      nombre: regex,
    }),
    hospital
      .find({
        nombre: regex,
      })
      .populate("usuario", "nombre img"),
    medico
      .find({
        nombre: regex,
      })
      .populate("usuario", "nombre img")
      .populate("hospital", "nombre img"),
  ]);

  return res.json({
    ok: true,
    msg: "Busqueda todo",
    usuarios,
    hospitales,
    medicos,
  });
};

const getDocumentosColeccion = async (req, res = response) => {
  const tabla = req.params.tabla;
  const busqueda = req.params.busqueda;
  const regex = new RegExp(busqueda, "i");

  let data = [];

  switch (tabla) {
    case "medicos":
      data = await medico
        .find({
          nombre: regex,
        })
        .populate("usuario", "nombre img")
        .populate("hospital", "nombre img");
      break;
    case "hospitales":
      data = await hospital
        .find({
          nombre: regex,
        })
        .populate("usuario", "nombre img");
      break;
    case "usuarios":
      data = await usuario.find({
        nombre: regex,
      });
      break;
    default:
      res.status(400).json({
        ok: false,
        msg: "La tabla tiene que ser usuarios/medicos/hospitales",
      });
  }

  return res.json({
    ok: true,
    resutado: data,
  });
};

module.exports = {
  getTodo,
  getDocumentosColeccion,
};
