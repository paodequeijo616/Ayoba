const express = require('express');
const mysql = require('mysql2');
const app = express();
const axios = require('axios');

// Middleware para permitir requisições de qualquer origem
app.use(express.json());
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

app.post('/', (req, res) => {
    res.send('oi oi' );
});

// Iniciar o servidor
app.listen(8080, () => {
    console.log('Servidor rodando na porta 3000');
});

