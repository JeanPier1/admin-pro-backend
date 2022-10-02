const express = require("express");
require("dotenv").config();
const cors = require("cors");
const { dbConnection } = require("./database/config");

// crear el servidor express
const app = express();

app.use(cors());


// Carpeta public
app.use(express.static('public'));

app.use(express.json());

dbConnection();

// Rutas
app.use("/api/usuarios", require("./routes/usuarios"));
app.use("/api/hospitales", require("./routes/hospitales"));
app.use("/api/medicos", require("./routes/medicos"));
app.use("/api/login", require("./routes/auth"));
app.use("/api/todo", require("./routes/busquedas"));
app.use("/api/upload", require('./routes/uploads'));

app.listen(3005, () => {
  console.log("servidor corriendo" + process.env.PORT);
});
