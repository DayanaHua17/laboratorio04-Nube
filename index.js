const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// Conectar a MongoDB
mongoose.connect('mongodb://mongo:27017/miapp', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Esquemas
const Cliente = mongoose.model('Cliente', new mongoose.Schema({
  nombre: String,
  email: String
}));

const Producto = mongoose.model('Producto', new mongoose.Schema({
  nombre: String,
  precio: Number
}));

// Rutas
app.get('/', (req, res) => res.send('API funcionando'));

app.get('/clientes', async (req, res) => res.json(await Cliente.find()));
app.post('/clientes', async (req, res) => res.json(await Cliente.create(req.body)));
app.put('/clientes/:id', async (req, res) => res.json(await Cliente.findByIdAndUpdate(req.params.id, req.body)));
app.delete('/clientes/:id', async (req, res) => res.json(await Cliente.findByIdAndDelete(req.params.id)));

app.get('/productos', async (req, res) => res.json(await Producto.find()));
app.post('/productos', async (req, res) => res.json(await Producto.create(req.body)));
app.put('/productos/:id', async (req, res) => res.json(await Producto.findByIdAndUpdate(req.params.id, req.body)));
app.delete('/productos/:id', async (req, res) => res.json(await Producto.findByIdAndDelete(req.params.id)));

app.listen(PORT, () => console.log(`Servidor backend en puerto ${PORT}`));
