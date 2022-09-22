const { response } = require("express");

const getMedico = async (req, res = response) => {
  res.json({
    ok: true,
    msg: "getMedico",
  });
};

const crearMedico = async (req, res = response) => {
  res.json({
    ok: true,
    msg: "crearMedico",
  });
};

const actualizarMedico = async (req, res = response) => {
  res.json({
    ok: true,
    msg: "actualizarMedico",
  });
};

const deleteMedico = async (req, res = response) => {
  res.json({
    ok: true,
    msg: "deleteMedico",
  });
};

module.exports = {
  getMedico,
  crearMedico,
  actualizarMedico,
  deleteMedico,
};
