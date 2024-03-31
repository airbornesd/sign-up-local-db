import jwt from 'jsonwebtoken';
const jwtSecret = process.env.JWT_SECRET_KEY;

export const sendResponse = (
  res,
  statusCode,
  message,
  data = null,
  errors = null
) => {
  return res.status(statusCode).json({
    status: statusCode,
    message: message,
    data,
    errors,
  });
};

export const generateJwt = (user) => {
  const payload = user;
  const options = { expiresIn: '1h' };
  const token = jwt.sign(payload, jwtSecret, options);
  return token;
};

export const verifyJwt = (token) => {
  const decoded = jwt.verify(token, jwtSecret);
  return decoded;
};
