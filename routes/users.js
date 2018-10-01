const router = require("express").Router();
const User = require("../models/User");
const uploadCloud = require("../helpers/cloudinary");

//importar los posts
const Chambita = require("../models/Chambita");
router.get("/:username", (req, res, next) => {
  const { username } = req.params;
  User.findOne({ username: username })
    .then(user => {
      Chambita.find({ user: user._id })
        .sort("-created_at")
        .then(chambitas => {
          let isOwner = false;
          if (req.user._id == user._id) isOwner = true;
          res.render("users/profile", {
            data: user,
            owner: isOwner,
            chambitas: chambitas
          });
        });
    })
    .catch(error => {
      res.redirect("/");
    });
});

//edit user info
router.post("/:username", uploadCloud.single("image"), (req, res, next) => {
  const { username } = req.params;

  if (req.file) req.body["photoURL"] = req.file.url;
  User.findOneAndUpdate(
    { username: username },
    { $set: req.body },
    { new: true }
  )
    .then(user => {
      console.log(user);
      res.redirect(`/users/${user.username}`);
    })
    .catch(e => {
      console.log(e);
    });
});

module.exports = router;
