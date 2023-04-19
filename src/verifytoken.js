import { verify } from 'jwt';

 modules.export = (req,res,next)=>{
    const token = req.header('Authorization');
    if(!token){
        res.status(401).json({
            "message": "Unauthorized Acess",
        })
    }
    try{
        const jwtToken = token.split("")[1]
        const verified = verify(jwtToken, 'thisididfsfffsjnqskey')
        res.user =  verified
        next()
    }
        
    catch(err){
        res.status(400).json({
            "message":"Invalid token"
        })
    }}
