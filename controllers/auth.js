const { User } = require("../models/user");
const { Conflict, Unauthorized } = require("http-errors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const gravatar = require("gravatar");
const { nanoid } = require("nanoid");
const sendEmail = require("../helpers/sendEmail");

async function register(req, res, next) {
  try {
    const { name, email, password } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      throw new Conflict(`User with ${email} already exist`);
    }
    const avatarURL = gravatar.url(email);
    const verificationToken = nanoid();

    const mail = {
      to: email,
      subject: "Verification email",
      html: `<a target="_blank" href="http://localhost:3000/api/users/verify/${verificationToken}">Hi ${name}.Follow this link, for verification </a>`,
    };
    await sendEmail(mail);

    const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
    // eslint-disable-next-line no-unused-vars
    const result = await User.create({
      name,
      email,
      password: hashPassword,
      avatarURL,
      verificationToken,
    });

    res.status(201).json({
      status: "Created",
      code: 201,
      data: {
        user: { email, name, avatarURL, verificationToken },
      },
    });
  } catch (error) {
    next(error);
  }
}

async function login(req, res, next) {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user || !user.verify || !user.comparePassword(password)) {
      throw new Unauthorized(`Email or password is wrong`);
    }
    const payload = {
      id: user._id,
    };
    const token = jwt.sign(payload, process.env.JWT_KEY, { expiresIn: "1h" });
    await User.findByIdAndUpdate(user._id, { token });

    res.json({
      status: "success",
      code: 200,
      data: {
        token,
      },
    });
  } catch (error) {
    next(error);
  }
}
async function logout(req, res, next) {
  try {
    console.log(1);
    const { _id } = req.user;
    await User.findByIdAndUpdate(_id, { token: null });
    res.status(204).json();
  } catch (error) {
    next(error);
  }
}

module.exports = { register, login, logout };
