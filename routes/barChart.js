const router = require("express").Router();
const User = require("../models/User");
const Chambita = require("../models/Chambita");
const uploadCloud = require("../helpers/cloudinary");

router.get("/", (req, res) => {
  User.find({});
  // Chambita.find({})
  // .populate("user")

  User.find({})
    .populate("chambita")
    .then(users =>
      res
        .render("users/barChart", {
          users: users
        })

        .catch(error => {
          res.redirect("/");
        })
    );
});

module.exports = router;
