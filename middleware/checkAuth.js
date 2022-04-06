const JWT = require('jsonwebtoken')


module.exports = async (req,res,next)=>{
    const token = req.header('x-auth-token');
    if(!token){
        return res.status(400).json({
            errors: [
                {
                    "msg": "token is not found",
                }
            ]
        })
    }
    try {
       const user = await JWT.verify(token,'sdakjfsadfkdsjfl;dskfas;dskdflads') 
       console.log(user)
    } catch (error) {
        return res.status(400).json({
            errors: [
                {
                    "msg": "unvalid token"+error,
                }
            ]
        })
    }

    next()
 
}