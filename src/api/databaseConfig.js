const { Client } = require('pg');

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

module.exports = conn;