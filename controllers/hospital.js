const { response } = require("express");
const Hospital = require("../models/hospital");

const getHospital = async (req, res = response) => {
  const hospitales = await Hospital.find({}, "_id nombre");

  res.json({
    ok: true,
    hospitales,
  });
};

const crearHospital = async (req, res = response) => {
  const uid = req.uid;
  const hospital = new Hospital({
    usuario: uid,
    ...req.body,
  });
  try {
    const hospitalDB = await hospital.save();
    return res.json({
      ok: true,
      hospital: hospitalDB,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: "Hable con el administrador",
    });
  }
};

const actualizarHospital = async (req, res = response) => {
  const uid = req.params.id;
  try {
    const hospitalDB = await Hospital.findById(uid);
    if (!hospitalDB) {
      return res.status(404).json({
        ok: false,
        msg: "No existe ese hospital por id",
      });
    }

    const { nombre } = req.body;

    const hospitalactualizado = await Hospital.findByIdAndUpdate(uid, { nombre: nombre}, {
      new: true,
    });

    res.json({
      ok: true,
      hospital: hospitalactualizado,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Error inesperado... revisar logs",
    });
  }
};

const deleteHospital = async (req, res = response) => {
  const uid = req.params.id;
  try {
    const hospitalDB = await Hospital.findById(uid);
    if (!hospitalDB) {
      return res.status(404).json({
        ok: false,
        msg: "No existe hospital por ese id",
      });
    }
    await Hospital.findByIdAndDelete(uid);
    res.json({
      ok: true,
      msg: "Hospital Eliminado",
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
  getHospital,
  crearHospital,
  actualizarHospital,
  deleteHospital,
};
