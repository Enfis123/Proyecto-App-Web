const express = require('express');
const router = express.Router();
const conn = require('./databaseConfig');

// Función para obtener el valor de una cookie por su nombre
function getCookieValue(name) {
    const cookies = document.cookie.split('; ');
    for (const cookie of cookies) {
        const [cookieName, cookieValue] = cookie.split('=');
        if (cookieName === name) {
            return decodeURIComponent(cookieValue);
        }
    }
    return null; // Si no se encuentra la cookie
}



// Ruta para obtener un perfil de usuario por su ID
router.get('/', (req, res) => {
    const { usuarioId } = req.cookies; // Obtener el ID del usuario de la cookie

    const query = 'SELECT * FROM usuarios WHERE id = $1';
    conn.query(query, [usuarioId])
        .then(result => {
            if (result.rows.length > 0) {
                // Se encontró un perfil con el ID del usuario
                res.json(result.rows[0]);
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

// Ruta para actualizar un perfil de usuario
router.put('/', (req, res) => {

    const { usuarioId } = req.cookies; // Obtener el ID del usuario de la cookie
    const { firstName, lastName, email } = req.body;

    const query = 'UPDATE usuarios SET nombre = $1, apellido = $2, email = $3 WHERE id = $4';
    conn.query(query, [firstName, lastName, email, usuarioId])
        .then(() => {
            res.json({ success: true });
        })
        .catch(err => {
            console.error('Error al actualizar el perfil:', err);
            res.status(500).json({ error: 'Error al actualizar el perfil' });
        });
});

// Ruta para eliminar un usuario
router.delete('/eliminarUsuario', (req, res) => {
    const { usuarioId } = req.cookies; // Obtener el ID del usuario de la cookie

    const query = 'DELETE FROM usuarios WHERE id = $1';
    conn.query(query, [usuarioId])
        .then(() => {
            res.json({ success: true });
        })
        .catch(err => {
            console.error('Error al eliminar el usuario:', err);
            res.status(500).json({ error: 'Error al eliminar el usuario' });
        });
});


module.exports = router;
