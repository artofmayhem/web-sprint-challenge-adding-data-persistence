const server = require('./api/server');

const port = 5813;
const message = "Server Running: localhost:5813"
// START YOUR SERVER HERE
server.listen(port, () => {
    console.log(message)
})