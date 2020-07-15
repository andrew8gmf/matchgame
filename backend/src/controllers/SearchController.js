const User = require('../models/user');

module.exports = {
    async index(request, response) {
        const { username } = request.query;

        const users = await User.find({ username });

        return response.json({ users });
    },
};