const http = require('http');
const url = require('url');
const querystring = require('querystring');
const myModule = require('./Modules');
const mySess = require('./Session');

http.createServer(function (req, res) {
    let body = '';
    const parsedUrl = url.parse(req.url);
    const pathname = parsedUrl.pathname;
    const s = mySess.getMySession();

    if (pathname === '/' || pathname === '/index') {
        myModule.navigateToHome(res, s);
    } else if (pathname === "/login") {
        if (s.failed === undefined){
        myModule.login(res, s);

        req.on('data', chunk => {
            body += chunk.toString();
        });

        req.on('end', () => {
            body = querystring.parse(body);
            if (req.method === 'POST') {
                const done = myModule.authenticateUser(res, body, mySess);
                if (done === true) {
                    myModule.postAuthentication(res, s, body);
                }
            }
        });
        }
        else if (s.failed === false){
            myModule.navigateToProfile(res, s)
        }
    } else if (pathname === "/logout") {
        if (s.username && s.username !== undefined) {
            mySess.deleteSession();
            myModule.logout(res);
            myModule.login(res, s)
        } else {
            myModule.login(res, s);
        }
        myModule.navigateToHome(res, s);
    } else if (pathname === '/menu') {
        myModule.navigateToMenu(res, s);
    } else if (pathname === '/reviews') {
        myModule.navigateToReviews(res, s);
    } else if (pathname === '/profile') {
        myModule.navigateToProfile(res, s);
            req.on('data', chunk => {
                body += chunk.toString();
            });
    
            req.on('end', () => {
                body = querystring.parse(body);
                if (req.method === 'POST') {
                    myModule.deleteAccount(res, s, body);
                    myModule.navigateToHome(res, s);
                }
            });
    } else if (pathname === '/admin') {
        const s = mySess.getMySession();
        if (s.admin === true && s.admin !== undefined) {
            myModule.navigateToAdmin(res, s);
        } else {
            myModule.navigateToHome(res, s);
        }
    } else if (pathname === '/register') {
        success = mySess.getMyRegister();
        myModule.navigateToRegister(res, s);
        req.on('data', chunk => {
            body += chunk.toString();
        });

        req.on('end', () => {
            body = querystring.parse(body);
            if (req.method === 'POST') {
                myModule.Register(res, body, mySess);
                
            }
            if (success.reg === true){
                    myModule.postRegisteration(res, body);
                }
        });
    } else {
        res.writeHead(404);
        res.end('404 Not Found');
    }
}).listen(8080);

console.log('Server is running on http://localhost:8080');
