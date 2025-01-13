const ContactsRepository = require('../repositories/ContactsRepository');
class ContactController {
  async index(request, response) {
    // listagem de registros
    const contacts = await ContactsRepository.findAll();

    response.json(contacts);
  }

  async show(request, response) {
    // exibir um único registro
    const { id } = request.params;

    const contact = await ContactsRepository.findById(id);

    if (!contact) {
      return response.status(404).json({ error: 'Contact not found' });
    }

    response.json(contact);
  }

  store() {}

  update() {}

  async delete(request, response) {
    // deletar um contato

    const { id } = request.params;

    const contact = await ContactsRepository.findById(id);

    if (!contact) {
      return response.status(404).json({ error: 'Contact not found' });
    }

    await ContactsRepository.delete(id);

    // resposta de sucesso sem conteúdo
    response.sendStatus(204);
  }
}

// design pattern: Singleton
module.exports = new ContactController(); // apenas pode exister UMA instancia do objeto dentro da aplicação. todos que forem usar ContactController vão usar a mesma instancia.
