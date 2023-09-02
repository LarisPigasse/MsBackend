import jwt from "jsonwebtoken";
import Account from '../models/Account.js';

const checkAuth = async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];

      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      //req.utente = await returnUtente(decoded.id);
      req.account = await Account.findOne({
        where: {
          id_account: decoded.id
        },
        attributes: { exclude: ['password'] }
      })

      req.account = req.account.dataValues;

      console.log(req.account)

      return next();
    } catch (error) {
      console.log(error);
      return res.status(404).json({ msg: "Ops!!! Error!" });
    }
  }

  if (!token) {
    const error = new Error("Token no válido");
    return res.status(401).json({ msg: error.message });
  }

  next();
};

export default checkAuth;
