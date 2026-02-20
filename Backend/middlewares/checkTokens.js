import jwt from 'jsonwebtoken';
import cookieParser from 'cookie-parser';
import Users from '../models/users.js';



//1: for checking tokens...
const TokenAuth = async (req, res, next) => {
  const token = req.cookies?.tokens;
  console.log(token)

  try {
    if (!token) {
      return res.status(401).json({ msg: "Token is not found" });
    }

    const decodeToken = jwt.verify(token, process.env.TOKEN_KEY);
    console.log(decodeToken);

    //attaching user details with req...
    req.user = await Users.findById(decodeToken.id).select('-password');

    console.log(req.user)

    next(); //move to the next code...
  }

  catch (error) {
    console.log(error.message)
    return res.status(401).json(error.message);
  }
}

export default TokenAuth