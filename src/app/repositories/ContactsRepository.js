const { v4 } = require('uuid');

const contacts = [
  {
    id: v4(),
    name: 'Dudu',
    email: 'dudu@gmail.com',
    phone: '123123123',
    category_id: v4(),
  },
];

class ContactsRepository {
  findAll() {
    return new Promise((resolve) => resolve(contacts));
  }
}

module.exports = new ContactsRepository(); // Singleton: exporta uma unica instancia do repositorio
