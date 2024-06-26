const fs = require('fs');
const path = require('path');

export default async (req, res) => {
    const counterPath = path.join('/tmp', 'counter.txt');

    try {
        console.log('Reading counter from:', counterPath);

        // Si el archivo no existe, crearlo con un valor inicial de 0
        if (!fs.existsSync(counterPath)) {
            console.log('File does not exist, creating file with initial value 0');
            fs.writeFileSync(counterPath, '0', 'utf-8');
        }

        let counter = parseInt(fs.readFileSync(counterPath, 'utf-8'), 10);
        console.log('Current counter value:', counter);

        if (isNaN(counter)) {
            console.error('Counter is not a number:', counter);
            res.status(500).json({ error: 'Counter value is not a number' });
            return;
        }

        counter += 1;

        fs.writeFileSync(counterPath, counter.toString(), 'utf-8');
        console.log('New counter value:', counter);

        res.status(200).end(); // Responder con un estado 200 sin contenido
    } catch (error) {
        console.error('Error incrementing counter:', error);
        res.status(500).json({ error: 'Error incrementing counter' });
    }
};
