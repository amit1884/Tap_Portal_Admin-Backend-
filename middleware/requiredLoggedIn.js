const jwt=require('jsonwebtoken')
const pool=require('../Utils/DbConfig')

module.exports=  (req,res,next)=>{
    const {authorization}=req.headers
    
    if(!authorization){
       return res.status(401).json({
           status:0,
           message:'Not Authorized'
       })
    }

    const token = authorization.replace("Bearer ","");
    
    jwt.verify(token,process.env.JWT_SECRET,(err,payload)=>{
        if(err)
        {
            return res.status(401).json({
                status:0,
                message:'Verification error'
            })
        }
        const {user}=payload;
        const sql=`SELECT email FROM admin WHERE email=?`
        pool.query(sql,[user],(err,result)=>{
            if(err)
            {
                return res.send({
                    status:0,
                    message:'No user found !'
                })
            }
            else{
                req.user=result
            }
        })
       
        next();
    })
}