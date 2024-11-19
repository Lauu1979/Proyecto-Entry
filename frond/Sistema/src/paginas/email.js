const nodeMailer = require("nodemailer");

const transporter = nodeMailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: "entrysolution1@gmail.com",
    pass: "xqaljvhrnljabmbp",
  },
});

let mail = {
  from: "entrysolution1@gmail.com",
  to: "lau123@",
  subject: "Hola",
  textFieldClasses: "Hola, beficil894",
  html: `
    <h5> Este mensaje fue envido desde nodemailer</h5>
    `,
};

transporter.sendMail(mail, (error, info) => {
  if (error) {
    console.log("error al enviar email: ", error);
  } else {
    console.log("Email enviado");
  }
});
// buzcar en esta pagina delfStack