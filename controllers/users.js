const { User } = require("../models/user");
const path = require("path");
const fs = require("fs/promises");
const Jimp = require("jimp");

async function getCurrent(req, res, next) {
  const { name, email } = req.user;
  res.json({
    status: "succes",
    code: 200,
    data: {
      user: {
        name,
        email,
      },
    },
  });
}
const avatarsDir = path.join(__dirname, "../", "public", "avatars");

const updateAvatar = async (req, res) => {
  const { path: tempUpload, originalname } = req.file;
  const { _id: id } = req.user;
  const imageName = `${id}_${originalname}`;
  try {
    const resultUpload = path.join(avatarsDir, imageName);
    await fs.rename(tempUpload, resultUpload);
    const rawAvatarURL = path.join("public", "avatars", imageName);
    const resizeImage = Jimp.read(rawAvatarURL);

    (await resizeImage)
      .resize(250, 250)
      .write(`public/avatars/250-${imageName}`);

    const avatarURL = `public/avatars/250-${imageName}`;
    await User.findByIdAndUpdate(req.user._id, {
      avatarURL,
    });
    res.json({ avatarURL });
    await fs.unlink(rawAvatarURL);
  } catch (error) {
    await fs.unlink(tempUpload);
    throw error;
  }
};

module.exports = { getCurrent, updateAvatar };
