const express = require('express');
const app = express();
const path = require('path');
const cookieParser = require('cookie-parser');
const registroApi = require('./api/registroApi'); // Ajusta la ruta según la ubicación real
const perfilesApi = require('./api/perfilesApi'); // Importa el archivo perfilesApi.js
const monedaDeTiempoApi = require('./api/monedaTiempoApi'); // Importa el archivo perfilesApi.js
const peticionesApi = require('./api/peticionesApi'); // Importa el archivo peticionesApi.js
const editarPerfilApi = require('./api/editarPerfilApi'); // Ajusta la ruta según la ubicación real
const loginApi = require('./api/loginApi'); // Ajusta la ruta según la ubicación real

app.use(cookieParser());
// Configura la ruta para servir archivos estáticos
app.use(express.static(path.join(__dirname, '../public')));
app.use(express.json());
app.use('/api/registro', registroApi); // Establece la ruta base para el registroApi
app.use('/api/perfiles', perfilesApi); // Establece la ruta base para el perfilesApi
app.use('/api/monedaTiempo', monedaDeTiempoApi);
app.use('/api/peticiones', peticionesApi); // Establece la ruta base para el peticionesApi
app.use('/api/editarPerfil', editarPerfilApi); // Establece la ruta base para el registroApi
app.use('/api/login', loginApi); // Establece la ruta base para el registroApi

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
app.get('/editarPerfil', (req, res) => {
  res.sendFile(path.join(__dirname, 'editarPerfil.html'));
});
// Inicia el servidor
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Servidor web iniciado en el puerto ${port}`);
});
