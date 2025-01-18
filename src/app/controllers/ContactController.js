const { response } = require('express');
const ContactsRepository = require('../repositories/ContactsRepository');
class ContactController {
  async index(request, response) {
    // listagem de registros

    const { orderBy } = request.query;

    const contacts = await ContactsRepository.findAll(orderBy);

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

  async store(request, response) {
    // criar um novo contato
    const { name, email, phone, category_id } = request.body;

    if (!name) {
      return response.status(400).json({ error: 'name is required' });
    }

    const emailExists = await ContactsRepository.findByEmail(email);

    if (emailExists) {
      return response.status(404).json({ error: 'email already taken' });
    }

    const contact = await ContactsRepository.create({
      name,
      email,
      phone,
      category_id,
    });

    response.json(contact);
  }

  async update(request, response) {
    const { id } = request.params;
    const { name, email, phone, category_id } = request.body;

    const contactExists = await ContactsRepository.findById(id);

    if (!contactExists) {
      return response.status(404).json({ error: 'Contact not found' });
    }

    if (!name) {
      return response.status(400).json({ error: 'name is required' });
    }

    const emailExists = await ContactsRepository.findByEmail(email);

    if (emailExists && contactExists.id !== id) {
      return response.status(404).json({ error: 'email already taken' });
    }

    const contact = await ContactsRepository.update(id, {
      name,
      email,
      phone,
      category_id,
    });

    response.json(contact);
  }

  async delete(request, response) {
    // deletar um contato

    const { id } = request.params;

    await ContactsRepository.delete(id);

    // resposta de sucesso sem conteúdo
    response.sendStatus(204);
  }
}

// design pattern: Singleton
module.exports = new ContactController(); // apenas pode exister UMA instancia do objeto dentro da aplicação. todos que forem usar ContactController vão usar a mesma instancia.
