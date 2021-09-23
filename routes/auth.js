const express=require('express')
const { Login } = require('../Controller/loginController')
const router=express.Router()


router.post('/login',Login)


module.exports=router;