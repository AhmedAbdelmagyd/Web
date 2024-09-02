var mysql = require('mysql');

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root", // provide your own password.
    database: "Recipes"
});

// Change the user and password to the user you want to make an admin

var username = "ahmed";
var password = "123456";

con.connect(function (err) {
    if (err) throw err;
    console.log("Connected!");
    // Create database & Table.
    var sql_database = "update Users set is_admin = true where username = '" + username + "' and password = '" + password + "';";
    con.query(sql_database, function (err, result) {
        if (err) throw err;
        console.log("Admin Created");
        con.end();
    });
});

