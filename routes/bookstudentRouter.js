var express = require('express');
var router = express.Router();
var BookStudentDB = require('../db/bookstudentDB');

// 查询所有还书记录
router.get('/findAllRestore', (req, res) => {
    BookStudentDB.findAllRestore().then((data) => {
        console.log('bookStudentRouter.js findAllRestore line8 -> /findALl -> data:', data);
        res.send(data);
    }).catch((error) => {
        res.send(error);
    });
});

// 模糊查询学生还书记录(学号)
router.get('/queryStudentRestore', (req, res) => {
    BookStudentDB.queryStudentRestore(req.query.keys).then((data) => {
        res.send(data);
    }).catch((error) => {
        res.send(error);
    });
});

// 学生查询还书记录(学号)
router.get('/studentQueryRestore', (req, res) => {
    BookStudentDB.studentQueryRestore(req.query.keys).then((data) => {
        res.send(data);
    }).catch((error) => {
        res.send(error);
    });
});

//查询所有借书记录
router.get('/findAll', (req, res) => {
    BookStudentDB.findAll().then((data) => {
        console.log('bookStudentRouter.js line19 -> /findALl -> data:', data);
        res.send(data);
    }).catch((error) => {
        res.send(error);
    });
});
// 学生查询借阅记录
router.get('/studentRecord', (req, res) => {
    BookStudentDB.findRecords(req.query.id).then((data) => {
        // console.log('bookStudentRouter.js -> /studentRecord line36:', data);
        res.send(data);
    }).catch((error) => {
        res.send(error);
    });
});
// 模糊查询(书名)
router.get('/queryBook', (req, res) => {
    BookStudentDB.queryBook(req.query.keys).then((data) => {
        console.log(data);
        res.send(data);
    }).catch((error) => {
        res.send(error);
    });
});
// 模糊查询(学号)
router.get('/queryStudent', (req, res) => {
    BookStudentDB.queryStudent(req.query.keys).then((data) => {
        res.send(data);
    }).catch((error) => {
        res.send(error);
    });
});
// 管理员增加借还书记录
router.post('/save', (req, res) => {
    let bookstudent = {
        Id: null,
        Book_num: req.body.Book_num,
        Student_code: req.body.Student_code,
        borrow_date: req.body.borrow_date.slice(0, 10),
        return_date: req.body.return_date.slice(0, 10)
    };
    BookStudentDB.save(bookstudent).then((data) => {
        res.send(data);
    }).catch((error) => {
        console.log(error);
        res.send(error);
    });
});
// 管理员删除借还书记录
router.post('/deleterecord', (req, res) => {
    var id = req.body.id;
    console.log('ID=' + id);
    BookStudentDB.deleteRecord(id).then((data) => {
        console.log(data);
        res.send(data);
    }).catch((error) => {
        console.log(error);
        res.send(error);
    });
});
// 学生增加借还书记录
router.post('/addrecord', (req, res) => {
    let bookstudent = {
        borrow_id: null,
        id: req.body.id,
        user_id: req.body.user_id,
        borrow_time: req.body.borrow_time,
        restore_time: req.body.restore_time
    };
    BookStudentDB.save1(bookstudent).then((data) => {
        res.send(data);
    }).catch((error) => {
        console.log(error);
        res.send(error);
    });
});
// 管理员修改借还书记录
router.post('/update', (req, res) => {
    let bookstudent = {
        Id: req.body.Id,
        return_date: req.body.return_date.slice(0, 10)
    };
    console.log(bookstudent);
    BookStudentDB.update(bookstudent).then((data) => {
        res.send(data);
    }).catch((error) => {
        console.log(error);
        res.send(error);
    });
});
// 学生归还图书
router.post('/returnbook', (req, res) => {
    let form = {
        user_id: req.body.user_id,
        id: req.body.id,
        borrow_id: req.body.borrow_id,
        restore_realTime: req.body.restore_realTime,
        pass_day: req.body.pass_day,
        restore_time: req.body.restore_time,
        borrow_time: req.body.borrow_time
    }
    // console.log(
    //     "学号" + user_id,
    //     "数据编号" + book_id,
    //     "借书编号" + borrow_id
    // )
    BookStudentDB.returnBook(form).then((data) => {
        console.log('bookStudentRouter.js -> /returnBook line131:', data);
        res.send(data);
    }).catch((error) => {
        console.log(error);
        res.send(error);
    });
});

module.exports = router;