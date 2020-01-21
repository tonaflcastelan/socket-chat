class Users
{
    constructor()
    {
        this.persons = [];
    }

    /**
     * Add one person to persons array
     * @param {int} id
     * @param {*} name
     */
    addPerson(id, name, room)
    {
        let person = {id, name, room};
        this.persons.push(person);
        return this.persons;
    }
    
    /**
     * Get specific person by id
     */
    getPerson(id)
    {
        let person = this.persons.filter(person => person.id === id)[0];
        return person;
    }

    /**
     * Gell al persons
     */
    getAllPersons()
    {
        return this.persons;
    }

    /**
     * Get all persons by room
     */
    getPersonsByRoom(room)
    {
        return this.persons.filter(person => person.room === room);
    }

    /**
     * Remove person from array
     * @param {*} id 
     */
    deletePerson(id)
    {
        let deletedPerson = this.getPerson(id);
        this.persons = this.persons.filter(person => person.id != id);
        return deletedPerson;
    }
}

module.exports = {
    Users
}