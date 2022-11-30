const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

const {User} = require("../../models/user")

const {RequestError} = require("../../helpers")

const {SECRET_KEY} = process.env;

const login = async(req, res) => {
    const {email, password} = req.body;
    const user = await User.findOne({email});

    if(!user) {
        throw RequestError(401, "Invalid email or password"); // throw RequestError(401, "Invalid email");
    }

    if(!user.verify) {
        throw RequestError(401, "Email not verify");
    }

    const passwordCompare = await bcrypt.compare(password, user.password);
    if(!passwordCompare) {
        throw RequestError(401, "Invalid email or password"); // throw RequestError(401, "Invalid password");
    }

    const paylaod = {
        id: user._id,
    }

    const token = jwt.sign(paylaod, SECRET_KEY, {expiresIn: "23h"})
    await User.findByIdAndUpdate(user._id, {token})

    res.json({
        token,
    })
}

module.exports = login;