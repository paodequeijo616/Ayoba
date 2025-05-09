const express = require('express');
const mysql = require('mysql2');
const app = express();

app.use(express.json());

app.post('/login', (req, res) => {
	res.sed("testado");
});

// Iniciar o servidor
app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
});

