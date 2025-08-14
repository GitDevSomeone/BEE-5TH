const jwt = require("jsonwebtoken");
const secret = process.env.JWT_SECRET || "THISISSCRET";



function generateToken(payload){
    console.log("secret" ,secret);
    const token = jwt.sign(payload,secret);
    return token;
}

function verifyToken(tokenString){
    const isValid = jwt.verify(tokenString,secret,(err,decoded)=>{
        console.log(err);
        console.log(decoded);
        if(!err)
        return decoded;
    });
    
    if(!isValid){
        return false;
    }
    return true;
}



module.exports = {generateToken,verifyToken};