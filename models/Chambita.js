const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const chambitaSchema = new Schema(
  {
    likeado: {
      type: Boolean,
      default: false
    },
    JobType: {
      type: String,
      enum: [
        "Plomeria",
        "Pintor",
        "Mecanico",
        "Carpintero",
        "Artista",
        "Chef",
        "Bartender",
        "Desarrollador",
        "Limpieza",
        "Fotografo",
        "Chofer",
        "Mudanza",
        "Otro"
      ],
      default: "Otro"
    },
    location: {
      type: {
        type: String,
        default: "Point"
      },
      address: String,
      coordinates: {
        lat: { type: Number },
        lng: { type: Number }
      }
    },
    text: String,
    imageURL: String,
    user: {
      type: Schema.Types.ObjectId,
      ref: "User"
    },
    likes: [
      {
        type: Schema.Types.ObjectId,
        ref: "User"
      }
    ]
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at"
    }
  }
);

module.exports = mongoose.model("Chambita", chambitaSchema);
