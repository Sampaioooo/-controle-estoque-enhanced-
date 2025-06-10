const db = require('../database/database');

// Cria a tabela de movimentações
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS Movimentacao (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      tipo TEXT NOT NULL, -- 'entrada' ou 'saida'
      quantidade INTEGER NOT NULL,
      dataHora TEXT NOT NULL,
      produtoId INTEGER NOT NULL,
      FOREIGN KEY (produtoId) REFERENCES Produto(id)
    )
  `);
});

module.exports = {
  registrar: ({ tipo, quantidade, produtoId }, callback) => {
    const dataHora = new Date().toISOString();

    // Primeiro busca o produto atual
    db.get(`SELECT quantidade FROM Produto WHERE id = ?`, [produtoId], (err, row) => {
      if (err) return callback(err);
      if (!row) return callback(new Error("Produto não encontrado"));

      let novaQuantidade =
        tipo === 'entrada'
          ? row.quantidade + quantidade
          : row.quantidade - quantidade;

      if (novaQuantidade < 0) {
        return callback(new Error("Estoque insuficiente"));
      }

      // Atualiza a quantidade
      db.run(
        `UPDATE Produto SET quantidade = ? WHERE id = ?`,
        [novaQuantidade, produtoId],
        (err) => {
          if (err) return callback(err);

          // Registra a movimentação
          db.run(
            `INSERT INTO Movimentacao (tipo, quantidade, dataHora, produtoId) VALUES (?, ?, ?, ?)`,
            [tipo, quantidade, dataHora, produtoId],
            function (err) {
              callback(err, this.lastID);
            }
          );
        }
      );
    });
  },

  listar: (callback) => {
    const sql = `
      SELECT M.id, M.tipo, M.quantidade, M.dataHora, P.nome AS produto
      FROM Movimentacao M
      JOIN Produto P ON M.produtoId = P.id
      ORDER BY M.dataHora DESC
    `;
    db.all(sql, [], (err, rows) => {
      callback(err, rows);
    });
  }
};
