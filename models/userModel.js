const fs = require('fs');
const path = require('path');

const USERS_FILE = path.join(__dirname, '../users.json');

const getAllUsers = () => {
    try {
        if (fs.existsSync(USERS_FILE)) {
            const data = fs.readFileSync(USERS_FILE, 'utf8');
            return JSON.parse(data);
        }
    } catch (err) {
        console.error('Error al cargar usuarios:', err);
    }
    return [];
};

const saveUsers = (users) => {
    try {
        fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2), 'utf8');
    } catch (err) {
        console.error('Error al guardar usuarios:', err);
    }
};

const addUser = (user) => {
    const users = getAllUsers();
    users.push(user);
    saveUsers(users);
};

module.exports = {
    getAllUsers,
    addUser
};