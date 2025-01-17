CREATE DATABASE mycontacts;

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS categories (
  id UUID NOT NULL UNIQUE DEFAULT uuid_generate_v4(),
  name VARCHAR NOT NULL
);

CREATE TABLE IF NOT EXISTS contacts (
  id UUID NOT NULL UNIQUE DEFAULT uuid_generate_v4(),
  name VARCHAR NOT NULL,
  email VARCHAR UNIQUE,
  phone VARCHAR,
  category_id UUID,
  FOREIGN KEY (category_id) REFERENCES categories(id)
);

-- os comandos de execução do sql devem ser feitos após o log no postgres  ( psql -U <username> )

-- \l - lista as databases
-- \c - <nome do database> para conectar a uma database
-- \dt - lista as tabelas da database atual