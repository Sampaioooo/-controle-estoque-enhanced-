const express = require('express');
const router = express.Router();
const Movimentacao = require('../models/movimentacao');

// Registrar movimentação
router.post('/', (req, res) => {
  Movimentacao.registrar(req.body, (err, id) => {
    if (err) return res.status(400).send(`Erro: ${err.message}`);
    res.status(201).send({ id, mensagem: 'Movimentação registrada com sucesso' });
  });
});

// Listar movimentações
router.get('/', (req, res) => {
  Movimentacao.listar((err, movimentos) => {
    if (err) return res.status(500).send('Erro ao listar movimentações');
    res.status(200).json(movimentos);
  });
});

module.exports = router;
