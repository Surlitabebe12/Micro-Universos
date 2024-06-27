const express = require('express');
const fs = require('fs');
const path = require('path');
const simpleGit = require('simple-git');

const app = express();
const git = simpleGit();

app.use(express.json());

app.post('/api/update-products', (req, res) => {
    const products = req.body;
    const filePath = path.join(__dirname, '..', 'products.json');

    fs.writeFile(filePath, JSON.stringify(products, null, 2), (err) => {
        if (err) {
            console.error('Error writing products file:', err);
            return res.status(500).send('Error al actualizar los productos');
        }

        git.add(filePath)
            .commit('Actualización de productos')
            .push('origin', 'main', (err) => {
                if (err) {
                    console.error('Error pushing to GitHub:', err);
                    return res.status(500).send('Error al hacer push en GitHub');
                }

                res.send('Productos actualizados correctamente');
            });
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
