var socket = io();

var params = new URLSearchParams(window.location.search);

if (!params.has('name') || !params.has('room')) {
    window.location = 'index.html';
    throw new Error('El nombre y la sala son necesarios.')
}

var user = {
    name: params.get('name'),
    room: params.get('room')
};

socket.on('connect', function() {
    console.log('Conectado al servidor');

    socket.emit('joinChat', user, function(resp) {
        usersRender(resp);
    });
});

// escuchar
socket.on('disconnect', function() {

    console.log('Perdimos conexión con el servidor');

});


// Enviar información
socket.emit('createMessage', {
    user: 'Tonatiuh',
    message: 'Hola Mundo'
}, function(resp) {
    console.log('respuesta server: ', resp);
});

// Escuchar información
socket.on('createMessage', function(message) {
    renderMessage(message, false);
    scrollBottom();
});

socket.on('personList', function(message) {
    usersRender(message);
});

// Mensajes privados
socket.on('privateMessage', function(message) {
    console.log(message);
});