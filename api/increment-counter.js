const fs = require('fs');
const path = require('path');

export default async (req, res) => {
    const counterPath = path.join(process.cwd(), 'counter.txt');

    try {
        console.log('Reading counter from:', counterPath);
        
        // Verificar si el archivo existe antes de leer
        if (!fs.existsSync(counterPath)) {
            console.error('File does not exist:', counterPath);
            res.status(500).json({ error: 'Counter file not found' });
            return;
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

        res.status(200).json({ counter });
    } catch (error) {
        console.error('Error incrementing counter:', error);
        res.status(500).json({ error: 'Error incrementing counter' });
    }
};
