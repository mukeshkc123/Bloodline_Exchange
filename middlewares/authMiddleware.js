const JWT = require("jsonwebtoken");

module.exports = async(req,res,next) =>{
    try{
        
          const token = req.headers['authorization'].split(" ")[1];
          if (!token) {
            return res.status(401).send({
                success: false,
                message: "Authentication token missing!",
            });
        }
          JWT.verify(token,process.env.JWT_Secret,(err,decode)=>{
            if(err){
                return res.status(401).send({
                   success:false,
                   message:"Authetication failed!",
                })
            }else{
                req.body.userId = decode.userId;
                next();
            }
          })
    } catch(error){
           console.log(error);
           return res.status(401).send({
            success:false,
            error,
            mesage:"Authetication failed!"
           })
    }
}