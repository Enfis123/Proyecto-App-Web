const express = require('express');
const router = express.Router();
const conn = require('./databaseConfig');

// Crear un nuevo perfil para un usuario
router.post('/', (req, res) => {
  const { user_id, profile_picture_url } = req.body;

  const query = 'INSERT INTO perfiles (user_id, profile_picture_url) VALUES ($1, $2)';
  conn.query(query, [user_id, profile_picture_url])
    .then(() => {
      res.json({ success: true });
    })
    .catch(err => {
      console.error('Error al crear un nuevo perfil:', err);
      res.status(500).json({ error: 'Error al crear un nuevo perfil' });
    });
});

// Obtener el perfil de un usuario por su ID
router.get('/:user_id', (req, res) => {
  const { user_id } = req.params;

  const query = 'SELECT * FROM perfiles WHERE user_id = $1';
  conn.query(query, [user_id])
    .then(result => {
      if (result.rows.length > 0) {
        res.json(result.rows[0]);
      } else {
        res.json({ success: false, message: 'Perfil no encontrado' });
      }
    })
    .catch(err => {
      console.error('Error al obtener el perfil:', err);
      res.status(500).json({ error: 'Error al obtener el perfil' });
    });
});

// Actualizar el perfil de un usuario
router.put('/:user_id', (req, res) => {
  const { user_id } = req.params;
  const { profile_picture_url } = req.body;

  const query = 'UPDATE perfiles SET profile_picture_url = $1 WHERE user_id = $2';
  conn.query(query, [profile_picture_url, user_id])
    .then(() => {
      res.json({ success: true });
    })
    .catch(err => {
      console.error('Error al actualizar el perfil:', err);
      res.status(500).json({ error: 'Error al actualizar el perfil' });
    });
});

// Eliminar el perfil de un usuario
router.delete('/:user_id', (req, res) => {
  const { user_id } = req.params;

  const query = 'DELETE FROM perfiles WHERE user_id = $1';
  conn.query(query, [user_id])
    .then(() => {
      res.json({ success: true });
    })
    .catch(err => {
      console.error('Error al eliminar el perfil:', err);
      res.status(500).json({ error: 'Error al eliminar el perfil' });
    });
});

module.exports = router;
