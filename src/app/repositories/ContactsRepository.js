const { v4 } = require('uuid');

let contacts = [
  {
    id: v4(),
    name: 'Dudu',
    email: 'dudu@gmail.com',
    phone: '123123123',
    category_id: v4(),
  },
  {
    id: v4(),
    name: 'breno',
    email: 'breno@gmail.com',
    phone: '123456789',
    category_id: v4(),
  },
];

class ContactsRepository {
  findAll() {
    return new Promise((resolve) => resolve(contacts));
  }

  findById(id) {
    return new Promise((resolve) =>
      resolve(contacts.find((contact) => contact.id === id)),
    );
  }

  delete(id) {
    return new Promise((resolve) => {
      contacts = contacts.filter((contact) => contact.id !== id); // contatos recebe todos os contatos que não tem o id passado
      resolve();
    });
  }

  findByEmail(email) {
    return new Promise((resolve) =>
      resolve(contacts.find((contact) => contact.email === email)),
    );
  }

  create({ name, email, phone, category_id }) {
    return new Promise((resolve) => {
      const newContact = { id: v4(), name, email, phone, category_id };

      contacts.push(newContact);

      resolve(newContact);
    });
  }
}

module.exports = new ContactsRepository(); // Singleton: exporta uma unica instancia do repositorio
