const express = require('express');
const router = express.Router();
const Produto = require('../models/produto');

// Cadastrar produto
router.post('/', (req, res) => {
  Produto.criar(req.body, (err, id) => {
    if (err) return res.status(500).send('Erro ao cadastrar produto');
    res.status(201).send({ id, mensagem: 'Produto cadastrado com sucesso' });
  });
});

// Listar todos os produtos
router.get('/', (req, res) => {
  Produto.listar((err, produtos) => {
    if (err) return res.status(500).send('Erro ao listar produtos');
    res.status(200).json(produtos);
  });
});

// Atualizar produto
router.put('/:id', (req, res) => {
  Produto.atualizar(req.params.id, req.body, (err) => {
    if (err) return res.status(500).send('Erro ao atualizar produto');
    res.status(200).send('Produto atualizado com sucesso');
  });
});

// Deletar produto
router.delete('/:id', (req, res) => {
  Produto.deletar(req.params.id, (err) => {
    if (err) return res.status(500).send('Erro ao deletar produto');
    res.status(200).send('Produto removido com sucesso');
  });
});

// Produtos com estoque baixo
router.get('/alerta/baixo-estoque', (req, res) => {
  const limite = parseInt(req.query.limite) || 10;
  Produto.listarBaixoEstoque(limite, (err, produtos) => {
    if (err) return res.status(500).send('Erro ao buscar produtos com estoque baixo');
    res.status(200).json(produtos);
  });
});

module.exports = router;
