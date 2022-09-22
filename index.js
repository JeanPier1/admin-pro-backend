const express = require("express");
require("dotenv").config();
const cors = require("cors");
const { dbConnection } = require("./database/config");

// crear el servidor express
const app = express();

app.use(cors());

app.use(express.json());

dbConnection();

// Rutas
app.use("/api/usuarios", require("./routes/usuarios"));
<<<<<<< HEAD

=======
app.use("/api/hospitales", require("./routes/hospitales"));
app.use("/api/medicos", require("./routes/medicos"));
>>>>>>> 584845f8be0e37d885b10b75d58f8966cb15530f
app.use("/api/login", require("./routes/auth"));

app.listen(3005, () => {
  console.log("servidor corriendo" + process.env.PORT);
});
