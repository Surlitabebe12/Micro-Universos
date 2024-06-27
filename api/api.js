const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const port = 3000;

app.use(express.json());

// Ruta para obtener los productos
app.get('/api/get-products', (req, res) => {
    const filePath = path.join(__dirname, 'products.json');

    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading products file:', err);
            return res.status(500).send('Error al obtener los productos');
        }

        res.json(JSON.parse(data));
    });
});

// Ruta para actualizar los productos
app.post('/api/update-products', (req, res) => {
    const products = req.body;
    const filePath = path.join(__dirname, 'products.json');

    fs.writeFile(filePath, JSON.stringify(products, null, 2), (err) => {
        if (err) {
            console.error('Error writing products file:', err);
            return res.status(500).send('Error al actualizar los productos');
        }

        res.send('Productos actualizados correctamente');
    });
});

app.listen(port, () => {
    console.log(`Servidor escuchando en el puerto ${port}`);
});
