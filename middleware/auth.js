const { User } = require("../models/user");
const { Unauthorized } = require("http-errors");
const jwt = require("jsonwebtoken");

const auth = async (req, res, next) => {
  const { authorization = "" } = req.headers;
  const [bearer, token] = authorization.split(" ");
  try {
    if (bearer !== "Bearer") {
      throw new Unauthorized("Not authorized");
    }
    const { id } = jwt.verify(token, process.env.JWT_KEY);
    const user = await User.findById(id);
    if (!user || !user.token) {
      throw new Unauthorized("Not authorized");
    }

    req.user = user;
    next();
  } catch (error) {
    if (error.message === "invalid token") {
      error.status = 401;
    }
    next(error);
  }
};

// async function auth(req, res, next) {
//   const { authorization = "" } = req.headers;
//   const [bearer, token] = authorization.split(" ");

//   try {
//     if (bearer !== "Bearer") {
//       throw new Unauthorized("Not authorized");
//     }
//     const { id } = jwt.verify(token, process.env.JWT_KEY);
//   } catch (error) {
//     if ((error.message = "Invalid signature")) {
//       error.status = 401;
//     }
//     throw error;
//   }
// }

module.exports = { auth };

//   const { authorization = "" } = req.headers;
//          const [bearer, token] = authorization.split(" ");
// if (bearer !== "Bearer") {
//     throw new Unauthorized("Not authorized");
// }

//    try {
//              const { id } = jwt.verify(token, process.env.JWT_KEY);
//            } catch (error) {
//              if (error.message = "Invalid signature") {
//                error.status = 401;
//              }
//              throw error;
//            }
