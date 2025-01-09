const { Router } = require('express'); // desestruturação do express para pegar apenas o Router

const router = Router();

const ContactController = require('./app/controllers/ContactController');

router.get('/contacts', ContactController.index);

module.exports = router;
