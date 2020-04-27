/* eslint-disable no-debugger */
var mysql = require('mysql');
var connection = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: 'abckeke123',
    port: '3306',
    database: 'BookStore',
    multipleStatements: true
});

connection.connect();

function BookInfo(rowdata) {
    this.bookid = rowdata.bid;
    this.bookname = rowdata.bname;
    this.author = rowdata.author;
    this.price = rowdata.price;
    this.quantity = rowdata.quantity;
    this.classname = rowdata.cname;
    this.username = rowdata.username;
}

function Item(id) {
    this.bookid = id;
    this.quantity = 3;
}

//获取日期
// function date() {
//     let a = new Date().toLocaleDateString().split('/');
//     return a[2]+'-'+a[0]+'-'+a[1];
// }
function date() {
    let a = new Date().toLocaleDateString().split('/').join('-');
    return a;
}
/**
 * 登录 param(用户名)
 * 用户名存在，返回密码
 * 用户名不存在，返回0
 *  */
function signin(name) {
    return new Promise(function(resolve, rejected) {
        var sql = `SELECT password FROM userInfo WHERE username='${name}'`;
        connection.query(sql, function(err, result) {
            if (err) {
                console.log('[SELECT ERROR] - ', err.message);
                rejected(err);
            }
            if (result[0]) {
                console.log(result[0]);
                resolve(result[0].password);
            } else resolve(0); //用户名不存在
        });
    });
}

/**
 * 注册 param(用户名，密码，邮箱)
 * 注册成功，返回true
 * 注册失败，返回false
 */
function signup(name, pw, email) {
    return new Promise(function(resolve, rejected) {
        var addSql = 'INSERT INTO userInfo(username,password,email) VALUES(?,?,?)';
        var addSqlParams = [name, pw, email];
        connection.query(addSql, addSqlParams, function(err, result) {
            if (err) {
                console.log('[INSERT ERROR] - ', err.message);
                resolve(false);
            } else resolve(true);
        });
    });
}

/**搜索（按照4种方式）
 * 参数（类型，内容）
 * 类型=1，按照书的id查询，返回一个数组，数组的内容是一本书的信息
 * 类型=2，按照书的名称查询，返回一个数组，数组的内容是这些书的信息
 * 类型=3，按照书的作者查询，返回一个数组，数组的内容是这些书的信息
 * 类型=4，按照书的类别查询，返回一个数组，数组的内容是这个类别全部书的信息
 * 上述如果搜索不到都是返回0
 *  */
function search(type, content) {
    return new Promise(function(resolve, rejected) {
        var array = [];
        switch (type) {
            case 1: //按照id查询
                var sql = `SELECT bid,bname,author,price,quantity,classInfo.cname,bookInfo.username FROM bookInfo,classInfo WHERE bookInfo.classid=classInfo.cid and  bid=${content};`;
                connection.query(sql, function(err, result) {
                    if (err) {
                        console.log('[SELECT ERROR] - ', err.message);
                        rejected(err);
                    }
                    for (var i = 0; i < (result.length); i++) {
                        array.push(new BookInfo(result[i]));
                    }
                    resolve(array);
                });
                break;

            case 2: //按照书名查询
                var sql = `SELECT bid,bname,author,price,quantity,classInfo.cname,bookInfo.username
                FROM bookInfo,classInfo
                WHERE bookInfo.classid=classInfo.cid and bname REGEXP '${content}';`;
                connection.query(sql, function(err, result) {
                    if (err) {
                        console.log('[SELECT ERROR] - ', err.message);
                        rejected(err);
                    }
                    for (var i = 0; i < (result.length); i++) {
                        array.push(new BookInfo(result[i]));
                    }
                    resolve(array);
                });
                break;

            case 3: //
                var sql = `SELECT bid,bname,author,price,quantity,classInfo.cname,bookInfo.username
                FROM bookInfo,classInfo WHERE bookInfo.classid=classInfo.cid and author REGEXP '${content}';`;
                connection.query(sql, function(err, result) {
                    if (err) {
                        console.log('[SELECT ERROR] - ', err.message);
                        rejected(err);
                    }
                    for (var i = 0; i < (result.length); i++) {
                        array.push(new BookInfo(result[i]));
                    }
                    resolve(array);
                });
                break;

            case 4:
                var sql = `SELECT bid,bname,author,price,quantity,classInfo.cname,bookInfo.username FROM bookInfo,classInfo WHERE bookInfo.classid=classInfo.cid and  classInfo.cname='${content}';`;
                connection.query(sql, function(err, result) {
                    if (err) {
                        console.log('[SELECT ERROR] - ', err.message);
                        rejected(err);
                    }
                    for (var i = 0; i < (result.length); i++) {
                        array.push(new BookInfo(result[i]));
                    }
                    resolve(array);
                });
                break;
        }
    });
}


/**查询书的详细信息 参数（书的ID）
 * 查询成功，返回一个对象，内容是书的全部信息
 * 查询失败返回0
 *  */
function searchBookInfo(id) {
    return new Promise(function(resolve, rejected) {
        var sql = `SELECT bid,bname,author,price,quantity,classInfo.cname,bookInfo.username FROM bookInfo,classInfo WHERE bookInfo.classid=classInfo.cid and bid=${id};`;
        connection.query(sql, function(err, result) {
            if (err) {
                console.log('[SELECT ERROR] - ', err.message);
                rejected(err);
            }
            if (result[0]) {
                resolve(new BookInfo(result[0]));
            } else resolve(0); //查不到该书
        });
    });
}


//这个你不需要调用
function handleBookOrders(user, item) {
    return new Promise(function (resolve, rejected) {

        var sql = `SELECT oid FROM orders WHERE username='${user}'`;
        connection.query(sql, function (err, result) {
            if (err) {
                console.log('[INSERT ERROR 2] - ', err);
                resolve(false);
            } else {
                for (var i = 0; i < item.length; i++) {
                    var addSql = `BEGIN;INSERT INTO bookorder(oid,bid,amount) VALUES(?,?,?);UPDATE bookInfo SET quantity=quantity-${item[i].quantity} WHERE bid=${item[i].bookid};COMMIT;`;
                    var addpara = [result[0].oid, item[i].bookid, item[i].quantity];
                    connection.query(addSql, addpara, function (err, result) {
                        if (err) {
                            console.log('[INSERT ERROR 3] - ', err);
                            resolve(false);
                        }
                    });
                }
                resolve(true);
            }
        });


    });
}

/**处理用户订单 参数（用户名，订单里书的条目item，总金额）
 * 订单处理成功返回true
 * 订单处理失败返回false
 *  */
function handleOrders(username, item, total) {
    return new Promise(function(resolve, rejected) {
        let addsql1 = `INSERT INTO orders(username,paymoney,deliverytime,arrivaltime,orderstatus) VALUES(?,?,?,?,?);`;
        let addpara1 = [username, total, date(), date(), 0];
        connection.query(addsql1, addpara1, function(err, result) {
            if (err) {
                console.log('[INSERT ERROR 1] - ', err);
                resolve(false);
            } else {
                handleBookOrders(username, item).then(ret => {
                    if (ret)
                        resolve(true);
                    else resolve(false);
                });
            }
        });
    });
}

function publishBook(bookname,author,price,quantity,classid,username) {
    return new Promise(function(resolve, rejected) {
        let addsql1 = `INSERT INTO 
        bookInfo(bname,author,price,quantity,classid,username) 
        VALUES(?,?,?,?,?,?);`;
        let addpara1 = [bookname,author,price,quantity,classid,username];
        connection.query(addsql1, addpara1, function(err, result) {
            if (err) {
                console.log('[INSERT BOOK ERROR 1] - ', err);
                resolve(false);
            } else {
                resolve(true);
            }
        });
    });

}

function searchComments(bookid){
    return new Promise(function(resolve, rejected) {
        var sql = `SELECT bid,username,commentdate,comment FROM comments WHERE bid=${bookid};`;
        connection.query(sql, function(err, result) {
            if (err) {
                console.log('[SELECT ERROR] - ', err);
                rejected(err);
            }else{
                resolve(result);
            }
        });
    });
}

function publishComment(bookid,username,comment) {
    return new Promise(function(resolve, rejected) {
        let addsql1 = `INSERT INTO 
        comments(bid,username,commentdate,comment) 
        VALUES(?,?,?,?);`;
        let addpara1 = [bookid,username,date(),comment];
        connection.query(addsql1, addpara1, function(err, result) {
            if (err) {
                console.log('[INSERT BOOK ERROR 1] - ', err);
                resolve(false);
            } else {
                resolve(true);
            }
        });
    });

}
function publishBook(bookname,author,price,quantity,classid){
    return new Promise(function(resolve, rejected) {
        let addsql1 = `INSERT INTO 
        bookInfo(bname,author,price,quantity,classid) 
        VALUES(?,?,?,?,?);`;
        let addpara1 = [bookname,author,price,quantity,classid];
        connection.query(addsql1, addpara1, function(err, result) {
            if (err) {
                console.log('[INSERT BOOK ERROR 1] - ', err);
                resolve(false);
            } else {
                resolve(true);
            }
        });
    });
}
module.exports = {
    signin: signin,
    signup: signup,
    search: search,
    searchBookInfo: searchBookInfo,
    handleOrders: handleOrders,
    publishBook,
    publishComment,
    searchComments,
    publishBook
}
