const jwt = require('jsonwebtoken')
const models = require('./models')
require("dotenv").config();


function authenticate(req, res, next) {
    let headers = req.headers["authorization"]
    if(headers){
        const token = headers.split('')[1];
        const decoded = jwt.verify(token, process.env.JWT_KEY);
        if(decoded){
            const id = decoded.id;

            models.User.findbyPk(id, (error, user) => {
                if(user){
                    next();
                } else {
                    res.json({ error: "Unable to authenticate" });
                }
            })
        } else {
            res.json({ error: "Unable to authenticate" });
        }
    } else {
        res.json({error: 'Required headers are missing...'})
    }
}

module.exports = authenticate;
