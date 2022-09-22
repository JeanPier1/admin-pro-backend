/*
    Hospitales
    ruta:'/api/medico'
*/

const { Router } = require("express");
const { check } = require("express-validator");
const {
  getMedico,
  crearMedico,
  actualizarMedico,
  deleteMedico,
} = require("../controllers/medico");
const { validarCampos } = require("../middlewares/validar-campos");

const { validarJWT } = require("../middlewares/validar-jwt");

const router = Router();

router.get("/", validarJWT, getMedico);

router.post("/", [
  validarJWT,
  check("nombre","El nombre del medico es necesario"),
  check("idhospital","El id del hospital es necesario"),
  validarCampos
], crearMedico);

router.put("/:id", [
validarJWT,
  check("nombre","El nombre del medico es necesario"),
  check("idhospital","El id del hospital es necesario"),
  validarCampos
], actualizarMedico);

router.delete("/:id", [validarJWT], deleteMedico);

module.exports = router;
