var express = require('express');
var router = express.Router();
var loginDB = require('../db/loginDB');

// 查找用户名和密码
router.post('/selectUser', (req, res) => {
    console.log(new Date());
    // res.send(res.body);
    var id = req.body.id;
    var password = req.body.password;
    console.log('req.boy.id:', id);

    loginDB.select_name(id).then((data) => {
        // console.log('select_name->data[0]:',data[0]);
        if (data[0] == undefined) {
            console.log('不存在该用户.error');
            res.send('-1');
        } else if (data[0] != undefined) {
            //存在用户ID
            // console.log('存在用户ID', data[0]);
            // 如果存在用户ID，则判断密码是否正确
            if (data[0].user_password != password) {
                // 密码不正确
                console.log('error');
                res.send('0');
            } else {
                //密码正确，判断角色
                if (data[0].user_roles == 0) {
                    res.send('admin');
                    console.log('管理员登录');
                } else {
                    res.send('user');
                    console.log('普通用户登录');
                }
            }
        }


    }).catch((error) => {
        res.send(error);
    });
});

module.exports = router;