## Sistema de Controle de Estoque
Este projeto é um sistema de controle de estoque focado no desenvolvimento do back-end funcional, utilizando JavaScript com o ambiente Node.js e o framework Express.

O banco de dados utilizado é o SQLite3, escolhido por ser leve e adequado para sistemas locais.

## Status do Projeto
## (O desenvolvimento está Finalizado.)

Atualmente, o sistema possui apenas o back-end implementado.

A documentação completa ainda está pendente, porém há um relatório parcial disponível.

Para facilitar o download, o projeto está compactado no arquivo controle-estoque.zip, que contém tudo que é necessário para execução.

## Tecnologias Utilizadas
°Node.js – Ambiente de execução JavaScript

°Express – Framework para construção de APIs RESTful

°SQLite3 – Banco de dados leve baseado em arquivos

°Postman – Ferramenta utilizada para testar requisições HTTP

## Estrutura do Projeto

controle-estoque/
├── app.js
├── server.js
├── database/
│   └── database.js
├── models/
│   ├── produto.js
│   └── movimentacao.js
├── routes/
│   ├── produtoRoutes.js
│   └── movimentacaoRoutes.js
├── estoque.db (arquivo gerado automaticamente)

## Funcionalidades Implementadas
## CRUD de Produtos
°POST /produtos: Cadastra um novo produto no banco de dados.

°GET /produtos: Lista todos os produtos cadastrados.

°PUT /produtos/:id: Atualiza os dados de um produto pelo seu ID.

°DELETE /produtos/:id: Remove um produto pelo ID.

°GET /produtos/alerta/baixo-estoque: Lista os produtos com estoque abaixo do limite definido (ex: 10 unidades).

## Registro de Movimentações de Estoque
°POST /movimentacoes: Registra entrada ou saída de produto, atualizando o estoque automaticamente.

°GET /movimentacoes: Lista todas as movimentações realizadas, com informações de data, tipo e produto.

## Lógica Aplicada
Movimentações do tipo entrada aumentam a quantidade do estoque.

Movimentações do tipo saída verificam se há estoque suficiente antes de diminuir a quantidade.

Todas as movimentações são registradas com data e horário para manter um histórico confiável.

O sistema gera alertas para produtos com estoque abaixo do limite mínimo configurado, facilitando o controle e reposição.

## Detalhes Adicionais
O sistema foi desenvolvido com base nos requisitos levantados e modelado segundo os princípios de orientação a objetos, conforme ilustrado nos diagramas UML (disponíveis no relatório).

