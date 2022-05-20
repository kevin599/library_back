var pool = require('./pool');

module.exports = {
    // 查找ID
    select_name(id) {
        var sql = 'select * from user_info where user_id ="' + id + '" ';
        return pool.execute(sql);
    },
    // 按照ID查找对应的密码
    select_password(id) {
        var sql = 'select user_password from user_info where user_id ="' + id + '" ';
        return pool.execute(sql);
    },
    // 修改用户密码
    update_password(user_id, user_password) {
        var sql = "update user_info set user_password = '" + user_password + "' where user_id ='" + user_id + "' ";
        return pool.execute(sql);

    }
}