/*
    Hospitales
    ruta:'/api/medico'
*/

const { Router } = require("express");
const {
  getMedico,
  crearMedico,
  actualizarMedico,
  deleteMedico,
} = require("../controllers/medico");

const { validarJWT } = require("../middlewares/validar-jwt");

const router = Router();

router.get("/", validarJWT, getMedico);

router.post("/", [], crearMedico);

router.put("/:id", [], actualizarMedico);

router.delete("/:id", [], deleteMedico);

module.exports = router;
