const express = require('express');
const app = express();

const produtoRoutes = require('./routes/produtoRoutes');
const movimentacaoRoutes = require('./routes/movimentacaoRoutes');

app.use(express.json());
app.use('/produtos', produtoRoutes);
app.use('/movimentacoes', movimentacaoRoutes);

module.exports = app;
