const express = require('express');
const dotenv = require('dotenv');

dotenv.config();
const app = express();

app.use(express.json());

// Placeholder routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/cart', require('./routes/cart'));
app.use('/api/orders', require('./routes/orders'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
