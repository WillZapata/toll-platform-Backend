const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const internos = require("./modelos/usuariosInternosModelos");
const { usuariosRutas } = require("./rutas/usuariosRutas");
require("dotenv").config();

const app = express();
app.use(cors())
app.use(express.json());

app.use("/usuarioi", usuariosRutas);

mongoose.connect(process.env.URL_DBS)
    .then(res => console.log("Conectado a la base de datos"))
    .catch(error => console.log(error));

// app.post("/guardar", function (req, res) {
//     const data = req.body;
//     const usu = new internos(data);
//     usu.save(function (error) {
//         if (error) {
//             res.send({ estado: "error", msg: "Producto no guardado" });
//             return false;
//         }
//         res.send({ estado: "OK", msg: "Producto guardado" });
//     })
// });

// app.post("/usuarioi/consultar", function (req, res) {
//     const { documento } = req.body;
//     internos.findOne({ documento }, function (error, usu) {
//         if (error) {
//             return res.send({estado: "error", msg: "Error al buscar usuario"})
//         }else{
//             if (usu !== null) {
//                 res.send({estado: "OK", msg: "Usuario encontrado", data: usu });
//             }else{
//                 res.send({ estado: "error", msg: "Producto no encontrado"});
//             }
//         }
//     })
// })






app.listen(8089, () => {
    console.log("Servidor escuchando en el puerto 8089")
}) 