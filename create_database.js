var mysql = require('mysql');

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root" // provide your own password.
});

con.connect(function (err) {
    if (err) throw err;
    console.log("Connected!");
    // Create database & Table.
    var sql_database = "CREATE DATABASE IF NOT EXISTS Recipes;";
    con.query(sql_database, function (err, result) {
        if (err) throw err;
        console.log("Recipes Database Created");
        con.end();
    });
});

