const pool = require("../Utils/DbConfig");
// const SendEmail = require('./email')
module.exports = {

  //Adding log in database
  addLog: function (email, change_type, ip, message) {
    if (change_type == "login")
      this.isUnusualLogin(email, ip)            //checking user have previously logged in with this ip or not
    var time = new Date().toLocaleString();
    const sql = `INSERT INTO logs(email, change_type, ip, message,timestamp) VALUES (?,?,?,?,?)`;
    const bind = [email, change_type, ip, message,time];
    pool.query(sql, bind);
  }, 

  //For unusual login activity
  isUnusualLogin(email, ip) {
    const sql = `SELECT * FROM logs where email='${email}' AND change_type='login' AND ip ='${ip}'`;
    pool.query(sql, function (err, result, fields) {
      if (err) {
        console.log(err)
      } else {
        if (result.length == 0) {     //there is no previous record of login with this ip
          // console.log("unusual Login")
          // SendEmail.speciousLogin();
        }
        // else{
        //    console.log("usual Login")
        // }
      }
    })
  },
  getIP(){
    var ip = (
      req.headers["x-forwarded-for"] ||
      req.socket.remoteAddress ||
      null
    ).split(",")[0];  
  }
};