import jwt from 'jsonwebtoken';
import User from '../models/users.js';
import * as dotenv from 'dotenv';
dotenv.config()

const authMiddleware = async (req, res, next) => {
  const authHeader = req.header('Authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }
  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log(decoded)
    if (!decoded.user || !decoded.user.idusers) {
      return res.status(401).json({ msg: 'The data inside the token doesnt correspond to the user' });
    }
    const user = await User.findById(decoded.user.idusers);
    if (!user) {
      return res.status(401).json({ msg: 'Invalid token, authorization denied' });
    }
    req.user = user;
    next();
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

export default authMiddleware;