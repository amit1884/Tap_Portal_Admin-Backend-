const pool=require('../Utils/DbConfig')

module.exports.addJobController = async (req,res)=>{

    console.log('Aaayaa...')
    /*
    {
        "company_name":"Amazon",
        "position":"Software Development Engineer",
        "eligible_branch":"['CSE','ECE','EE']",
        "eligible_batch":"['2024']",
        "tenth_grade":"70",
        "twelfth_grade":"70",
        "cgpa":"8",
        "ppt_date":"21-08-2021",
        "test_date":"22-08-2021",
        "interview_from":"23-08-2021",
        "interview_to":"24-08-2021",
        "job_desc":"Role for SDE 1 (6 months intern+ FTE)",
       "job_desc_file":"/src/assets/file.pdf",
        "deadline":"19-08-2021::23:00:00"
    }

*/
    try{

        const company_name=req.body.company_name
        const position=req.body.position
        const ctc=req.body.ctc
        const breakdown=req.body.breakdown
        const eligible_branch=req.body.eligible_branch
        const eligible_batch=req.body.eligible_batch
        const tenth=req.body.tenth_grade
        const twelfth=req.body.twelfth_grade
        const cgpa=req.body.cgpa
        const ppt_date=req.body.ppt_date
        const test_date=req.body.test_date
        const interview_from=req.body.interview_from
        const interview_to=req.body.interview_to
        const job_desc=req.body.job_desc
        const job_desc_file=req.body.job_desc_file
        const deadline=req.body.deadline
     
        if(!company_name || !position || !ctc || !breakdown || !eligible_branch || !eligible_batch || !tenth || !twelfth || !cgpa || !ppt_date || !test_date || !interview_from || !interview_to || !job_desc || !job_desc_file || !deadline )
        {
                return res.send({
                status:0,
                message:'All fields are required !!'
            });
        }

        const sql_statement=`INSERT INTO jobs(company_name,position,ctc,breakdown,eligible_branch,eligible_batch,tenth_grade,twelfth_grade,cgpa,ppt_date,test_date,interview_from,interview_to,job_desc,job_desc_file,deadline) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`;
        await pool.query(sql_statement,[company_name,position,ctc,breakdown,eligible_branch,eligible_batch,tenth,twelfth,cgpa,ppt_date,test_date,interview_from,interview_to,job_desc,job_desc_file,deadline],(err,result)=>{

            console.log(result);
            if(err)
            {
                console.log(err)
                return res.send({
                    message:'error',
                    status:0
                });
            }
            else
            return res.send({
                message:'success',
                data:result.insertId,
                status:1
            });           
        });
       
    }
    catch(err){

        console.log(err)
        return res.status(500).json({
            message: "Internal Server Error " + err,
            status: 0,
          });
    }
}