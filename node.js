const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// Route to handle survey submission
app.post('/submit-survey', (req, res) => {
    const surveyData = req.body;

    // Save the survey data to a file
    const filePath = path.join(__dirname, 'survey-results.json');

    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err && err.code !== 'ENOENT') { // Handle error unless file doesn't exist yet
            console.error('Error reading survey results file:', err);
            return res.status(500).json({ message: 'Error saving survey results.' });
        }

        const existingData = data ? JSON.parse(data) : [];
        existingData.push(surveyData);

        fs.writeFile(filePath, JSON.stringify(existingData, null, 2), (err) => {
            if (err) {
                console.error('Error writing survey results file:', err);
                return res.status(500).json({ message: 'Error saving survey results.' });
            }

            res.json({ message: 'Survey results saved successfully.' });
        });
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
