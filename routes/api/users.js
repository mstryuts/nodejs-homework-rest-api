const express = require("express");

const { getCurrent } = require("../../controllers/users");
const { auth } = require("../../middleware/auth");

const router = express.Router();

router.get("/current", auth, getCurrent);

module.exports = router;
