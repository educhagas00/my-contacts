const ContactsRepository = require('../repositories/ContactsRepository');
class ContactController {
  async index(request, response) {
    // listagem de registros
    const contacts = await ContactsRepository.findAll();

    response.json(contacts);
  }

  show() {
    // exibir um único registro
  }

  store() {}

  update() {}

  delete() {}
}

// design pattern: Singleton
module.exports = new ContactController(); // apenas pode exister UMA instancia do objeto dentro da aplicação. todos que forem usar ContactController vão usar a mesma instancia.
