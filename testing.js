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
    var sql_database = "select * FROM Users;";
    con.query(sql_database, function (err, result) {
        if (err) throw err;
        console.log(result);
        con.end();
    });
});

