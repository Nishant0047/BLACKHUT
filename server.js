const express = require('express');
const app = express();
const path = require('path');
const port = 3000;

// Serve static files from the current directory
app.use(express.static(path.join(__dirname)));

app.use(express.json());

const OPENAI_API_KEY = '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';
const axios = require('axios');

app.post('/chat', async (req, res) => {
    console.log('Incoming request to /chat:', req.body); 
    try {
        const { message } = req.body;
        console.log('Received message:', message); 
        console.log('Sending request to OpenAI API with message:', message); 
        const response = await axios.post('https://api.openai.com/v1/completions', {
            model: 'text-davinci-003',
            prompt: message,
            max_tokens: 2048,
            temperature: 0.7,
        }, {
            headers: {
                'Authorization': `Bearer ${OPENAI_API_KEY}`,
                'Content-Type': 'application/json'
            }
        });
        res.json({ response: response.data.choices[0].text });
    } catch (error) {
        console.error('Error occurred while processing the request:', error.message); // Log the error message
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
