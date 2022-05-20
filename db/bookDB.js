var pool = require('./pool');

module.exports = {
  //查找所有书籍信息
  findAll() {
    // var sql = "select * from t_book";
    var sql = "select * from book_info";
    return pool.execute(sql);
  },
  //模糊查询
  query(params) {
    // var sql = "select * from book_info where name like '%" + keys + "%' or author like '%" + keys + "%' or ISBN = '" + keys + "'";
    var sql = `select * from book_info where ${params.condition} like '%${params.keys}%'`;
    // var sql = "select * from t_book where Book_name like '%" + keys + "%' or Writer like '%" + keys + "%'";
    // console.log(sql);
    return pool.execute(sql);
  },
  //删除多个书籍
  batchDelete(ids) {
    var sql = "delete from book_info where id ='" + ids + "'";
    return pool.execute(sql);
  },
  //添加书籍信息
  save(book) {
    // var sql = "insert into book_info values(null,'" + book.imgPath + "','"
    //   + book.Book_name + "','"
    //   + book.Writer + "','"
    //   + book.Sort_name + "','"
    //   + book.Price + "','"
    //   + book.Pub_company + "','"
    //   + book.Pub_date + "','"
    //   + book.Total_num + "','"
    //   + book.Current_num + "','"
    //   + book.Buy_date + "','"
    //   + book.Brief + "')";
    var sql = "insert into book_info values(null,'"
      + book.name + "','"
      + book.author + "','"
      + book.ISBN + "','"
      + book.price + "','"
      + book.publisher + "','"
      + book.timeIn + "','"
      + book.total_num + "','"
      + book.cur_num + "','"
      + book.price + "','"
      + book.message + "','"
      + book.category + "','"
      + book.shelf + "')";
    console.log(sql);
    return pool.execute(sql);
  },
  //修改书籍信息
  update(book) {
    // var sql = "update t_book set imgPath= '"
    //   + book.imgPath + "', Book_name = '"
    //   + book.Book_name + "',Writer = '"
    //   + book.Writer + "',Sort_name = '"
    //   + book.Sort_name + "',Price='"
    //   + book.Price + "',Pub_company='"
    //   + book.Pub_company + "',Pub_date='"
    //   + book.Pub_date + "',Total_num='"
    //   + book.Total_num + "',Current_num='"
    //   + book.Current_num + "',Buy_date='"
    //   + book.Buy_date + "',Brief='"
    //   + book.Brief + "' where Book_num ="
    //   + book.Book_num;
    var sql = "update book_info set name = '"
      + book.name + "',author = '"
      + book.author + "',ISBN = '"
      + book.ISBN + "',price='"
      + book.price + "',publisher='"
      + book.publisher + "',timeIn='"
      + book.timeIn + "',total_num='"
      + book.total_num + "',cur_num='"
      + book.cur_num + "',category='"
      + book.category + "',message='"
      + book.message + "',shelf='"
      + book.shelf + "' where id ="
      + book.id;
    console.log(sql);
    return pool.execute(sql);
  },
  //修改书籍的当前数量,借书-1
  updatenum(id) {
    var sql = "update book_info set cur_num=cur_num-1 , borrow_num = borrow_num+1 where id=" + id;
    return pool.execute(sql);
  },
  //修改书籍的当前数量,还书+1
  updatenumadd(id) {
    var sql = "update book_info set cur_num=cur_num+1,borrow_num = borrow_num-1 where id=" + id;
    return pool.execute(sql);
  },

} 