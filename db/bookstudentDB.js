var pool = require('./pool');

module.exports = {
  // 管理员-查询所有归还记录
  findAllRestore() {
    // var sql="select tb.Book_name,ts.Student_name,tbs.Id,tbs.Student_code,tbs.Book_num,tbs.borrow_date,tbs.return_date from t_book as tb,t_student as ts,t_book_student as tbs where tb.Book_num=tbs.Book_num and ts.Student_code=tbs.Student_code order by tbs.borrow_date desc";
    // var sql = "select booki.name,useri.user_name,useri.user_id,bori.borrow_time,bori.restore_time,resi.restore_id,resi.user_id,resi.book_id,resi.restore_realTime,resi.pass_day,resi.borrow_id from book_info as booki,user_info as useri,borrow_info as bori,restore_info as resi where booki.id=resi.book_id and useri.user_id=resi.user_id and bori.borrow_id = resi.borrow_id order by resi.restore_id asc";
    // var sql = "select user_info.user_id,book_info.name,user_info.user_name,restore_info.borrow_id,borrow_info.borrow_time,borrow_info.restore_time,restore_info.restore_id,restore_info.restore_realTime,restore_info.pass_day from book_info,user_info,borrow_info,restore_info where book_info.id=restore_info.book_id and user_info.user_id=restore_info.user_id and restore_info.user_id = '" + keys + "' order by borrow_time desc";
    // var sql = "select booki.name,useri.user_name,useri.user_id,bori.borrow_id,resi.borrow_id,resi.user_id,resi.book_id,bori.borrow_time,bori.restore_time,resi.restore_realTime,resi.restore_id,resi.borrow_id,resi.pass_day from book_info as booki,user_info as useri,borrow_info as bori,restore_info as resi where booki.id=resi.book_id and useri.user_id=resi.user_id and bori.borrow_id = resi.borrow_id";
    var sql = 'select restore_info.restore_realTime,restore_info.pass_day,restore_info.restore_id,restore_info.user_id,user_info.user_name,book_info.name,restore_info.borrow_time,restore_info.restore_time from restore_info,user_info,book_info where restore_info.user_id = user_info.user_id and restore_info.book_id = book_info.id';
    return pool.execute(sql);
  },
  // 按学生学号模糊查询 //按学生学号、姓名、书名、borrow_id模糊查询
  queryStudentRestore(keys) {
    // var sql = "select Book_name,Student_name,borrow_date,return_date from t_book,t_student,t_book_student where t_book.Book_num=t_book_student.Book_num and t_student.Student_code=t_book_student.Student_code and Student_name like '%" + keys + "%' order by borrow_date desc";
    // var sql = "select name,user_name,borrow_id,borrow_time,restore_time from book_info,user_info,borrow_info where book_info.id=borrow_info.book_id and user_info.user_id=borrow_info.user_id and user_name = '" + keys + "' or user_info.user_id = '" + keys + "' or name like '%" + keys + "%' or borrow_id = '" + keys + "' order by borrow_time desc";
    var sql = "select distinct restore_info.user_id,restore_info.pass_day,book_info.name,user_info.user_name,restore_info.restore_id,restore_info.borrow_time,restore_info.restore_time,restore_info.restore_realTime from book_info,user_info,borrow_info,restore_info where book_info.id=restore_info.book_id and user_info.user_id=restore_info.user_id and user_info.user_id like '%" + keys + "%'";
    return pool.execute(sql);
  },

  //学生查询个人还书记录
  studentQueryRestore(keys) {
    // var sql = "select Book_name,Student_name,borrow_date,return_date from t_book,t_student,t_book_student where t_book.Book_num=t_book_student.Book_num and t_student.Student_code=t_book_student.Student_code and Student_name like '%" + keys + "%' order by borrow_date desc";
    // var sql = "select name,user_name,borrow_id,borrow_time,restore_time from book_info,user_info,borrow_info where book_info.id=borrow_info.book_id and user_info.user_id=borrow_info.user_id and user_name = '" + keys + "' or user_info.user_id = '" + keys + "' or name like '%" + keys + "%' or borrow_id = '" + keys + "' order by borrow_time desc";
    var sql = "select distinct restore_info.user_id,restore_info.pass_day,book_info.name,user_info.user_name,restore_info.restore_id,restore_info.borrow_time,restore_info.restore_time,restore_info.restore_realTime from book_info,user_info,restore_info where book_info.id=restore_info.book_id and user_info.user_id=restore_info.user_id and user_info.user_id = '" + keys + "' order by restore_id asc";
    return pool.execute(sql);
  },

  // -----------------------------------------------------------------------------------------------
  // 管理员-查询所有借阅记录
  findAll() {
    // var sql="select tb.Book_name,ts.Student_name,tbs.Id,tbs.Student_code,tbs.Book_num,tbs.borrow_date,tbs.return_date from t_book as tb,t_student as ts,t_book_student as tbs where tb.Book_num=tbs.Book_num and ts.Student_code=tbs.Student_code order by tbs.borrow_date desc";
    var sql = "select booki.name,useri.user_name,useri.user_id,bori.borrow_id,bori.user_id,bori.book_id,bori.borrow_time,bori.restore_time,bori.state from book_info as booki,user_info as useri,borrow_info as bori where booki.id=bori.book_id and useri.user_id=bori.user_id order by bori.borrow_time desc";
    return pool.execute(sql);
  },
  // 学生查询借阅记录
  findRecords(id) {
    var sql = "select borrow_info.book_id,name,user_info.user_id,borrow_id,borrow_time,restore_time,state from book_info,user_info,borrow_info where book_info.id=borrow_info.book_id and user_info.user_id=borrow_info.user_id and borrow_info.user_id='" + id + "'";
    // var sql = "select book_student.Book_num,Book_name,Student_name,borrow_date,return_date from t_book,t_student,book_student where t_book.Book_num=book_student.Book_num and t_student.Student_code=book_student.Student_code and book_student.Student_code='" + name + "'";
    console.log(sql);
    return pool.execute(sql);
  },
  // 按书名模糊查询
  queryBook(keys) {
    //var sql="select * from t_book where Book_name like '%"+keys+"%' or Writer like '%"+keys+"%'";
    var sql = "select Book_name,Student_name,borrow_date,return_date from t_book,t_student,t_book_student where t_book.Book_num=t_book_student.Book_num and t_student.Student_code=t_book_student.Student_code and Book_name like '%" + keys + "%'";
    return pool.execute(sql);
  },
  // 按学生学号模糊查询 //按学生学号、姓名、书名、borrow_id模糊查询
  queryStudent(keys) {
    // var sql = "select Book_name,Student_name,borrow_date,return_date from t_book,t_student,t_book_student where t_book.Book_num=t_book_student.Book_num and t_student.Student_code=t_book_student.Student_code and Student_name like '%" + keys + "%' order by borrow_date desc";
    // var sql = "select name,user_name,borrow_id,borrow_time,restore_time from book_info,user_info,borrow_info where book_info.id=borrow_info.book_id and user_info.user_id=borrow_info.user_id and user_name = '" + keys + "' or user_info.user_id = '" + keys + "' or name like '%" + keys + "%' or borrow_id = '" + keys + "' order by borrow_time desc";
    var sql = "select user_info.user_id,state,name,user_name,borrow_id,borrow_time,restore_time from book_info,user_info,borrow_info where book_info.id=borrow_info.book_id and user_info.user_id=borrow_info.user_id and user_info.user_id like '%" + keys + "%' order by borrow_time desc";
    return pool.execute(sql);
  },
  // 管理员增加借还书记录
  /*save(book){
    var sql = "insert into t_book_student values(null,'"+book.Book_num+"','"
    +book.Student_code+"','"
    +book.borrow_date+"','"
    +book.return_date+"')";
    console.log(sql);
    return pool.execute(sql);
  },*/
  // 删除借还书记录
  deleteRecord(id) {
    var sql = "delete from borrow_info where borrow_id='" + id + "'";
    console.log(sql);
    return pool.execute(sql);
  },
  // 学生增加借还书记录
  save1(book) {
    // INSERT INTO tablename SET column_name1 = value1, column_name2 = value2
    var sql = "insert into borrow_info set book_id='" + book.id + "',user_id='" + book.user_id + "',borrow_time='" + book.borrow_time + "',restore_time='" + book.restore_time + "',state= 0 ";
    return pool.execute(sql);
    // var sql = "insert into borrow_info values(null,'" + book.user_id + "','"
    //   + book.id + "','"
    //   + book.borrow_time + "','"
    //   + book.restore_time + "',0)";
    // return { add1: pool.execute(sql) };
  },
  // 修改借还书记录
  /*update(bookstudent){
    var sql="update t_book_student set return_date='"
    +bookstudent.return_date+"' where Id ="
    +bookstudent.Id;
    console.log(sql);
    return pool.execute(sql);
  },*/
  // 学生归还图书
  returnBook(form) {
    var borrow_sql = "delete from borrow_info where borrow_id='" + form.borrow_id + "'";
    console.log(borrow_sql);
    // INSERT INTO tablename SET column_name1  =  value1, column_name2  =  value2，…;
    var restore_sql = 'insert into restore_info set user_id="' + form.user_id + '",book_id="' + form.id + '",borrow_id="' + form.borrow_id + '",restore_realTime="' + form.restore_realTime + '",pass_day="' + form.pass_day + '",restore_time ="' + form.restore_time + '",borrow_time="' + form.borrow_time + '"';
    console.log(restore_sql);
    return pool.execute(restore_sql),pool.execute(borrow_sql);
  }
} 