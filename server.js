const express = require('express');
const axios = require('axios');
const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files (HTML, CSS, JS)
app.use(express.static('public'));

// IFSC lookup endpoint
app.get('/ifsc', async (req, res) => {
    try {
        const code = req.query.code;
        
        // Validate IFSC code format
        if (!code || code.length !== 11) {
            return res.status(400).json({ error: 'Invalid IFSC code' });
        }
        
        // Use Razorpay IFSC API
        const response = await axios.get(`https://ifsc.razorpay.com/${code}`);
        
        // Send response to client
        res.json(response.data);
    } catch (error) {
        console.error('IFSC lookup error:', error.message);
        res.status(404).json({ error: 'Bank details not found' });
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});