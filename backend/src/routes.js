const { Router } = require('express');

const UserController = require('./controllers/UserController');
const SearchController = require('./controllers/SearchController');

const routes = Router();

routes.get('/users', UserController.list);
routes.post('/register', UserController.register);
routes.post('/login', UserController.login);

routes.get('/search', SearchController.index);

module.exports = routes;