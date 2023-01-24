// const { User } = require("../models/user");

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

module.exports = { getCurrent };
