const axios = require('axios');

const testApi = async () => {
    try {
        const response = await axios.get('http://127.0.0.1:5000/api/portfolio');
        console.log('Status:', response.status);
        console.log('Data Type:', Array.isArray(response.data) ? 'Array' : typeof response.data);
        console.log('Data Length:', response.data.length);
        console.log('First Item Title:', response.data[0]?.title);
    } catch (error) {
        console.error('API Test Failed:', error.message);
    }
};

testApi();
