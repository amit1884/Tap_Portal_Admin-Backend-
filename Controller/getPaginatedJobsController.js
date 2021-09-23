const pool=require('../Utils/DbConfig')

module.exports.getPaginatedJobs = async (req,res)=>{

    let sql = `SELECT * FROM jobs ORDER BY createdAt DESC LIMIT 0,3`
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