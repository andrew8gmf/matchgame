const { Router } = require('express');

const UserController = require('./controllers/userController');

const authMiddleware = require('./middlewares/auth');

const routes = Router();

routes.get('/users', UserController.list);

routes.post('/register', UserController.register);

routes.post('/login', UserController.login);
routes.get('/home', authMiddleware, UserController.home);

routes.post('/forgot_password', UserController.forgot);
routes.post('/reset_password/:token', UserController.reset);

module.exports = routes;