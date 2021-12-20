const { Router } = require("express");
const usuariosRutas = Router();
const { usuariosInternosModelos } = require("../modelos/usuariosInternosModelos")
const { compare } = require("bcrypt");
const {sign} = require("jsonwebtoken");
const { userGuard } = require("../guard/userguard");
const usuariosSchema = require("../modelos/usuariosInternosModelos")

usuariosRutas.get("/listar", function (req, res) {
    usuariosInternosModelos.find( function (error, usu) {
        if (error) {
            return res.send({estado: "error", msg: "Error al buscar usuario"})
        }else{
            if (usu !== null) {
                res.send({estado: "OK", msg: "Usuario encontrado", data: usu });
            }else{
                res.send({ estado: "error", msg: "Producto no encontrado"});
            }
        }
    })
})

usuariosRutas.post("/login", async function (req, res) {
    //Capturar el usuario y password
    const { documento, contraseña } = req.body;
    //Buscar en base de datos el usuario
    const user = await usuariosInternosModelos.findOne({ documento: documento }); 

    //Preguntar si existe el usuario
    if (!user){
        return res.status(401).send({estado: "error", msg: "Credenciales no validas"});
    }

    //Comparar el password bcrypt
    const passOK = await compare(contraseña, user.contraseña);
    if (passOK === true){
        const token = sign(
            {
                documento: user.documento,
                rol: user.rol
            },
            process.env.JWT_SECRET_KEY
        )
        return res.status(200).send({ estado: "OK", msg: "Ha iniciado sesión", url:"/uexterno", token });
    }
    return res.status(401).send({ estado: "error", msg: "Credenciales no validas"});
    //Responder OK / Error
});

usuariosRutas.post("/registro", userGuard, function (req, res) {
    //Captura los datos
    const data = req.body;
    //Instancia el modelo y pola con los datos
    const user = new usuariosInternosModelos(data);
    //Guardar en BD
    user.save(function (error) {
        if (error) {
            return res.status(500).send({ estado: "error", msg: "Usuario no guardado"})
        }
        return res.status(200).send({ estado: "OK", msg: "Usuario guardado"})
    })
    //Responde OK / error
})

exports.usuariosRutas = usuariosRutas;