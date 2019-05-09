var http = require('http')
const port = 5500

http.createServer().listen(port)
console.log(`Server listening on port: ${port}`)