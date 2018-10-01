const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const nonuserSchema = new Schema(
  {
    username: String,
    email: String,
    phone: Number
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at"
    },
    versionKey: false //Opcional
  }
);

module.exports = mongoose.model("Nonuser", nonuserSchema);
