require("dotenv").config();
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: "navarrohouston@gmail.com",
    pass: process.env.MAILPASS
  }
});

exports.welcomeMail = (username, email) => {
  transporter
    .sendMail({
      from: "uber chambitas",
      to: email,
      subject: "Welcome",
      html: `
      <h2>bienvenido ${username} a uber chambitas. La mejor bolsa de trabajo que comunica cifras del mercado laboral gráficamente.</h2>
    `
    })
    .then(info => {
      console.log(info);
    })
    .catch(error => {
      console.log(error);
      throw error;
    });
};

exports.postMail = (user, cha) => {
  transporter
    .sendMail({
      from: "uber chambitas",
      to: cha.user.email,
      subject: "Alguien quiere tu chambita",
      html: `
      <h2>Hola! este ${user} se postulo para la chambita ${cha.text}</h2>
    `
    })
    .then(info => {
      console.log(info);
    })
    .catch(error => {
      console.log(error);
      throw error;
    });
};

exports.anulMail = (user, b) => {
  transporter
    .sendMail({
      from: "uber chambitas",
      to: b.user.email,
      subject: "Ya no quieren tu chambita",
      html: `
      <h2>Hola! este ${user} dice que tu chambita esta pirata</h2>
    `
    })
    .then(info => {
      console.log(info);
    })
    .catch(error => {
      console.log(error);
      throw error;
    });
};
