const express = require('express')
const app = express()
const http = require('http').createServer(app)
const io = require('socket.io')(http, {
  cors: { origin: '*' }
})

// Fake DB
const users = {}
const channels = {
  'general': []
}

// Подключение сокета
// В обработчике connection
io.on('connection', socket => {
  console.log('Новый пользователь:', socket.id)
  
  // Отправляем тестовое сообщение
  socket.emit('message', { 
    user: 'Сервер', 
    text: 'Привет от сервера!' 
  })
  
  // Обработчик для тестовых сообщений
  socket.on('send-message', message => {
    console.log('Получено сообщение от клиента:', message)
    socket.emit('message', {
      user: 'Сервер',
      text: `Вы сказали: "${message}"`
    })
  })
  socket.on('call-user', (data) => {
    io.to(data.to).emit('call-incoming', {
      callerId: socket.id,
      callerName: users[socket.id].username,
      signal: data.signal
    });
  });
  
  // Принятие звонка
  socket.on('call-accepted', (data) => {
    io.to(data.to).emit('call-accepted', {
      signal: data.signal
    });
  });
  
  // Завершение звонка
  socket.on('call-end', () => {
    socket.broadcast.emit('call-ended');
  });
});



http.listen(3000, () => console.log('Сервер запущен на порту 3000'))
