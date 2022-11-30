const {User} = require("../../models/user")

const {RequestError, sendMail} = require("../../helpers")

const {BASE_URL} = process.env;

const resendEmail = async(req, res) => {
    const {email} = req.body;

    const user = await User.findOne({email});

    if(!user) {
        throw RequestError(404)
    }

    if(user.verify) {
        throw RequestError(400, "Email already verify")
    }

    const mail = {
        to: email,
        subject: "Подтверждение регистрации на сайте",
        html: `<a target="_blank" href="${BASE_URL}/api/auth/verify/${user.verificationToken}">Нажмите для подтверждения регистрации</a>`
    }

    await sendMail(mail);

    res.json({
        message: "Email resend sucess"
    })
}

module.exports = resendEmail;