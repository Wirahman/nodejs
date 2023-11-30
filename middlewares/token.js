const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config()

module.exports.createToken = async (data) => {
    return jwt.sign(data, process.env.JWT_SECRET, { expiresIn: '1h' });
}

module.exports.validateLogin = async (req, res, next) => {
    const authHeader = req.headers['x-token']
    if (authHeader == null) return res.status(401).json({
        status: false,
        data: [],
        message: "Token Not Found"
    })
    jwt.verify(authHeader, process.env.JWT_SECRET, (err, user) => {
        console.log(err);
        if (err) return res.status(401).json({
            status: false,
            data: [],
            message: "Token Expired"
        })
        req.user = user
        next()
    })
}