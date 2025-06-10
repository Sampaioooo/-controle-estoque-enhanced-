const db = require('../database/database');

db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS Produto (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nome TEXT NOT NULL,
      preco REAL NOT NULL,
      quantidade INTEGER NOT NULL,
      categoria TEXT
    )
  `);
});

module.exports = {
  criar: (produto, callback) => {
    const { nome, preco, quantidade, categoria } = produto;
    const sql = `INSERT INTO Produto (nome, preco, quantidade, categoria) VALUES (?, ?, ?, ?)`;
    db.run(sql, [nome, preco, quantidade, categoria], function (err) {
      callback(err, this.lastID);
    });
  },

  listar: (callback) => {
    const sql = `SELECT * FROM Produto`;
    db.all(sql, [], (err, rows) => {
      callback(err, rows);
    });
  },

  atualizar: (id, produto, callback) => {
    const { nome, preco, quantidade, categoria } = produto;
    const sql = `UPDATE Produto SET nome = ?, preco = ?, quantidade = ?, categoria = ? WHERE id = ?`;
    db.run(sql, [nome, preco, quantidade, categoria, id], function (err) {
      callback(err);
    });
  },

  deletar: (id, callback) => {
    const sql = `DELETE FROM Produto WHERE id = ?`;
    db.run(sql, [id], function (err) {
      callback(err);
    });
  },

  listarBaixoEstoque: (limite, callback) => {
    const sql = `SELECT * FROM Produto WHERE quantidade <= ?`;
    db.all(sql, [limite], (err, rows) => {
      callback(err, rows);
    });
  }
};
