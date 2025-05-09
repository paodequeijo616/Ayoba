const express = require('express');
const mysql = require('mysql2');
const app = express();
const axios = require('axios');

app.use(express.json());

app.post('/', (req, res) => {
    res.send('oi oi' );
});

// Iniciar o servidor
app.listen(8080, () => {
    console.log('Servidor rodando na porta 3000');
});

