const { verifyToken } = require('../utils/jwt');
const { db } = require('../models');

module.exports = async (req, res, next) => {
    try {
        const checkToken = req.headers.authorization;
        if (!checkToken) {
            return res.status(401).send({ message: 'Token not found!' });
        } else {
            let token = req.headers.authorization.split(' ')[1];
            const check = await db.userToken.findOne({ token: token });
            if (!check) {
                return res.status(401).send({ message: 'Invalid Token!' });
            } else {
                const decode = verifyToken(token);
                console.log(decode)
                const userDetails = await db.user.findById(decode.userId);
                if (userDetails) {
                    req.userData = { id: decode.userId, email: userDetails.email };
                    next();
                } else {
                    return res.status(401).send({ message: 'Unauthorized!' });
                }
            }
        }
    } catch (err) {
        console.error(err);
        return res.status(401).send({ message: 'Unauthorized!' });
    }
};
