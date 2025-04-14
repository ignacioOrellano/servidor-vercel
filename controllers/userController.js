const fs = require('fs');
const path = require('path');
const querystring = require('querystring');
const userModel = require('../models/userModel');

const serveUserTable = (req, res) => {
    const users = userModel.getAllUsers();
    
    const userRows = users.map(user => 
        `<tr class="hover:bg-gray-50">
            <td class="px-6 py-4 whitespace-nowrap">${user.name}</td>
            <td class="px-6 py-4 whitespace-nowrap">${user.lastname}</td>
        </tr>`
    ).join('');

    fs.readFile(path.join(__dirname, '../views/user/users-table.html'), 'utf8', (err, data) => {
        if (err) {
            res.writeHead(404);
            res.end('404 Not Found');
            return;
        }

        const tableContent = userRows || 
            '<tr><td colspan="2" class="px-6 py-4 text-center text-gray-500">No hay usuarios registrados</td></tr>';

        const html = data.replace('{{table}}', tableContent);
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.end(html);
    });
};

const handleAddUser = (req, res) => {
    let body = '';
    req.on('data', chunk => {
        body += chunk.toString();
    });
    req.on('end', () => {
        const postData = querystring.parse(body);
        const { name, lastname } = postData;
        
        if (name && lastname) {
            userModel.addUser({ name, lastname });
        }
        
        res.writeHead(302, {
            'Location': '/user-table'
        });
        res.end();
    });
};

module.exports = {
    serveUserTable,
    handleAddUser
};