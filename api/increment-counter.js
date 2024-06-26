const fs = require('fs');
const path = require('path');

export default async (req, res) => {
    const counterPath = path.join(process.cwd(), 'counter.txt');

    try {
        // Leer el contenido actual del archivo counter.txt
        let counter = parseInt(fs.readFileSync(counterPath, 'utf-8'), 10);

        // Incrementar el contador
        counter += 1;

        // Escribir el nuevo valor en counter.txt
        fs.writeFileSync(counterPath, counter.toString(), 'utf-8');

        res.status(200).json({ counter });
    } catch (error) {
        res.status(500).json({ error: 'Error incrementing counter' });
    }
};
