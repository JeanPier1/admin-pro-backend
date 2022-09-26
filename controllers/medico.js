const { response } = require("express");
const Medico = require("../models/medico");
const Hospital = require("../models/hospital");


const getMedico = async (req, res = response) => {
  const medicos = await Medico.find().populate('hospital','nombre img').populate('usuario','nombre img');

  res.json({
    ok: true,
    medicos,
  });
};

const crearMedico = async (req, res = response) => {
  const uid = req.uid;


  const { hospital , ...params} = req.body;

  const hospitalDB = await Hospital.findById(hospital);
  if (!hospitalDB) {
    return res.status(404).json({
      ok: false,
      msg: "No existe ese hospital por id",
    });
  }


  const medico = new Medico({
    usuario: uid,
    ...params,
  });

  try {
    const medicoDB = await medico.save();
    return res.json({
      ok: true,
      medico: medicoDB,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: "Hable con el administrador",
    });
  }
};

const actualizarMedico = async (req, res = response) => {
  const uid = req.params.id;
  try {
    const medicoDB = await Medico.findById(uid);
    if (!medicoDB) {
      return res.status(404).json({
        ok: false,
        msg: "No existe ese medico por id",
      });
    }

    const { nombre,hospital , ...params} = req.body;

    const hospitalDB = await Hospital.findById(hospital);
    if (!hospitalDB) {
      return res.status(404).json({
        ok: false,
        msg: "No existe ese hospital por id",
      });
    }


    const medicoactualizado = await Medico.findByIdAndUpdate(
      uid,
      { nombre: nombre },
      { hospital: hospital },
      {
        new: true,
      }
    );
    res.json({
      ok: true,
      medico: medicoactualizado,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Error inesperado... revisar logs",
    });
  }
};

const deleteMedico = async (req, res = response) => {
  const uid = req.params.id;

  try {
    const medicoDB = await Medico.findById(uid);
    if (!medicoDB) {
      return res.status(404).json({
        ok: false,
        msg: "No existe ese medico por id",
      });
    }

    await Medico.findByIdAndDelete(uid);
    res.json({
      ok: true,
      msg: "Medico Eliminado",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Error inesperado... revisar logs",
    });
  }
};

module.exports = {
  getMedico,
  crearMedico,
  actualizarMedico,
  deleteMedico,
};
