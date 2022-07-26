const createError = require('./error')
const jwt = require('jsonwebtoken');

exports.verifyToken = (req, res, next) => {
    const token = req.cookies.jwt
    if(!token) return  next(createError.createError(401,"you are not authenticated"))
    const decode = jwt.verify(token,process.env.JWT_SECRET)
    req.user = decode
    next()

}
exports.verifyUser = (req, res, next) => {
    if (req.user.id === req.params.id || req.user.isAdmin) {
        next();
      } else {
        return next(createError.createError(403, "You are not authorized!"));
      }
}
exports.verifyAdmin = (req, res, next) => {
    if (req.user.isAdmin) {
        next();
      } else {
        return next(createError.createError(403, "You are not authorized!"));
      }
}