const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const authConfig = require('../config/auth');

function generateToken(params = {}) {
    return jwt.sign(params, authConfig.secret, {
        expiresIn: 86400,
    });
};

module.exports = {
    async list(request, response) {
        const users = await User.find();

        return response.json(users);
    },

    async register(request, response) {
        const { email, username, password } = request.body;

        let user = await User.findOne({ email });

        if (!user) {
            user = await User.create({
                email,
                username,
                password,
            });

            user.password = undefined;

            return response.json({
                user,
                token: generateToken({ id: user.id }),
            });
        };

        return response.status(400).send({ error: 'User already exists' });
    },

    async login(request, response) {
        const { email, password } = request.body;

        const user = await User.findOne({ email }).select('+password');

        if (!user) {
            return response.status(400).send({ error: 'Invalid email' });
        };

        if (!await bcrypt.compare(password, user.password)) {
            return response.status(400).send({ error: 'Invalid password' });
        };

        user.password = undefined;

        response.json({
            user,
            token: generateToken({ id: user.id }),
        });
    },

    async home(request, response) {
        response.send({ ok: true });
    },
};