const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

// Configuração do banco de dados
const mysql = require('mysql2');

const db = mysql.createConnection({
  host: '10.100.65.136',
  user: 'root',
  password: 'QYMgkk42949',
  database: 'empada_e_lanches',
});

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

// Rota principal
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

// Rota para consulta
app.post('/consulta', (req, res) => {
  const query = req.body.query;
  db.query(query, (err, results) => {
    if (err) {
      res.status(500).send('Erro ao executar consulta: ' + err);
    } else {
      res.json(results);
    }
  });
});

// Inicia o servidor
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Servidor rodando`);
});

