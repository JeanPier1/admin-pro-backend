const { response } = require("express");

const getHospital = async (req, res = response) => {
  res.json({
    ok: true,
    msg: "getHospitales",
  });
};

const crearHospital = async (req, res = response) => {
  res.json({
    ok: true,
    msg: "crearHospital",
  });
};

const actualizarHospital = async (req, res = response) => {
  res.json({
    ok: true,
    msg: "actualizarHospital",
  });
};

const deleteHospital = async (req, res = response) => {
  res.json({
    ok: true,
    msg: "deleteHospital",
  });
};

module.exports = {
  getHospital,
  crearHospital,
  actualizarHospital,
  deleteHospital,
};
