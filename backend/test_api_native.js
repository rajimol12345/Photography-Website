const http = require('http');

http.get('http://127.0.0.1:5000/api/portfolio', (res) => {
    console.log('Status Code:', res.statusCode);
    let data = '';
    res.on('data', (chunk) => { data += chunk; });
    res.on('end', () => {
        try {
            const parsed = JSON.parse(data);
            console.log('Data Type:', Array.isArray(parsed) ? 'Array' : typeof parsed);
            console.log('Data Length:', Array.isArray(parsed) ? parsed.length : 'N/A');
            if (Array.isArray(parsed) && parsed.length > 0) {
                console.log('First Item Title:', parsed[0].title);
            }
        } catch (e) {
            console.log('Error parsing JSON:', e.message);
            console.log('Raw Data:', data.substring(0, 100));
        }
    });
}).on('error', (err) => {
    console.error('Error:', err.message);
});
