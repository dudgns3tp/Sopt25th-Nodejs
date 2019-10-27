const http = require('http');

http.createServer((req,res)=>{
    console.log('get message');
    res.writeHead(200, {'Content-Type': 'text/plan'});
    res.write('Hello world');
    res.end();
}).listen(3000);
