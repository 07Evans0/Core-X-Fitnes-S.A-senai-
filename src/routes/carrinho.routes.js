const express = require('express');
const router = express.Router();
const carrinhoControle = require('../controller/carrinhoControle');

// Endpoints em português
router.get('/', carrinhoControle.listarTudo);
router.post('/adicionar', carrinhoControle.adicionar);
router.delete('/remover/:id', carrinhoControle.remover);
router.delete('/limpar', carrinhoControle.limpar);

module.exports = router;