const express = require('express');
const app = express();
const path = require('path');
const registroApi = require('./api/registroApi'); // Ajusta la ruta según la ubicación real

// Configura la ruta para servir archivos estáticos
app.use(express.static(path.join(__dirname, '../public')));
app.use(express.json());
app.use('/api/registro', registroApi); // Establece la ruta base para el registroApi

// Ruta principal
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname,'index.html'));
});
app.get('/paginaPrincipal', (req, res) => {
  res.sendFile(path.join(__dirname, 'paginaPrincipal.html'));
});
app.get('/crearPeticiones', (req, res) => {
  res.sendFile(path.join(__dirname, 'crearPeticiones.html'));
});

app.get('/inicioSesion', (req, res) => {
  res.sendFile(path.join(__dirname, 'inicioSesion.html'));
});

app.get('/paginaRegistro', (req, res) => {
  res.sendFile(path.join(__dirname, 'paginaRegistro.html'));
});

app.get('/reseteo', (req, res) => {
  res.sendFile(path.join(__dirname, 'reseteo.html'));
});

app.get('/perfil', (req, res) => {
  res.sendFile(path.join(__dirname, 'perfil.html'));
});

// Inicia el servidor
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Servidor web iniciado en el puerto ${port}`);
});
