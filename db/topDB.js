var pool = require('./pool');

module.exports = {

  //DAO层去查询借阅书籍排行榜
  findTop() {
    // var sql = "SELECT t_student.Academy_name,t_student.Student_name , COUNT(t_student.Student_name) AS Total_num FROM  t_book_student    JOIN t_student ON t_student.Student_code = t_book_student.Student_code JOIN  t_book   ON t_book.Book_num = t_book_student.Book_num GROUP  BY t_student.Student_name ";
    var sql = "SELECT user_info.user_department,user_info.user_name,user_info.user_id, COUNT(user_info.user_name) AS Total_num FROM  borrow_info    JOIN user_info ON user_info.user_id = borrow_info.user_id JOIN  book_info   ON book_info.id = borrow_info.book_id GROUP  BY user_info.user_name ";

    return pool.execute(sql);
  },
}