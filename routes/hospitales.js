/*
    Hospitales
    ruta:'/api/hospitales'
*/

const { Router } = require("express");
const {
  getHospital,
  crearHospital,
  actualizarHospital,
  deleteHospital,
} = require("../controllers/hospital");
const { validarJWT } = require("../middlewares/validar-jwt");

const router = Router();

router.get("/", validarJWT, getHospital);

router.post("/", [], crearHospital);

router.put("/:id", [], actualizarHospital);

router.delete("/:id", [], deleteHospital);

module.exports = router;
