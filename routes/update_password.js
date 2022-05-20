var express = require('express');
var router = express.Router();
var updatePassDB = require('../db/loginDB')

router.post("/updatepassword",(req,res)=>{
    var user_id=req.body.id;
    var user_password=req.body.password;
    console.log(user_id);
    console.log(user_password);
    updatePassDB.update_password(user_id,user_password).then((data)=>{
        res.send(data);
        console.log(data);
    }).catch((error)=>{
        res.send(error);
    })
  });

  module.exports = router;