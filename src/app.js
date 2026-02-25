require('dotenv').config();
const express = require('express');
const path = require('path');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const mysql = require('mysql2/promise');
const planosRoutes = require('./routes/planos.routes');
produtosRoutes = require('./routes/produtos.routes');

const app = express();
app.use(express.json());

// CONFIGURAÇÃO DE ARQUIVOS ESTÁTICOS
// Como seus arquivos HTML estão dentro de public/img, precisamos mapear as pastas corretamente
app.use(express.static(path.join(__dirname, 'public'))); 
app.use(express.static(path.join(__dirname, 'public', 'img')));
app.use(express.static(path.join(__dirname, 'public', 'js')));
app.use(express.static(path.join(__dirname, 'public', 'css')));

app.use('/planos', planosRoutes);
app.use('/produtos', produtosRoutes);

let db;

async function initializeDatabase() {
  try {
    // A conexão usa as variáveis do seu arquivo .env
    db = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASS, // Se estiver vazio no .env, ele conectará sem senha
      database: process.env.DB_NAME,
      port: process.env.DB_PORT || 3306
    });
    console.log('CoreX Fitness: Conectado ao MySQL com sucesso!');
  } catch (error) {
    console.error('Erro ao conectar ao MySQL:', error);
    // DICA: Se o erro for ER_ACCESS_DENIED_ERROR, verifique o DB_PASS no seu .env
    process.exit(1);
  }
}

// ROTA PRINCIPAL: Resolve o erro "Cannot GET /" enviando o index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'img', 'index.html'));
});

// API DE PRODUTOS: Busca de fonte externa
app.get('/api/products', async (req, res) => {
  try {
    const response = await fetch('https://fakestoreapi.com/products/category/jewelery');
    const data = await response.json();
    
    const products = data.map(p => ({
      id: p.id,
      name: p.title,
      price: p.price * 5, 
      image: p.image
    }));
    res.status(200).json(products);
  } catch (error) {
    res.status(500).send({ message: 'Erro ao carregar produtos externos.' });
  }
});

// Rota de Cadastro
app.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const saltRounds = parseInt(process.env.SALT_ROUNDS) || 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    await db.execute('INSERT INTO users (name, email, password) VALUES (?, ?, ?)', [name, email, hashedPassword]);
    res.status(201).send({ message: 'Usuário cadastrado!' });
  } catch (e) { 
    res.status(500).send({ message: 'Erro no cadastro. Verifique se a tabela "users" existe.' }); 
  }
});

// Rota de Login
app.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const [users] = await db.execute('SELECT * FROM users WHERE email = ?', [email]);
    if (users.length === 0) return res.status(401).send({ message: 'Usuário não encontrado.' });
    
    const match = await bcrypt.compare(password, users[0].password);
    if (match) {
      const token = jwt.sign({ id: users[0].id, name: users[0].name }, process.env.JWT_SECRET || 'secret_key', { expiresIn: '1h' });
      res.status(200).send({ message: 'Login realizado!', token });
    } else {
      res.status(401).send({ message: 'Senha incorreta.' });
    }
  } catch (e) { 
    res.status(500).send({ message: 'Erro no login.' }); 
  }
});

module.exports = { app, initializeDatabase };


