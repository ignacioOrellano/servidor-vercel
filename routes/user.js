const url = require('url');
const userController = require('../controllers/userController');
const viewController = require('../controllers/viewController.js');

const handleRoutes = (req, res) => {
    const parsedUrl = url.parse(req.url, true);
    const pathname = parsedUrl.pathname;
    
    // Routes
    if (req.method === 'GET' && (pathname === '/' || pathname === '/index')) {
        viewController.serveIndex(req, res);
    } 
    else if (req.method === 'GET' && pathname === '/user') {
        viewController.serveUserPage(req, res);
    }
    else if (req.method === 'GET' && pathname === '/user-table') {
        userController.serveUserTable(req, res);
    }
    else if (req.method === 'POST' && pathname === '/user/add') {
        userController.handleAddUser(req, res);
    }
    else {
        viewController.serveNotFound(req, res);
    }
};

module.exports = { handleRoutes };