const hashPassword = require('../service/hashPassword')
const bcrypt = require('bcrypt')
const tokenService = require('../middlewares/token')

module.exports.auth = async (req, res, next) => {
    try {
        const token = await tokenService.createToken({ username: req.headers['x-username'], password:req.headers['x-password'] })
        return res.status(200).json({
            response: {
                token
            },
            metadata: {
                message:"ok",
                status:200
            }
        })
    } catch (error) {
        return next(error)
    }
}