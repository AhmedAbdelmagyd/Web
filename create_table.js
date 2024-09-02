var mysql = require('mysql');

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root", // provide your own password.
    database: "Recipes"
});

con.connect(function (err) {
    if (err) throw err;
    console.log("Connected!");
    // Create database & Table.
    var sql_database = "CREATE TABLE IF NOT EXISTS Users(username varchar(50) primary key, password varchar(50) not null, is_admin boolean);";
    con.query(sql_database, function (err, result) {
        if (err) throw err;
        console.log("Username Table Created");
        con.end();
    });
});

