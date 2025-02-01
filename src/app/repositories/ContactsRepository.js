const db = require('../../database'); // seo arquivo for o index, nao precisa passar o nome do arquivo

class ContactsRepository {
  async findAll(orderBy = 'ASC') {
    // valor padrao é ASC, pois se não for passado nada, orderBy será undefined e quando chamar toYpperCase vai dar erro
    const direction = orderBy.toUpperCase() === 'DESC' ? 'DESC' : 'ASC';

    const rows = await db.query(`
      SELECT contacts.*, categories.name AS category_name
      FROM contacts
      LEFT JOIN categories ON categories.id = contacts.category_id 
      ORDER BY contacts.name ${direction}`);

    return rows;
  }

  async findById(id) {
    // desestrutura para não retornar um array de rows e sim um objeto
    const [row] = await db.query(
      `
      SELECT contacts.*, categories.name AS category_name 
      FROM contacts 
      LEFT JOIN categories ON categories.id = contacts.category_id
      WHERE contacts.id = $1`,
      [id],
    );

    return row;
  }

  async delete(id) {
    // operações de delete retornam um array vazio. então não é preciso desestruturar
    const deleteOp = await db.query('DELETE FROM contacts WHERE id = $1', [id]);

    return deleteOp;
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

  async update(id, { name, email, phone, category_id }) {
    // rows é um array. então é preciso desestruturar o array de rows e pegar a primeira posição (que é o registro inserido)
    const [row] = await db.query(
      `
      UPDATE contacts
      SET name = $1, email = $2, phone = $3, category_id = $4
      WHERE id = $5
      RETURNING *  
    `,
      [name, email, phone, category_id, id],
    );

    return row;
  }
}

module.exports = new ContactsRepository(); // Singleton: exporta uma unica instancia do repositorio
