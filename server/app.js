const express = require('express')
var path = require('path');
const app = express()
const port = 3000

app.use('/static', express.static(path.join(__dirname, 'public')))

app.get('/', (req, res) => {
  res.send('hello world')
});

const server = app.listen(port, () => {
  console.log(`App listening on port ${port}!`);
});

const io = require('socket.io')(server)

io.on('connection', function(socket) {
  console.log("socket id: " + socket.id);
  socket.on('SEND_MESSAGE', function(data) {
    if(data.message_type == "goodnight") {
      data.message = "http://localhost:3000/static/images/goodnight.jpg"
    }
    io.emit('MESSAGE', data)
  })
})
