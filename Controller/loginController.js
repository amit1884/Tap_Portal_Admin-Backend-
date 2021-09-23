const pool=require('../Utils/DbConfig')
const bcrypt=require('bcryptjs');
const jwt =require('jsonwebtoken');
var log = require("../Utils/logs"); 
const { v4: uuidv4 } = require("uuid");
module.exports.Login = async (req, res) => {
    try {
      let email = req.body.email;
      let password = req.body.password;
      let device = req.body.device;
      // console.log(email,password,device)
      if (!email || !password || !device) {
        res.status(401).json({
          message: "Missing parameter.",
          status: 0,
        });
      } else {
        let sql = `SELECT * from admin where email = ?`;
        const [userInfo] = await pool.query(sql, [email]);
        if (!userInfo) {
          res.status(200).json({
            message: "Bad Credentials",
            status: 0,
          });
        } else {
          const ip = req.ip_address;
          let check = await bcrypt.compare(password, userInfo.password);
          console.log(check)
          if (check) {
            var session_id = uuidv4();
            let session_sql = `INSERT INTO login_session(session_id, email, device,ip) VALUES (?,?,?,?)`;
            pool.query(session_sql, [session_id, email, device, ip]);
            log.addLog(email, "login", ip, `Admin Login Successful `);
            let accessToken = jwt.sign(
              {
                user: email,
                groupName: "admin",
                session_id: session_id,
              },
              process.env.JWT_SECRET
            );
            res.status(200).json({
              status: 1,
              accessToken,
            });
          } else {
            log.addLog(email, "login", ip, `Failed login`);
            res.status(401).json({
              message: "Bad Credentials",
              status: 0,
            });
          }
        }
      }
    } catch (err) {
      res.status(500).json({
        message: "Internal Server Error " + err,
        status: 0,
      });
    }
  };