const jwt = require("jsonwebtoken");
const { BadRequestError, UnautheticatedError } = require("../errors");

const logon = async (req, res) => {
   const { name, password } = req.body;

   if (!name || !password) {
      throw new BadRequestError("Please provide email and password");
   }

   jwt.sign(
      { name },
      process.env.JWT_SECRET,
      {
         expiresIn: "24h",
      },
      function (err, token) {
         if (err) {
            console.log(err);
            throw new UnautheticatedError("Unauthorized");
         }
         res.status(200).json({ token: token });
      }
   );
};

const hello = async (req, res) => {
   res.status(200).json({ message: `Hello ${req.user}` });
};

module.exports = {
   logon,
   hello,
};
