const express = require('express');
const mysql = require('mysql2');
const app = express();
const axios = require('axios');
// Configuração do MySQL
let connection;

function handleDisconnect() {
    connection = mysql.createConnection({
        host: '127.0.0.1',
        user: 'root',
        password: '',
        database: 'bot_de_queijo'
    });

    connection.connect(err => {
        if (err) {
            setTimeout(handleDisconnect, 2000);
        }
    });

    connection.on('error', err => {
        if (err.code === 'PROTOCOL_CONNECTION_LOST') {
            handleDisconnect();
        } else {
            throw err;
        }
    });
}

handleDisconnect();

// Middleware para permitir requisições de qualquer origem
app.use(express.json());
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

app.post('/', (req, res) => {
    res.status(200).json({ message: 'oi oi' });
});

// Iniciar o servidor
app.listen(8080, () => {
    console.log('Servidor rodando na porta 3000');
});

