const express = require('express');
const router = express.Router();
const conn = require('./databaseConfig');

// Crear una nueva entrada de moneda de tiempo
router.post('/', (req, res) => {
  const { user_id, balance } = req.body;

  const query = 'INSERT INTO MonedaDeTiempo (user_id, balance) VALUES ($1, $2)';
  conn.query(query, [user_id, balance])
    .then(() => {
      res.json({ success: true });
    })
    .catch(err => {
      console.error('Error al crear una nueva entrada de moneda de tiempo:', err);
      res.status(500).json({ error: 'Error al crear una nueva entrada de moneda de tiempo' });
    });
});

// Obtener el balance de moneda de tiempo por user_id
router.get('/:user_id', (req, res) => {
  const { user_id } = req.params;

  const query = 'SELECT * FROM MonedaDeTiempo WHERE user_id = $1';
  conn.query(query, [user_id])
    .then(result => {
      if (result.rows.length > 0) {
        res.json(result.rows[0]);
      } else {
        res.json({ success: false, message: 'Entrada de moneda de tiempo no encontrada' });
      }
    })
    .catch(err => {
      console.error('Error al obtener la entrada de moneda de tiempo:', err);
      res.status(500).json({ error: 'Error al obtener la entrada de moneda de tiempo' });
    });
});

// Actualizar el balance de moneda de tiempo por user_id
router.put('/:user_id', (req, res) => {
  const { user_id } = req.params;
  const { balance } = req.body;

  const query = 'UPDATE MonedaDeTiempo SET balance = $1 WHERE user_id = $2';
  conn.query(query, [balance, user_id])
    .then(() => {
      res.json({ success: true });
    })
    .catch(err => {
      console.error('Error al actualizar el balance de moneda de tiempo:', err);
      res.status(500).json({ error: 'Error al actualizar el balance de moneda de tiempo' });
    });
});

// Eliminar la entrada de moneda de tiempo por user_id
router.delete('/:user_id', (req, res) => {
  const { user_id } = req.params;

  const query = 'DELETE FROM MonedaDeTiempo WHERE user_id = $1';
  conn.query(query, [user_id])
    .then(() => {
      res.json({ success: true });
    })
    .catch(err => {
      console.error('Error al eliminar la entrada de moneda de tiempo:', err);
      res.status(500).json({ error: 'Error al eliminar la entrada de moneda de tiempo' });
    });
});

module.exports = router;
