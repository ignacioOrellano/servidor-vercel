const fs = require('fs');
const path = require('path');

const serveIndex = (req, res) => {
    serveFile(res, path.join(__dirname, '../views/index.html'));
};

const serveUserPage = (req, res) => {
    serveFile(res, path.join(__dirname, '../views/user/user.html'));
};

const serveNotFound = (req, res) => {
  serveFile(res, path.join(__dirname, '../views/pageNotFound.html'));
};

const serveFile = (res, filePath) => {
    fs.readFile(filePath, (err, data) => {
        if (err) {
            serveNotFound(null, res);
            return;
        }
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.end(data);
    });
};

module.exports = {
    serveIndex,
    serveUserPage,
    serveNotFound,
    serveFile
};