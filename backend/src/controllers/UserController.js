const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth.json');

const { API_KEY } = require('../config/mail.json');
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(API_KEY);
const crypto = require('crypto');

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
        response.send({ ok: true, user: request.userId });
    },

    async forgot(request, response) {
        const { email } = request.body;

        const user = await User.findOne({ email });

        if (!user) {
            return response.status(400).send({ error: 'User not found' });
        };

        const token = crypto.randomBytes(20).toString('hex');

        const now = new Date();
        now.setHours(now.getHours() + 1);

        await User.findByIdAndUpdate(user.id, {
            '$set': {
              passwordResetToken: token,
              passwordResetExpires: now,
            }
        });

        const msg = {
            to: email,
            from: 'noreply@matchgame.com',
            subject: 'Change your MatchGame account password',
            html: '../resources/mail/forgot_password.html',
        };

        try {
            await sgMail.send(msg);
        } catch (error) {
            console.error(error);
         
            if (error.response) {
              console.error(error.response.body)
            }
        }
    },
};