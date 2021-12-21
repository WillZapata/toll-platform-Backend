const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const internos = require("./modelos/usuariosInternosModelos");
const { usuariosRutas } = require("./rutas/usuariosRutas");
const { externosRutas } = require("./rutas/externosRutas");
require("dotenv").config();

const app = express();
app.use(cors())
app.use(express.json());

app.use("/usuarioi", usuariosRutas);
app.use("/usuario", externosRutas);

mongoose.connect(process.env.URL_DBS)
    .then(res => console.log("Conectado a la base de datos"))
    .catch(error => console.log(error));

app.listen(8089, () => {
    console.log("Servidor escuchando en el puerto 8089")
}) 