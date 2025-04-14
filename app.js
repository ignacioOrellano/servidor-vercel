const http = require('http');
const userRoutes = require('./routes/user');

const server = http.createServer((req, res) => {
    userRoutes.handleRoutes(req, res);
});

const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});