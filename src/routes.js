const { Router } = require('express'); // desestruturação do express para pegar apenas o Router

const router = Router();

const ContactController = require('./app/controllers/ContactController');
const CategoryController = require('./app/controllers/CategoryController');

router.get('/contacts', ContactController.index);
router.get('/contacts/:id', ContactController.show);
router.delete('/contacts/:id', ContactController.delete);
router.post('/contacts', ContactController.store);
router.put('/contacts/:id', ContactController.update);

router.get('/categories', CategoryController.index);
router.post('/categories', CategoryController.store);
router.get('/categories/:id', CategoryController.show);
router.delete('/categories/:id', CategoryController.delete);
router.put('/categories/:id', CategoryController.update);

module.exports = router;
