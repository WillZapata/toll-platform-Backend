const { model, Schema } = require("mongoose");
const { genSalt, hash } = require("bcrypt");

const usuariosSchema = new Schema({
  nombres: {
    type: String,
    required: true,
  },
  apellidos: {
    type: String,
    required: true,
  },
  tipodocumento: {
    type: String,
    required: true,
  },
  documento: {
    type: Number,
    required: true,
  },
  correo: {
    type: String,
    required: true,
  },
  rol: {
    type: String,
    required: true,
  },
  contrasena: {
    type: String,
    required: true,
    min: 6,
  },
  activo: { type: Boolean, required: true },
});

usuariosSchema.pre("save", async function (next) {
  const salt = await genSalt(+process.env.BCRYPT_ROUNDS);
  this.contrasena = await hash(this.contrasena, salt);
  next();
});

usuariosSchema.pre("update", async function (next) {
  const salt = await genSalt(+process.env.BCRYPT_ROUNDS);
  this.contrasena = await hash(this.contrasena, salt);
  next();
});

// module.exports = mongoose.model("internos", usuariosInternosModelos);
const usuariosInternosModelos = model("internos", usuariosSchema);
exports.usuariosInternosModelos = usuariosInternosModelos;
