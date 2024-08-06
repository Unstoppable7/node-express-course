const jwt = require("jsonwebtoken");
const { UnautheticatedError } = require("../errors");

const authenticationMiddleware = async (req, res, next) => {
   const authHeader = req.header("Authorization");

   if (!authHeader || !authHeader.startsWith("Bearer ")) {
      throw new UnautheticatedError("Unauthorized");
   }

   const token = authHeader.split(" ")[1];
   jwt.verify(token, process.env.JWT_SECRET, function (err, decoded) {
      if (err) {
         console.log(err);
         throw new UnautheticatedError("Unauthorized");
      }
      const { name } = decoded;
      req.user = name;
      next();
   });
};

module.exports = { authenticationMiddleware };
