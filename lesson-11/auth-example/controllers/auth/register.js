const bcrypt = require("bcryptjs");
const gravatar = require("gravatar")
const {nanoid} = require("nanoid")

const {User} = require("../../models/user")

const {RequestError, sendMail} = require("../../helpers")

const {BASE_URL} = process.env;

const register = async(req, res)=> {
    const {name, email, password} = req.body;

    const user = await User.findOne({email});
    if(user) {
        throw RequestError(409, "Email in use")
    }

    const hashPassword = await bcrypt.hash(password, 10)

    const avatarURL = gravatar.url(email)

    const verificationToken = nanoid()

    const newUser = await User.create({name, email, password: hashPassword, avatarURL, verificationToken});

    const mail = {
        to: email,
        subject: "Подтверждение регистрации на сайте",
        html: `<a target="_blank" href="${BASE_URL}/api/auth/verify/${verificationToken}">Нажмите для подтверждения регистрации</a>`
    }

    await sendMail(mail)

    res.status(201).json({
        name: newUser.name,
        email: newUser.email,
        verificationToken: newUser.verificationToken,
    })
}

module.exports = register;