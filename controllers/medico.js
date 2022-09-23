const { response } = require("express");
const Medico = require("../models/medico");

const getMedico = async (req, res = response) => {
  const medicos = await Medico.find();

  res.json({
    ok: true,
    medicos,
  });
};

const crearMedico = async (req, res = response) => {
  const uid = req.uid;
  const medico = new Medico({
    usuario: uid,
    ...req.body,
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
    const { nombre } = req.body;

    const medicoactualizado = await Medico.findByIdAndUpdate(
      uid,
      { nombre: nombre },
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
