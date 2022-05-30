const express = require('express')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const config = require('./src/config/index')
const errorMiddleware = require('./src/errors/errorHandler')


const app = express()
const PORT = config.PORT || 5000

const http = require('http').Server(app)
const io = require('socket.io')(http)



app.use(express.json())
app.use(cookieParser());
app.use(cors())

require('./src/routes/index')(app)
app.use(errorMiddleware)

const start = async () => {
    try {
        app.listen(PORT, () => console.log(`Server started work on port ${PORT}`))
    } catch (error) {
        console.log(error)
    }
}
io.on('connection', function (socket) {
    socket.emit('pushNotification', { success: true, msg: 'Update done' });
  });
start();
 