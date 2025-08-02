// const protectRoute = (req, res, next)=>{

// }

module.exports.protectRoute = (req, res, next)=>{
    if(req.session.isLoggedIn == true){
        next();
    }else{
        res.redirect('/login')
    }
}
