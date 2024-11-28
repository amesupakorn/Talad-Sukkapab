const express = require('express');
const pool = require('./database/db'); 

const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 5001;

app.use(express.json());
app.get('/test', async (req, res) => {
    try {
        const result = await pool.query('SELECT NOW()'); 
        res.json(result.rows);
    } catch (err) {
        console.error('Error acquiring client', err); 
        res.status(500).send('Server Error');
    }
});

app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('Hello from Backend!');
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
