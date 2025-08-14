const { verifyToken } = require("../utils/token");
const jwt = require("jsonwebtoken");

function protectRoute(req,res,next){
    const isValid = verifyToken(req.cookies.token);
    if(!isValid){
        res.redirect('/');
        return;
    }
    next();
}
function onlyAdmin(req,res,next){
    jwt.verify(req.cookies.token,"THISISSCRET",(err,decode)=>{
        if(err){
            res.redirect('/');
            return ;
        }
        if(decode.role != "admin"){
            res.redirect("/user/home");
            return false;
        }
        next();
    })
}
module.exports = {protectRoute,onlyAdmin};