const express=require('express')
const cors = require("cors");
const bodyparser=require('body-parser')
var { getIP }=require('./Utils/getIp');
// const pool = require('./Utils/DbConfig');
// const requiredLoggedIn = require('./middleware/requiredLoggedIn');

const PORT=process.env.PORT||5000
require("dotenv/config");

const app=express()

app.use(bodyparser.urlencoded({extended:true}));
app.use(express.json());
app.use(cors());
app.use(getIP);
app.use(require('./routes/auth'))
app.use(require('./routes/jobs'))
app.get('/',(req,res)=>{

    console.log(req.ip_address)
    res.send({
        message:'Welcome to Admin Tap Portal',
        ip:req.ip_address
    })

})

// app.get('/check',requiredLoggedIn,  async (req,res)=>{

//     let sql=`SELECT * FROM admin`
//     let [result]=await pool.query(sql)
//     console.log(result)
//     console.log(req.user)
//     res.send(result)
// })

app.listen(PORT,(err)=>{

    if(err){
        console.log(err)
    }
    else
    console.log('PORT Running on:'+PORT)
}
)