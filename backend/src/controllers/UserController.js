const User = require('../models/User');
const bcrypt = require('bcryptjs');

module.exports = {
    async index(request, response) {
        const users = await User.find();

        return response.json(users);
    },

    async store(request, response) {
        const { email, username, password } = request.body;

        let user = await User.findOne({ email });

        if (!user) {
            user = await User.create({
                email,
                username,
                password,
            });

            user.password = undefined;

            return response.json(user);
        };

        return response.status(400).send({ error: 'User already exists' });
    },

    async show(request, response) {
        const { email, password } = request.body;

        const user = await User.findOne({ email }).select('+password');

        if (!user) {
            return response.status(400).send({ error: 'Invalid email' });
        };

        if (!await bcrypt.compare(password, user.password)) {
            return response.status(400).send({ error: 'Invalid password' });
        };

        user.password = undefined;

        response.send({ user });
    },
};