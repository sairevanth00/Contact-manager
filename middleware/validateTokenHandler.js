const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken')

const validateToken = asyncHandler(async (req, res, next) => {
    let token;
    let authHeader = req.headers.Authorization || req.headers.authorization
    console.log("authHeader: ", authHeader)
    if(authHeader && authHeader.startsWith('Bearer')) {
        token = authHeader.split(' ')[1];
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
            if(err) {
                res.status(401)
                throw new Error("User is not authorized or token expired")
            }
            req.user = decoded.user
            console.log('User Data: ', decoded.user)
            next();
        });
        if(!token) {
            res.status(401)
            throw new Error("User is not authorized or token is missing")
        }
    } else {
        res.status(401);
        throw new Error("User is not authorized or token expired");
    }
})

module.exports = validateToken;