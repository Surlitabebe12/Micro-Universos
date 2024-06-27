const express = require('express');
const fs = require('fs');
const path = require('path');
const simpleGit = require('simple-git');
const app = express();
const git = simpleGit();

const GITHUB_TOKEN = process.env.GITHUB_TOKEN;  // Utiliza la variable de entorno configurada en Vercel
const GITHUB_REPO = 'https://github.com/Surlitabebe12/Micro-Universos.git';  // Reemplaza con tu repositorio

git.addConfig('user.name', 'Surlitabebe12');  
git.addConfig('user.email', 'rbrea7@hotmail.com');  
git.addConfig('credential.helper', `!echo username=Surlitabebe12 && echo password=${GITHUB_TOKEN}`);  

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

app.get('/api/get-products', (req, res) => {
    const filePath = path.join(__dirname, '..', 'products.json');

    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading products file:', err);
            return res.status(500).send('Error al obtener los productos');
        }

        res.json(JSON.parse(data));
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
