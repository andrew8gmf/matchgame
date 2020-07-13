const User = require('../models/User');

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
        }

        return response.json(user);
    }
}