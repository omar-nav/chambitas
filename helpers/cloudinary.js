const cloudinary = require("cloudinary");
const cloudinaryStorage = require("multer-storage-cloudinary");
const multer = require("multer");

cloudinary.config({
  cloud_name: "davd4ynha",
  api_key: "161114344241811",
  api_secret: "lnCDx6zo2imFZJuSYdspJoUlMR0"
});
var storage = cloudinaryStorage({
  cloudinary,
  folder: "assets",
  allowedFormats: ["jpg", "png", "jpeg", "gif", "pdf"],
  filename: function(req, file, cb) {
    cb(null, file.originalname);
  }
});

const uploadCloud = multer({ storage: storage });
module.exports = uploadCloud;
