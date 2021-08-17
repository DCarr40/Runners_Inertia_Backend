const jwt = require('jsonwebtoken');
const config = require("config");

const auth = (req,res, next) => {
    const token = req.headers.get('x-auth-token');
    if (!token) return res.status(401).send("Access denied. No token provided");

    try {
        const decoded = jwt.verify(token, config.get('jwtSecret'));
        req.runner = decoded;
    } catch (error) {
        return res.status(400).send('Invalid token')
    }
}