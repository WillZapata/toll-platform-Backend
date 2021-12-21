const { verify } = require("jsonwebtoken");

function userGuard(req, res, next) {
    //Captura la cabecera authorization
    const authorization = req.headers.authorization;
    if (!authorization){
        next(res.status(403).json({estado: "error", msg: "No autorizado"}));
    }
    //Pregunta si tiene esa cabecera
    try {
        const token = authorization.split(" ")[1];
        const payload = verify(token, process.env.JWT_SECRET_KEY);
        console.log(payload);
        if (payload.rol !== "administrador") {
            next(res.status(403).json({estado: "error", msg: "No autorizado"}));
        }
    } catch (error) {
        
    }
    next();
    //Verificar el token con la clave
    //Rechazamos o next
}

exports.userGuard = userGuard;