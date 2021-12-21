const { model, Schema } = require("mongoose");
const {genSalt, hash} = require("bcrypt");

const usuariosSchema = new Schema({
    nombres:{
        type: "string",
        required: true
    },
    apellidos:{
        type: "string",
        required: true
    },
    tipodocumento:{
        type: "string",
        required: true
    },
    documento:{
        type: "number",
        required: true
    },
    correo:{
        type: "string",
        required: true
    },
    rol:{
        type: "string",
        required: true
    },
    contraseña:{
        type: "string",
        required: true,
        min: 6
    }

});

usuariosSchema.pre("save", async function (next) {
    const salt = await genSalt(+process.env.BCRYPT_ROUNDS);
    this.contraseña = await hash(this.contraseña,salt);
    next();
})

// module.exports = mongoose.model("internos", usuariosInternosModelos);
const usuariosInternosModelos = model("internos", usuariosSchema);
exports.usuariosInternosModelos = usuariosInternosModelos;