const { Router } = require('express');

const UserController = require('./controllers/UserController');
const SearchController = require('./controllers/SearchController');

const routes = Router();

routes.get('/users', UserController.index);
routes.post('/register', UserController.store);
routes.post('/login', UserController.show);

routes.get('/search', SearchController.index);

module.exports = routes;