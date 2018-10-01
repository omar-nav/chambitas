const router = require('express').Router()
const Chambita = require('../models/Chambita')
const uploadCloud = require('../helpers/cloudinary')
const User = require('../models/User')
const Comment = require('../models/Comment')
const ObjectId = require('mongodb').ObjectID;
const {postMail, anulMail} = require('../helpers/mailer')


//lista de chambitas

router.get("/", (req, res, next) => {
  Chambita.find()
    .sort("-created_at")
    .populate("user")
    .then(chambitas => {
      chambitas.map(p => {
        if (JSON.stringify(p.likes).includes(req.user._id)) p.like = true;
        else p.like = false;
        return p;
      });
      res.render("chambitas/newsfeed", { chambitas });
    })
    .catch(e => {
      console.log(e);
      //res.redirect('/')
    });
});

router.post("/", uploadCloud.single("image"), (req, res, next) => {
  req.body["user"] = req.user._id;
  if (req.file) req.body["imageURL"] = req.file.url;
  Chambita.create(req.body)
    .then(chambita => {
      User.findByIdAndUpdate(req.user._id, {
        $push: { chambita: chambita._id }
      }).then(u => {
        res.redirect("/chambitas");
      });
    })

    .catch(e => {
      next(e);
      //res.redirect("/");
    });
});

//detalle del post
router.get("/detail/:id", (req, res, next) => {
  const { id } = req.params;
  Chambita.findById(id)
    .populate("user")
    .then(chambita => {
      Comment.find({ chambita: chambita._id })
        .populate("user")
        .then(comments => {
          let isOwner = false;
          if (req.user._id == chambita.user._id) isOwner = true;
          res.render("chambitas/detail", {
            chambita: chambita,
            owner: isOwner,
            comments: comments
          });
        })
        .catch(e => {
          console.log(e);
        });
    })
    .catch("/chambitas");
});

router.post("/detail/:id", uploadCloud.single("image"), (req, res, next) => {
  const { id } = req.params;
  if (req.file) req.body["imageURL"] = req.file.url;
  Chambita.findByIdAndUpdate(id, { $set: req.body }, { new: true })
    .then(chambita => {
      res.redirect(`/chambitas/detail/${chambita._id}`);
    })
    .catch(e => {
      res.redirect("/");
    });
});

router.post('/detail/:id/comments',(req, res, next)=>{
  const {id} = req.params
  req.body['chambita'] = id
  req.body['user'] = req.user._id
  Comment.create(req.body)
    .then(comment=>{
      res.redirect(`/chambitas/detail/${id}`)
    }).catch(e=>{
      console.log(e)
    })
    .catch(e => {
      console.log(e);
    });
});

//borramos el post
router.get("/delete/:id", (req, res, next) => {
  const { id } = req.params;
  Chambita.findByIdAndRemove(id)
    .then(chambita => {
      res.redirect("/chambitas");
    })
    .catch(e => {
      console.log(e);
    });
});

///postularse a chambita

router.get("/like/:id", (req, res, next) => {
  req.body["user"] = req.user.username;
  const user = req.body["user"];
  const { id } = req.params;
  Chambita.findOne({ _id: id, likes: { $in: [req.user._id] } })
    .then(chambita => {
      if (chambita == null) {
        Chambita.findByIdAndUpdate(id, { $push: { likes: req.user._id } })
          .populate("user")
          .then(p => {
            postMail(user, p);
            res.redirect("/chambitas");
          })
          .catch(e => {
            console.log(e);
          });
      } else {
        Chambita.findByIdAndUpdate(id, { $pull: { likes: req.user._id } }).populate('user')
          .then(b => {
            anulMail(user, b)
            res.redirect('/chambitas')
          }).catch(e => {
            console.log(e)
          })
          .catch(e => {
            console.log(e);
          });
      }
    })
    .catch(e => {
      console.log(e);
    });
});

module.exports = router;
