// var loginDB = require('../db/pool');
// var router = express.Router();

// function select_name(user_id) {
//     var sql = 'select * from user_info where user_id ="' + user_id + '" ';
//     return pool.execute(sql);
// }
// // 按照ID查找对应的密码
// function select_password(user_id) {
//     var sql = 'select user_password from user where user_id ="' + user_id + '" ';
//     return pool.execute(sql);
// }

// router.post('selectUser', (req, res) => {
//     var id = req.body.id;
//     var password = req.body.password;
//     loginDB.select_name(id).then((data) => { console.log(data); })

// })

const mysql = require('mysql');
var express = require('express');
var router = express.Router();
var app = new express()

const connection = mysql.createConnection({
    host: 'localhost',	//连接的数据库地址。（默认:localhost）
    user: 'root',		//mysql的连接用户名
    password: 'root',		// 对应用户的密码
    database: 'library'  		//所需要连接的数据库的名称（可选）
});

connection.connect();
// var result;
var loginForm = {
    id: '001',
    password: 'admin'
}

// connection.query(`SELECT * FROM user_info;`, function (error, results, fields) {
//     if (error) throw error;
//     result = results;
//     console.log(result)
// });


var rusult = '';
app.get('/', function (req, res) {
    console.log('/');
    connection.query(`SELECT * FROM user_info;`, function (error, results, fields) {
        if (error) throw error;
        result = results;
        console.log(result)
    });
    res.send(result)
    connection.end();
})

router.post('/selectUser', (req, res) => {
    console.log('/selectUser');
    console.log(req.body);
})

app.listen(8000, () => {
    console.log('http://127.0.0.1:8000/');
})