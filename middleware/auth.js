const jwt = require("jsonwebtoken")

const SECRET = "Aman";
const verifyjwt = (req, res, next) => {
    const { authorization } = req.headers;
    if (authorization) {
        const token = authorization.split(" ")[1];
        if (token) {
            jwt.verify(token, SECRET, (err, user) => {
                if (err) {
                    return res.json({ message: err })
                } else {
                    req.user = user;
                    next();
                }
            })
        }
    }
}

module.exports = {
    verifyjwt
}