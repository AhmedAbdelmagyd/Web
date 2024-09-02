


let session = {};

let register = {};

let login = {};

exports.setMySession = function (username=undefined, admin=false) {
    session.username = username;
    session.admin = admin;
};

exports.getMySession = function () {
    return session;
};

exports.deleteSession = function () {
    session = {};
};

exports.setMyRegister = function (reg=false){
    register.reg = reg;
}

exports.getMyRegister = function (){
    return register;
}

exports.deleteRegister = function() {
    register ={};
}

exports.setMyLogin = function (failed=true){
    login.failed = failed;
}

exports.getMyLogin = function (){
    return login;
}