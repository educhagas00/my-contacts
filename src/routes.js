const { Router } = require('express'); // desestruturação do express para pegar apenas o Router

const router = Router();

const ContactController = require('./app/controllers/ContactController');

router.get('/contacts', ContactController.index);
router.get('/contacts/:id', ContactController.show);
router.delete('/contacts/:id', ContactController.delete);
router.post('/contacts', ContactController.store);
router.put('/contacts/:id', ContactController.update);

module.exports = router;
