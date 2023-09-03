const express = require('express');
const router = express.Router();
const conn = require('./databaseConfig');

// Ruta para la autenticación de inicio de sesión
router.post('/login', (req, res) => {
    const { email, contraseña } = req.body;

    // Realiza la autenticación del usuario en la base de datos
    const query = 'SELECT id FROM usuarios WHERE email = $1 AND contraseña = $2';
    conn.query(query, [email, contraseña])
        .then(result => {
            if (result.rows.length > 0) {
                const usuarioId = result.rows[0].id;

                // Guarda el ID del usuario en una cookie
                res.cookie('usuarioId', usuarioId, { path: '/' });

                // Credenciales válidas
                res.json({ success: true, id: usuarioId });
            } else {
                // Credenciales incorrectas
                res.json({ success: false });
            }
        })
        .catch(err => {
            console.error('Error al iniciar sesión:', err);
            res.status(500).json({ error: 'Error al iniciar sesión' });
        });
});

module.exports = router;
