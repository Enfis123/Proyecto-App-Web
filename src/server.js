const express = require('express');
const app = express();
const path = require('path');

// Configura la ruta para servir archivos estáticos
app.use(express.static(path.join(__dirname, '../public')));

// Ruta principal
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname,'index.html'));
});
app.get('/paginaPrincipal', (req, res) => {
  res.sendFile(path.join(__dirname, 'paginaPrincipal.html'));
});

// Inicia el servidor
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Servidor web iniciado en el puerto ${port}`);
});
