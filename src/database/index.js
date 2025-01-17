const { Client } = require('pg');

const client = new Client({
  host: 'localhost',
  port: 5432,
  user: 'root',
  password: 'root',
  database: 'mycontacts',
});

client.connect();

exports.query = async (query) => {
  // função recebe a query e client.query recebe essa query e executa
  const { rows } = await client.query(query);
  return rows;
};
