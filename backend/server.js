const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/database');

// Cargar variables de entorno
dotenv.config();

// Conectar a la base de datos
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Rutas
app.use('/api/auth', require('./routes/auth'));
app.use('/api/products', require('./routes/products'));
app.use('/api/orders', require('./routes/orders'));
app.use('/api/users', require('./routes/users'));
app.use('/api/loyalty', require('./routes/loyalty'));
app.use('/api/returns', require('./routes/returns'));

// TODO: Añadir más rutas según sea necesario
// app.use('/api/reviews', require('./routes/reviews'));
// app.use('/api/categories', require('./routes/categories'));

// Manejo de errores global
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// TODO: Implementar middleware de autenticación global si es necesario
// app.use(authMiddleware);

// TODO: Configurar seguridad adicional (helmet, rate limiting, etc.)
// const helmet = require('helmet');
// app.use(helmet());

module.exports = app;

