const { NODE_ENV } = process.env;
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config');
const { UnauthorizedError } = require('../utils/errors');

module.exports = (req, res, next) => {
  let token = '';
  // Хочу чуть позже реализовать передачу токена в куках, по этой причине пока оставлю код
  // if (req.cookies.jwt !== undefined) {
  //   token = req.cookies.jwt;
  // } else {
  //   const { authorization } = req.headers;

  //   if (!authorization || !authorization.startsWith('Bearer ')) {
  //     return next(new UnauthorizedError('authorization required'));
  //   }
  //   token = authorization.replace('Bearer ', '');
  // }
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return next(new UnauthorizedError('authorization required'));
  }
  token = authorization.replace('Bearer ', '');

  let payload;

  try {
    payload = jwt.verify(
      token,
      NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
    );
  } catch (err) {
    return next(new UnauthorizedError('authorization required'));
  }

  req.user = payload;
  return next();
};
