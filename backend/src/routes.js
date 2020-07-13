const { Router } = require('express');

const UserController = require('./controllers/UserController');
const SearchController = require('./controllers/SearchController');

const routes = Router();

routes.get('/users', UserController.index);
routes.post('/users', UserController.store);

routes.get('/search', SearchController.index);

module.exports = routes;