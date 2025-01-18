const { v4 } = require('uuid');

const db = require('../../database'); // seo arquivo for o index, nao precisa passar o nome do arquivo

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
  async findAll() {
    const rows = await db.query('SELECT * FROM contacts');

    return rows;
  }

  async findById(id) {
    // desestrutura para não retornar um array de rows e sim um objeto
    const [row] = await db.query('SELECT * FROM contacts WHERE id = $1', [id]);

    return row;
  }

  delete(id) {
    return new Promise((resolve) => {
      contacts = contacts.filter((contact) => contact.id !== id); // contatos recebe todos os contatos que não tem o id passado
      resolve();
    });
  }

  async findByEmail(email) {
    // desestrutura para não retornar um array de rows e sim um objeto
    const [row] = await db.query('SELECT * FROM contacts WHERE email = $1', [
      email,
    ]);

    return row;
  }

  async create({ name, email, phone, category_id }) {
    // rows é um array. então é preciso desestruturar o array de rows e pegar a primeira posição (que é o registro inserido)
    const [row] = await db.query(
      `
      INSERT INTO contacts(name, email, phone, category_id) 
      VALUES($1, $2, $3, $4)
      RETURNING *
    `,
      [name, email, phone, category_id],
    );

    // insert into contacts(colunas que se deseja passar argumentos)
    // $ serve para prevenir o SQL injection.
    // é passada para o metodo query em database/index.js a (query e o value)
    // os valores passados no array serão passados, em ordem, para os values
    // o RETURNING * retorna o registro inserido (já que no insert não é retornado nada e queremos retornar o registro inserido no controller)

    return row;
  }

  update(id, { name, email, phone, category_id }) {
    return new Promise((resolve) => {
      const updatedContact = { id, name, email, phone, category_id };

      contacts = contacts.map((contact) =>
        contact.id === id ? updatedContact : contact,
      );

      resolve(updatedContact);
    });
  }
}

module.exports = new ContactsRepository(); // Singleton: exporta uma unica instancia do repositorio
