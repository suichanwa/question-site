const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5002; // Change the port to 5002

app.use(bodyParser.json());

app.post('/save-answers', (req, res) => {
    const { name, surname, answers } = req.body;
    const data = `Name: ${name}\nSurname: ${surname}\nAnswers:\n${answers.join('\n')}\n\n`;
    const filePath = path.join(__dirname, 'answers.txt');

    fs.appendFile(filePath, data, (err) => {
        if (err) {
            console.error('Failed to save answers:', err);
            return res.status(500).send('Failed to save answers.');
        }
        res.send('Answers saved successfully!');
    });
});

app.post('/get-answers', (req, res) => {
    const { name, surname } = req.body;
    const filePath = path.join(__dirname, 'answers.txt');

    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Failed to read answers:', err);
            return res.status(500).send('Failed to read answers.');
        }

        const regex = new RegExp(`Name: ${name}\\nSurname: ${surname}\\nAnswers:\\n([\\s\\S]*?)\\n\\n`, 'g');
        const match = regex.exec(data);

        if (match) {
            res.send(`Your answers:\n${match[1]}`);
        } else {
            res.send('No answers found for the given name and surname.');
        }
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});