const { Router } = require('express');

const UserController = require('./controllers/userController');
const SearchController = require('./controllers/searchController');

const authMiddleware = require('./middlewares/auth');

const routes = Router();

routes.get('/users', UserController.list);
routes.post('/register', UserController.register);
routes.post('/login', UserController.login);
routes.get('/home', authMiddleware, UserController.home);

routes.get('/search', SearchController.index);

module.exports = routes;