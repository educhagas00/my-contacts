class ContactController {
  index(request, response) {
    // listagem de registros
    response.send('Sent From Contact Comtroller');
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
