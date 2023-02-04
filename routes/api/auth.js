const express = require("express");
const { register, login, logout } = require("../../controllers/auth");
const { joiRegisterSchema, joiLoginSchema } = require("../../models/user");
const { auth } = require("../../middleware/auth");

const { validateBody } = require("../../middleware/index");

const router = express.Router();

router.post("/register", validateBody(joiRegisterSchema), register);
router.post("/login", validateBody(joiLoginSchema), login);
router.get("/logout", auth, logout);

module.exports = router;
// 1
