const express = require("express");
require("dotenv").config();
const cors = require("cors");
const { dbConnection } = require("./database/config");

// crear el servidor express
const app = express();

app.use(cors());

app.use( express.json());

dbConnection();

// Rutas
app.use("/api/usuarios", require("./routes/usuarios"));

app.listen(3005, () => {
  console.log("servidor corriendo" + process.env.PORT);
});
