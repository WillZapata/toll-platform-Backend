const { model, Schema } = require("mongoose");
const {genSalt, hash} = require("bcrypt");
const usuariosSchema = new Schema({
    nombre:{
        type: "string",
        required: true
    },
    apellido:{
        type: "string",
        required: true
    },
    documento:{
        type: "number",
        unique: true,
        required: true
    },
    contraseña:{
        type: "string",
        required: true,
        min: 6
    },
    rol:{
        type: "string",
        required: true
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