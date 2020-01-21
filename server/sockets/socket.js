const { io } = require('../server');
const {Users} = require('../classes/users');
const {createMessage} = require('../utils/utils');

const users = new Users();
io.on('connection', (client) => {

    client.on('joinChat', (data, callback) => {
        console.log('data ', data);
        if (!data.name || !data.room) {
            return callback({
                error: true,
                message: 'El nombre es necesario'
            });
        }

        client.join(data.room);
        users.addPerson(client.id, data.name, data.room)

        client.broadcast.to(data.room).emit('personList', users.getPersonsByRoom(data.room));
        callback(users.getPersonsByRoom(data.room));
    });

    client.on('createMessage', (data) => {
        let person = users.getPerson(client.id);
        let message = createMessage(person.name, data.message);
        client.broadcast.to(person.room).emit('createMessage', message)
    });

    client.on('disconnect', () => {
        let deletedPerson = users.deletePerson(client.id)
        client.broadcast.to(deletedPerson.room).emit('createMessage', createMessage('Admin', `${deletedPerson.name} salió`));
        client.broadcast.to(deletedPerson.room).emit('personList', users.getPersonsByRoom(deletedPerson.room));
    });

    // Mensajes privados
    client.on('privateMessage', data => {
        let person = users.getPerson(client.id);
        client.broadcast.to(data.to).emit('privateMessage', createMessage(person.name, data.message));
    });
});