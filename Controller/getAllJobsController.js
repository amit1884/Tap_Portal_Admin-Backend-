const pool=require('../Utils/DbConfig')

module.exports.getAllJobs = async (req,res)=>{

    let sql = `SELECT * FROM jobs ORDER BY createdAt`
    await pool.query(sql,(err,data)=>{

        if(err){
            console.log(err)
            return res.send({
                status:0,
                message:'No data found !'
            })
        }
        else{
            return res.send({
                status:1,
                data:data,
            })
        }
    });
    
}