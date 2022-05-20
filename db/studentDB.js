var pool = require('./pool');

module.exports = {
  // 管理员查找所有学生信息
  findAll() {
    var sql = "select user_id,user_name,user_department,user_class,user_mobile,user_sex,user_roles from user_info order by user_roles asc";
    return pool.execute(sql);
  },
  // 查找学生信息 
  findStudent(user_id) {
    var sql = "select * from user_info where user_id='" + user_id + "'";
    console.log(sql);
    return pool.execute(sql);
  },
  // 删除多个学生
  batchDelete(ids) {
    // var sql = "delete from user_info where user_id in (" + ids.join() + ")";
    var sql = "delete from user_info where user_id  = '" + ids + "'";
    return pool.execute(sql);
  },
  // 管理员修改学生信息
  update(student) {
    var sql = "update user_info set user_name = '"
      + student.user_name + "',user_mobile = '"
      + student.user_mobile + "',user_class = '"
      + student.user_class + "',user_department='"
      + student.user_department + "',user_sex='"
      + student.user_sex + "' where user_id ='"
      + student.user_sex + "' ";
    console.log(sql);
    return pool.execute(sql);
  },
  // 学生修改信息
  updateInfo(student) {
    var sql = "update user_info set user_name = '"
      + student.user_name + "',user_department = '"
      + student.user_department + "',user_class='"
      + student.user_class + "',user_sex='"
      + student.user_sex + "',user_mobile='"
      + student.user_mobile + "' where user_id ='" + student.user_id + "' ";
    console.log(sql);
    return pool.execute(sql);
  },
  // 模糊查询(学生学号查询)
  query(keys) {
    // var sql = "select Student_num,Student_code,Student_name,Academy_name,Class_name,Sex,Email from t_student where Student_code like '%" + keys + "%' or Student_name like '%" + keys + "%'";
    var sql = "select user_id,user_name,user_department,user_class,user_mobile,user_sex,user_roles from user_info where user_id like '%" + keys + "%' or user_name like '%" + keys + "%'";
    return pool.execute(sql);
  },

}