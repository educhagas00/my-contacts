const CategoriesRepository = require('../repositories/CategoriesRepository');

class CategoryController {
  // try-catch para tratar erros funciona tanto em funções síncronas quanto assíncronas
  // error handler funciona apenas em funções síncronas: devemos importar o express-async-errors
  async index(request, response) {
    const categories = await CategoriesRepository.findAll();

    response.json(categories);
  }

  async store(request, response) {
    const { name } = request.body; // desestruturar name do body

    if (!name) {
      return response.status(400).json({ error: 'name is required' });
    }

    const category = await CategoriesRepository.create({ name }); // passo um objeto apenas com a propriedade name

    response.json(category);
  }

  async show(request, response) {
    const { id } = request.params;

    const category = await CategoriesRepository.findById(id);

    if (!category) {
      return response.status(404).json({ error: 'Category not found' });
    }

    response.json(category);
  }

  async update(request, response) {
    const { id } = request.params;

    const { name } = request.body;

    const categoryExists = await CategoriesRepository.findById(id);

    if (!categoryExists) {
      return response.status(404).json({ error: 'Category not found' });
    }

    if (!name) {
      return response.status(400).json({ error: 'name is required' });
    }

    const category = await CategoriesRepository.update(id, { name });

    response.json(category);
  }

  async delete(request, response) {
    const { id } = request.params;

    await CategoriesRepository.delete(id);

    response.sendStatus(204);
  }
}

module.exports = new CategoryController();
