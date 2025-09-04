require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const userRoutes = require('./routes/userRoutes');

const app = express();
app.use(bodyParser.json());

// Serve static files (HTML, CSS, etc.)
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api', userRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

app.get('/secret', async (req, res) => {
  try {
    const secret = await client.getSecret('DB');
    res.send(secret.value);
  } catch (error) {
    console.log(error);
    res.send(error);
  }
});
