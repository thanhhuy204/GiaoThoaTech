const https = require('https');

https.get('https://giaothoatech.cloud/api/api-docs-json', (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    try {
      const swagger = JSON.parse(data);
      for (const [path, methods] of Object.entries(swagger.paths)) {
        for (const [method, desc] of Object.entries(methods)) {
          if (desc.operationId && desc.operationId.toLowerCase().includes('usercontroller_updateone')) {
            console.log(`FOUND: ${method.toUpperCase()} ${path}`);
          }
        }
      }
    } catch (e) { console.error('Error parsing JSON or not json'); }
  });
}).on('error', err => console.error(err));
