var express = require('express');
var router = express.Router();
var registerDB = require('../db/registerDB');
var loginDB = require('../db/loginDB');

router.post('/adduser', (req, res) => {
    var name = req.body.username;
    var pass = req.body.password;
    var student = {
        Student_code: req.body.username,
        Student_name: req.body.Student_name,
        Academy_name: req.body.Academy_name,
        Class_name: req.body.Class_name,
        Sex: req.body.Sex,
        Email: req.body.Email
    };
    console.log(name);
    console.log(pass);
    registerDB.select_name(name).then((data) => {
        if (data[0] != undefined) {
            res.send('-1');
        } else {
            registerDB.insert_user(name, pass).then((data) => {
                console.log(data);
                registerDB.insert_student(student).then((data) => {
                    console.log(data);
                    res.send(data);
                }).catch((error) => {
                    res.send(error);
                });
            }).catch((error) => {
                res.send(error);
            });
        }
    }).catch((error) => {
        res.send(error);
    })
}),
    router.post('/register_check_user_id', (req, res) => {
        var id = req.body.user_id
        // console.log(id);
        loginDB.select_name(id).then((data) => {
            if (data[0] == undefined) {
                console.log('不存在该用户.error');
                res.send('-1');
            } else if (data[0] != undefined) {
                //已存在用户ID
                res.send('1');
            }
        })
    }),
    router.post('/register_user', (req, res) => {
        let form = req.body;
        console.log(form);
        registerDB.register_user(form).then((data) => {
            // 注册成功
            res.send('1')
        }).catch(err => {
            console.error(err);
            res.send('-1');
        })
    }),
    router.post('/register_manager', (req, res) => {
        let form = req.body;
        console.log(form);
        registerDB.register_manager(form).then((data) => {
            // 注册成功
            res.send('1')
        }).catch(err => {
            console.error(err);
            res.send('-1');
        })
    }),
    module.exports = router;