const express = require('express');
const router = express.Router();
const conn = require('./databaseConfig');

// Crear una nueva petición
router.post('/', (req, res) => {
  const { user_id, skills, title, description, coins_required } = req.body;

  const query = 'INSERT INTO Peticiones (user_id, skills, title, description, coins_required) VALUES ($1, $2, $3, $4, $5)';
  conn.query(query, [user_id, skills, title, description, coins_required])
    .then(() => {
      res.json({ success: true });
    })
    .catch(err => {
      console.error('Error al crear una nueva petición:', err);
      res.status(500).json({ error: 'Error al crear una nueva petición' });
    });
});

// Obtener todas las peticiones
router.get('/', (req, res) => {
  const query = 'SELECT * FROM Peticiones';
  conn.query(query)
    .then(result => {
      res.json(result.rows);
    })
    .catch(err => {
      console.error('Error al obtener las peticiones:', err);
      res.status(500).json({ error: 'Error al obtener las peticiones' });
    });
});

// Obtener una petición por su ID
router.get('/:request_id', (req, res) => {
  const { request_id } = req.params;

  const query = 'SELECT * FROM Peticiones WHERE request_id = $1';
  conn.query(query, [request_id])
    .then(result => {
      if (result.rows.length > 0) {
        res.json(result.rows[0]);
      } else {
        res.json({ success: false, message: 'Petición no encontrada' });
      }
    })
    .catch(err => {
      console.error('Error al obtener la petición:', err);
      res.status(500).json({ error: 'Error al obtener la petición' });
    });
});

// Actualizar una petición por su ID
router.put('/:request_id', (req, res) => {
  const { request_id } = req.params;
  const { skills, title, description, coins_required } = req.body;

  const query = 'UPDATE Peticiones SET skills = $1, title = $2, description = $3, coins_required = $4 WHERE request_id = $5';
  conn.query(query, [skills, title, description, coins_required, request_id])
    .then(() => {
      res.json({ success: true });
    })
    .catch(err => {
      console.error('Error al actualizar la petición:', err);
      res.status(500).json({ error: 'Error al actualizar la petición' });
    });
});

// Eliminar una petición por su ID
router.delete('/:request_id', (req, res) => {
  const { request_id } = req.params;

  const query = 'DELETE FROM Peticiones WHERE request_id = $1';
  conn.query(query, [request_id])
    .then(() => {
      res.json({ success: true });
    })
    .catch(err => {
      console.error('Error al eliminar la petición:', err);
      res.status(500).json({ error: 'Error al eliminar la petición' });
    });
});

module.exports = router;
