const express = require("express");
require("dotenv").config();
const cors = require("cors");
const { dbConnection } = require("./database/config");

// crear el servidor express
const app = express();

app.use(cors());

dbConnection();

app.get("/api/usuarios", (req, res) => {
  res.json({
    ok: true,
    usuarios: [
      {
        id: 123,
        nombre: "Fernando",
      },
    ],
  });
});

app.listen(3005, () => {
  console.log("servidor corriendo" + process.env.PORT);
});
