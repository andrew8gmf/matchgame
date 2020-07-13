const User = require('../models/User');

module.exports = {
    async index(request, response) {
        const { username } = request.query;

        const users = await User.find({ username });

        return response.json({ users });
    }
}