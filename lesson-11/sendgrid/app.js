const sgMail = require("@sendgrid/mail")
require("dotenv").config()

const {SENDGRID_API_KEY} = process.env;

sgMail.setApiKey(SENDGRID_API_KEY);

const mail = {
    to: "arestovich@gmail.com",
    from: "bogdan.lyamzin.d@gmail.com",
    subject: "Сколько это будет продолжаться???",
    html: "<p>2-3 недели</p>"
}

sgMail.send(mail)
    .then(()=> console.log("Mail send success"))
    .catch(error => console.log(error.message))