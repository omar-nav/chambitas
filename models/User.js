const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const plm = require("passport-local-mongoose");

const userSchema = new Schema(
  {
    username: {
      type: String,
      unique: true
    },
    email: String,
    bio: String,
    photoURL: String,
    type: {
      type: String,
      enum: ["employer", "employee"],
      default: "employee"
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
    chambita: [
      {
        type: Schema.Types.ObjectId,
        ref: "Chambita"
      }
    ]
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at"
    },
    versionKey: false //Opcional
  }
);

userSchema.plugin(plm, { usernameField: "username" });
module.exports = mongoose.model("User", userSchema);
