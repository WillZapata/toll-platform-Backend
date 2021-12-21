const { verify } = require("jsonwebtoken");

function userAuthguard(req, res, next) {
    //Captura la cabecera authorization
    const authorization = req.headers.authorization;
    if (!authorization){
        return res.status(403).json({estado: "error", msg: "No autorizado"});
    }
    //Pregunta si tiene esa cabecera
    try {
        const token = authorization.split(" ")[1];
        const payload = verify(token, process.env.JWT_SECRET_KEY);
        if (payload.rol !== "administrador") {
            return res.status(403).json({estado: "error", msg: "No autorizado"});
        }
    } catch (error) {
        return res.status(403).json({estado: "error", msg: "No autorizado"});
    }
    next();
    //Verificar el token con la clave
    //Rechazamos o next
}

exports.userAuthguard = userAuthguard;