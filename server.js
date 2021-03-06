const express  = require('express')
const app      = express()
const port     = 3000
const server   = app.listen(port, () => {console.log(`Server running at http://localhost:${port}`)})
const io 			 = require('socket.io').listen(server)


app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html')
})

app.use(express.static('.'))



io.on('connection', function (socket) {
  socket.on('username', (data) =>{
    socket.broadcast.emit('username', data)
  })
	
  // Listen for a "newuser" message
  socket.on('chatmsg', (data) => {
    // Transmit a message to everyone except the sender
      socket.broadcast.emit('chatmsg', data)

    // The same message, sent to all users - try it!
    //io.emit('newuser', data)
	})
	 
	
	// Listen for "chatmsg"
	//   io.emit to all user
	socket.on('message', (data) => {
		io.emit('message', data)
	})

})
