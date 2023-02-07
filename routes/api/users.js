const express = require("express");

const { getCurrent, updateAvatar } = require("../../controllers/users");
const { auth } = require("../../middleware/auth");
const { upload } = require("../../middleware/upload");
const tryCatchWrapper = require("../../middleware/tryCatchWrapper");

const router = express.Router();

router.get("/current", auth, getCurrent);
router.patch(
  "/avatars",
  auth,
  upload.single("avatar"),
  tryCatchWrapper(updateAvatar)
);

module.exports = router;
