const { log } = require('console');
var express = require('express');
var router = express.Router();
// formidable模块实现了上传和编码图片和视频
var formidable = require('formidable');
// 文件系统模块
var fs = require('fs');
var path = require('path');
const xlsx = require('node-xlsx')
var AVATAR_UPLOAD_FOLDER = '/front/static/images/book/';
var bookDB = require('../db/bookDB');
var pathName = '';
// 导出excel
// var writeXls = function (datas) {
//   console.log('执行导出excel');
//   let buffer = xlsx.build([
//     {
//       name: 'sheet1',
//       data: datas
//     }
//   ]);
//   fs.writeFileSync('../excel/book_info.xlsx', buffer, { 'flag': 'w' }, function (err) { console.error(err); });//生成excel the_content是excel的名字，大家可以随意命名
//   console.log('导出excel成功');
// }


// 查询所有书籍
router.get('/findAll', (req, res) => {
  bookDB.findAll().then((data) => {
    res.send(data);
  }).catch((error) => {
    res.send(error);
  });
});
// 导出excel
router.get('/exportExcel', (req, res) => {
  bookDB.findAll().then((rows) => {
    // console.log(rows);
    //rows是个从数据库里面读出来的数组，大家就把他当成一个普通的数组就ok
    let data = [] // 其实最后就是把这个数组写入excel   
    let title = ['图书ID', '图书名称', '图书作者', 'ISBN', '出版社', '入库时间', '价格', '分类', '书架号', '图书数量', '图书简介']//这是第一行 俗称列名 
    data.push(title) // 添加完列名 下面就是添加真正的内容了
    rows.forEach((element) => {
      let arrInner = []
      arrInner.push(element.id)
      arrInner.push(element.name)
      arrInner.push(element.author)
      arrInner.push(element.ISBN)
      arrInner.push(element.publisher)
      arrInner.push(element.timeIn)
      arrInner.push(element.price)
      arrInner.push(element.category)
      arrInner.push(element.shelf)
      arrInner.push(element.total_num)
      arrInner.push(element.message)
      data.push(arrInner)
    });
    let writeXls = function (data) {
      var buffer = xlsx.build([{ name: 'book_info', data: data }]); // Returns a
      fs.writeFileSync('./excel/book_info.xlsx', buffer, 'binary', { 'flag': 'w' }, function (err) { console.error(err); });//生成excel the_content是excel的名字，大家可以随意命名
      res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8');
      res.end(buffer.toString('base64'));

    }
    writeXls(data);

  }).catch((error) => {
    res.send(error);
  });

});

// 模糊查询（通过书名或作者查找）
router.get('/query', (req, res) => {
  // console.log('bookRouter - line22 query',req.query);
  let params = req.query;
  // console.log('bookRouter - line24 query',params);
  bookDB.query(params).then((data) => {
    console.log('bookRouter - line27 query', data);
    res.send(data);
  }).catch((error) => {
    res.send(error);
  });
});
// 通过id删除多本书籍
router.post('/batchDelete', (req, res) => {
  var ids = req.body.ids;
  bookDB.batchDelete(ids).then((data) => {
    res.send(data);
  }).catch((error) => {
    res.send(error);
  });
});
// 上传图片
router.post('/uploadImg', function (req, res) {
  var form = new formidable.IncomingForm();
  form.encoding = 'utf-8';        //设置编辑
  form.uploadDir = '../' + AVATAR_UPLOAD_FOLDER;     //设置上传目录
  form.keepExtensions = true;     //保留后缀
  form.maxFieldsSize = 2 * 1024 * 1024;   //文件大小
  form.parse(req, function (err, fields, files) {  //parse方法解析request请求中包含的form表单提交的数据
    if (err) {
      res.locals.error = err;
      res.render('index', { title: TITLE });
      return;
    }
    var extName = '';  //后缀名
    switch (files.fulAvatar.type) {
      case 'image/pjpeg':
        extName = 'jpg';
        break;
      case 'image/jpeg':
        extName = 'jpg';
        break;
      case 'image/png':
        extName = 'png';
        break;
      case 'image/x-png':
        extName = 'png';
        break;
    }
    if (extName.length == 0) {
      res.locals.error = '只支持png和jpg格式图片';
      res.render('index', { title: TITLE });
      return;
    }
    console.log(extName);
    // 以时间戳命名图片
    pathName = new Date().getTime() + '.' + extName;
    // 图片写入地址；
    var newPath = form.uploadDir + pathName;
    console.log(newPath);
    // 重命名路径
    fs.renameSync(files.fulAvatar.path, newPath);
  });
});

// 添加书籍
router.post("/save", (req, res) => {
  console.log('图片' + pathName)
  var add = {
    // Book_num: req.body.Book_num,
    // imgPath: '../../../static/images/book/'+pathName,
    // Book_name: req.body.Book_name,
    // Writer: req.body.Writer,
    // Sort_name: req.body.Sort_name,
    // Price: req.body.Price,
    // Pub_company: req.body.Pub_company,
    // Pub_date: req.body.Pub_date.slice(0,10),
    // Total_num: req.body.Total_num,
    // Current_num: req.body.Current_num,
    // Buy_date: req.body.Buy_date.slice(0,10),
    // Brief: req.body.Brief
    // id: req.body.id,
    name: req.body.name,
    author: req.body.author,
    ISBN: req.body.ISBN,
    publisher: req.body.publisher,
    timeIn: req.body.timeIn,
    price: req.body.price,
    message: req.body.message,
    category: req.body.category,
    shelf: req.body.shelf,
    cur_num: req.body.cur_num,
    total_num: req.body.total_num
  }
  bookDB.save(add).then((data) => {
    res.send(data);
  }).catch((error) => {
    res.send(error);
  });
});
// 修改书籍
router.post("/update", (req, res) => {
  var update = {
    // Book_num: req.body.Book_num,
    // imgPath: '../../../static/images/book/'+pathName,
    // Book_name: req.body.Book_name,
    // Writer: req.body.Writer,
    // Sort_name: req.body.Sort_name,
    // Price: req.body.Price,
    // Pub_company: req.body.Pub_company,
    // Pub_date: req.body.Pub_date.slice(0,10),
    // Total_num: req.body.Total_num,
    // Current_num: req.body.Current_num,
    // Buy_date: req.body.Buy_date.slice(0,10),
    // Brief: req.body.Brief
    id: req.body.id,
    name: req.body.name,
    author: req.body.author,
    ISBN: req.body.ISBN,
    publisher: req.body.publisher,
    timeIn: req.body.timeIn,
    price: req.body.price,
    message: req.body.message,
    category: req.body.category,
    shelf: req.body.shelf,
    cur_num: req.body.cur_num,
    total_num: req.body.total_num
  }
  bookDB.update(update).then((data) => {
    res.send(data);
  }).catch((error) => {
    res.send(error);
  });
});
// 当前书籍数量加一
router.post('/updatenumadd', (req, res) => {
  console.log("当前id", req.body);
  var id = req.body.id;
  bookDB.updatenumadd(id).then((data) => {
    res.send(data);
  }).catch((error) => {
    res.send(error);
  });
});
// 当前书籍数量减一
router.post('/updatenum', (req, res) => {
  console.log("当前id", req.body);
  var id = req.body.id;
  bookDB.updatenum(id).then((data) => {
    res.send(data);
  }).catch((error) => {
    res.send(error);
  });
});

module.exports = router;