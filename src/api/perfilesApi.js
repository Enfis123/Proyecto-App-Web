const express = require('express');
const router = express.Router();
const conn = require('./databaseConfig');

// Ruta para obtener el perfil de usuario por su ID
router.get('/', (req, res) => {
  const { usuarioId } = req.cookies; // Obtener el ID del usuario de la cookie

  const query = 'SELECT nombre, email FROM usuarios WHERE id = $1';
  conn.query(query, [usuarioId])
      .then(result => {
        if (result.rows.length > 0) {
          // Se encontró un perfil con el ID del usuario
          const usuario = result.rows[0];
          res.json(usuario);
        } else {
          // No se encontró un perfil con el ID proporcionado
          res.status(404).json({ error: 'Perfil no encontrado' });
        }
      })
      .catch(err => {
        console.error('Error al obtener el perfil:', err);
        res.status(500).json({ error: 'Error al obtener el perfil' });
      });
});

module.exports = router;
