/* eslint-disable no-debugger */
var mysql = require('mysql');
var connection = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: '',
    port: '3306',
    database: 'BookStore'
});

connection.connect();

function BookInfo(rowdata) {
    this.bookid = rowdata.bid;
    this.bookname = rowdata.bname;
    this.author = rowdata.author;
    this.price = rowdata.price;
    this.quantity = rowdata.quantity;
    this.classname = rowdata.cname;
}
var sql = "SELECT bid,bname,author,price,quantity,classInfo.cname FROM bookInfo,classInfo WHERE classid=2; ";
//查
connection.query(sql, function (err, result) {
    if (err) {
        console.log('[SELECT ERROR] - ', err.message);
        return;
    }

    console.log('--------------------------SELECT----------------------------');
    var array = [];
    for (var i = 0; i < (result.length) / 10; i++) {
        if (result[i]) {
            array.push(new BookInfo(result[i]));
            console.log(array[i]);
        }
        else console.log(1);
    }

});

// var  addSql = 'INSERT INTO userinfo(username,password,email)  VALUES(?,?,?)';
// var  addSqlParams = ['zk', '123456','sss@126.com'];
// //增
// connection.query(addSql,addSqlParams,function (err, result) {
//         if(err){
//          console.log('[INSERT ERROR] - ',err.message);
//          return;
//         }        

//        console.log('--------------------------INSERT----------------------------');
//        //console.log('INSERT ID:',result.insertId);        
//        console.log('INSERT ID:',result[0]);        
//        console.log('-----------------------------------------------------------------\n\n');  
// });

//登录
function signin(name) {
    return new Promise(function(resolve,rejected){
    var sql = `SELECT password FROM userInfo WHERE username=${name}`;
    connection.query(sql, function (err, result) {
        if (err) {
            console.log('[SELECT ERROR] - ', err.message);
            rejected(err);
        }
        if (result[0]) {
            console.log(result[0]);
            resolve(result[0].password);
        }
        else resolve(0);//用户名不存在
    });
  });
}

//注册
function signup(name, pw, email) {
    var addSql = 'INSERT INTO userinfo(username,password,email)  VALUES(?,?,?)';
    var addSqlParams = [name, pw, email];
    connection.query(addSql, addSqlParams, function (err, result) {
        if (err) {
            console.log('[INSERT ERROR] - ', err.message);
            return false;
        }
        else return true;
    });
}

//搜索（按照4种方式）
function search(type, content) {
    var array = [];
    switch (type) {
        case 1://按照id查询
            var sql = `SELECT bid,bname,author,price,quantity,classInfo.cname FROM bookInfo,classInfo WHERE bid=${content};`;
            connection.query(sql, function (err, result) {
                if (err) {
                    console.log('[SELECT ERROR] - ', err.message);
                    return;
                }
                if (result[0]) {
                    array.push(new BookInfo(result[0]));
                    return array;
                }
                else return 0;//该id搜不到
            });
            break;

        case 2://按照书名查询
            var sql = `SELECT bid,bname,author,price,quantity,classInfo.cname FROM bookInfo,classInfo WHERE bname REGEXP ${content};`;
            connection.query(sql, function (err, result) {
                if (err) {
                    console.log('[SELECT ERROR] - ', err.message);
                    return;
                }
                for (var i = 0; i < (result.length) / 10; i++) {
                    if (result[i]) {
                        array.push(new BookInfo(result[i]));
                        return array;
                    }
                    else return 0;//查不到该书
                }
            });
            break;

        case 3:
            var sql = `SELECT bid,bname,author,price,quantity,classInfo.cname FROM bookInfo,classInfo WHERE author REGEXP ${content};`;
            connection.query(sql, function (err, result) {
                if (err) {
                    console.log('[SELECT ERROR] - ', err.message);
                    return;
                }
                for (var i = 0; i < (result.length) / 10; i++) {
                    if (result[i]) {
                        array.push(new BookInfo(result[i]));
                        return array;
                    }
                    else return 0;//查不到该书
                }
            });
            break;

        case 4:
            var sql = `SELECT bid,bname,author,price,quantity,classInfo.cname FROM bookInfo,classInfo WHERE classid=${content};`;
            connection.query(sql, function (err, result) {
                if (err) {
                    console.log('[SELECT ERROR] - ', err.message);
                    return;
                }
                for (var i = 0; i < (result.length) / 10; i++) {
                    if (result[i]) {
                        array.push(new BookInfo(result[i]));
                        return array;
                    }
                    else return 0;//查不到该书
                }
            });
            break;


    }
}

module.exports={
    signin:signin
}

connection.end();