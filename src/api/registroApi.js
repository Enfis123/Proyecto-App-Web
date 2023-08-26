const express = require('express');
const router = express.Router();
const { Client } = require('pg');

// Configuración de la conexión a la base de datos
const conn = new Client({
  host: "esquel.postgres.database.azure.com",
  user: "Administrador",
  password: "Esquel123.",
  database: "postgres", 
  port: 5432,
  ssl: true
});

// Conectar a la base de datos
conn.connect()
  .then(() => {
    console.log('Conexión exitosa a la base de datos');
  })
  .catch(err => {
    console.error('Error al conectar a la base de datos:', err);
  });

// Ruta para crear un nuevo registro
router.post('/', (req, res) => {
  const { nombre, apellido, email, contraseña } = req.body;

  // Aquí deberías implementar técnicas de hash y salting para la contraseña antes de guardarla

  const query = 'INSERT INTO usuarios (nombre, apellido, email, contraseña) VALUES ($1, $2, $3, $4)';
  conn.query(query, [nombre, apellido, email, contraseña])
    .then(() => {
      res.json({ success: true });
    })
    .catch(err => {
      console.error('Error al crear un nuevo registro:', err);
      res.status(500).json({ error: 'Error al crear un nuevo registro' });
    });
});

// Ruta para obtener todos los registros
router.get('/', (req, res) => {
  const query = 'SELECT * FROM usuarios';
  conn.query(query)
    .then(result => {
      res.json(result.rows);
    })
    .catch(err => {
      console.error('Error al obtener los registros:', err);
      res.status(500).json({ error: 'Error al obtener los registros' });
    });
});

// Ruta para eliminar un registro
router.delete('/:id', (req, res) => {
  const { id } = req.params;

  const query = 'DELETE FROM usuarios WHERE id = $1';
  conn.query(query, [id])
    .then(() => {
      res.json({ success: true });
    })
    .catch(err => {
      console.error('Error al eliminar el registro:', err);
      res.status(500).json({ error: 'Error al eliminar el registro' });
    });
});
// Nueva ruta para el inicio de sesión
router.post('/login', (req, res) => {
  const { email, contraseña } = req.body;

  const query = 'SELECT * FROM usuarios WHERE email = $1 AND contraseña = $2';
  conn.query(query, [email, contraseña])
    .then(result => {
      if (result.rows.length > 0) {
        // Credenciales válidas
        res.json({ success: true });
      } else {
        // Credenciales incorrectas
        res.json({ success: false });
      }
    })
    .catch(err => {
      console.error('Error al verificar las credenciales:', err);
      res.status(500).json({ error: 'Error al verificar las credenciales' });
    });
});
// Ruta para buscar un usuario por correo
router.post('/buscarPorCorreo', (req, res) => {
  const { email } = req.body;

  const query = 'SELECT * FROM usuarios WHERE email = $1';
  conn.query(query, [email])
    .then(result => {
      if (result.rows.length > 0) {
        res.json({ success: true });
      } else {
        res.json({ success: false });
      }
    })
    .catch(err => {
      console.error('Error al buscar usuario por correo:', err);
      res.status(500).json({ error: 'Error al buscar usuario por correo' });
    });
});
// Ruta para actualizar la contraseña de un usuario
router.put('/actualizarContrasena', (req, res) => {
  const { email, contraseña } = req.body;

  const query = 'UPDATE usuarios SET contraseña = $1 WHERE email = $2';
  conn.query(query, [contraseña, email])
    .then(() => {
      res.json({ success: true });
    })
    .catch(err => {
      console.error('Error al actualizar contraseña:', err);
      res.status(500).json({ error: 'Error al actualizar contraseña' });
    });
});

module.exports = router;
