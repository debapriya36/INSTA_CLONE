const jwt=require('jsonwebtoken');
const {jwt_secret_key}=require("../keys");
const mongoose=require('mongoose');
const USER=mongoose.model("USER");

module.exports = (req, res, next) => {
 
    const { authorization } = req.headers;
    if (!authorization) {
        return res.status(401).json({ error: "You must have logged in 1" })
    }
    const token = authorization.replace("Bearer ", "")
    jwt.verify(token, jwt_secret_key, (err, payload) => {
        if (err) {
            return res.status(401).json({ error: "You must have logged in 2" })
        }
        const { _id } = payload
        USER.findById(_id).then(userData => {
            req.user = userData
            next()
        })
    })

}


// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2M2YyN2E5OWRiZjg1MjNjNTg3MTc5YmIiLCJpYXQiOjE2NzY4MzYyMDN9.jmL5DXehR9T0ukiJTAYsbHKUnv0lYPIQXYOmrkeNUz4