var mysql = require('mysql');
var fs = require('fs');
var con;
const path = require('path');
const r = require('./Session');


exports.connectToDB = function () {
    var con = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "root", // provide your own password.
        database: "Recipes"
    });
    return con;
};


// Login
exports.login = (res,s) => {
    fail = r.getMyLogin();
    filePath = 'login.html';
    message = '';
    fs.readFile(filePath, (err, data) => {
        if (err) {
            return res.end("404 Not Found");
        }
        res.write(data);
        if (fail.failed === true){
            res.write("<script>document.getElementById(\"error\").innerHTML = \"You have entered an incorrect username or password!\";</script> ");
        }
        res.end();
    });
}

// Logout
exports.logout = (res) => {
    if (con) {
        con.destroy();
    }
    filePath = 'login.html';
    fs.readFile(filePath, (err, data) => {
        if (err) {
            return res.end("404 Not Found");
        }
        res.write(data);
        res.write('<script>document.getElementById(\"logout\").style.display = \"none\";</script>');
        res.write('<script>document.getElementById(\"username\").innerHTML = "";</script>');
        res.end();
    });
};

exports.deleteAccount = function(res, s, body){

    con = this.connectToDB();
    con.connect(function (err) {
        if (err) throw err;
        console.log("Connected!");
        // Create database & Table.
        var sql_database = "delete from Users where username='" + s.username + "' and password='" + body.password + "';";
        con.query(sql_database, function (err, result) {
            if (err) throw err;
            console.log(result);
            con.end();
        });
    });


}

// Navigation
exports.navigateToHome = function (res, s) {
    const filePath = path.join(__dirname, 'index.html');
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            return res.end("404 Not Found");
        }
        res.write(data);
        if (s.username && s.username !== undefined){
        res.write('<script>document.getElementById(\"logout\").style.display = \"block\";</script>');
        res.write('<script>document.getElementById(\"username\").innerHTML = "' + s.username + '";</script>');
        }
        res.end();
    });
    
};

exports.navigateToMenu = (res, s) => {
    filePath = 'menu.html';
    fs.readFile(filePath, (err, data) => {
    if (err) {
        return res.end("404 Not Found");
    }
    res.write(data);
    if (s.username && s.username !== undefined){
    res.write('<script>document.getElementById(\"logout\").style.display = \"block\";</script>');
    res.write('<script>document.getElementById(\"username\").innerHTML = "' + s.username + '";</script>');
    }
    res.end();
});
};

exports.navigateToAdmin = (res,s) => {
    filePath = 'admin.html';
    fs.readFile(filePath, (err, data) => {
    if (err) {
        return res.end("404 Not Found");
    }
    res.write(data);
    if (s.username && s.username !== undefined){
    res.write('<script>document.getElementById(\"logout\").style.display = \"block\";</script>');
    res.write('<script>document.getElementById(\"username\").innerHTML = "' + s.username + '";</script>');
    }
    res.end();
});
};

exports.navigateToProfile = (res,s) => {
    filePath = 'profile.html';
    fs.readFile(filePath, (err, data) => {
    if (err) {
        return res.end("404 Not Found");
    }
    res.write(data);
    if (s.username && s.username !== undefined){
    res.write('<script>document.getElementById(\"logout\").style.display = \"block\";</script>');
    res.write('<script>document.getElementById(\"username\").innerHTML = "' + s.username + '";</script>');
    }
    res.end();
});
};

exports.navigateToReviews = (res,s) => {
    filePath = 'reviews.html';
    fs.readFile(filePath, (err, data) => {
    if (err) {
        return res.end("404 Not Found");
    }
    res.write(data);
    if (s.username && s.username !== undefined){
    res.write('<script>document.getElementById(\"logout\").style.display = \"block\";</script>');
    res.write('<script>document.getElementById(\"username\").innerHTML = "' + s.username + '";</script>');
    }
    res.end();
});
};

exports.navigateToRegister = (res,success) => {
    filePath = 'register.html';
    success = r.getMyRegister()
    fs.readFile(filePath, (err, data) => {
    if (err) {
        return res.end("404 Not Found");
    }
    res.write(data);
    if (success.reg === false){
    res.write('<script>document.getElementById(\"error\").innerHTML = \"You have entered a used username!\";</script>');
    }
    res.end();
    r.deleteRegister();
});
};


// Authenticate User
exports.authenticateUser = function (res, body, mySess, myCallback) {
    const Username = body.username;
    const Password = body.password;
    var done = false;
    var is_admin = false;

    const con = this.connectToDB();

    con.connect(function (err) {
        if (err) {
            res.writeHead(500, { 'Content-Type': 'text/plain' });
            return res.end('Database connection error'); // Added error handling
        }

        const sql = "SELECT * FROM Users WHERE username = '" + Username + "' AND password = '" + Password +"';";
        con.query(sql, function (err, result) {
            if (err) {
                console.log('failed')
            } else if (result.length > 0){
                failed = false;
                is_admin = result[0].is_admin === 1 ? true : false;
                mySess.setMySession(Username, is_admin, failed);
                mySess.setMyLogin(failed);
            }
            else{
                failed = true;
                mySess.setMyLogin(failed);
            }
        });
    });
    
    done = true;
    return done;
};


// Post Authentication
exports.postAuthentication = function (res, s, body) {
    if (s.admin === true){
        res.writeHead(302, {'Location':'/admin'});
        res.end();
    }
    else if (s.admin === false){
        res.writeHead(302, {'Location':'/'});
        res.end();
    }
    else{
        res.writeHead(302, {'Location':'/login'});
    }
};

exports.Register = function (res, body, mySess){
    con = this.connectToDB();
    con.connect(err => {
        console.log("Connected")            
        const sql = "INSERT INTO Users (username, password) VALUES ('" + body.username + "', '" + body.password + "')";
        con.query(sql, function (err, result) {
        
            if (result !== undefined && result !== "Error") {
                console.log("User Created");
                con.end();
                success = true;
                r.setMyRegister(success)
            } else {
                success = false;
                r.setMyRegister(success)
            }
        });
    });
};

exports.postRegisteration = function (res, body) {
    res.writeHead(302, { 'Location': '/login' });
    res.end();

}