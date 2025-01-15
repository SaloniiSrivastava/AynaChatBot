const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const SECRET_KEY = 'your-secret-key'; // Replace with an environment variable in production

module.exports = {
  async register(ctx) {
    const { username, email, password } = ctx.request.body;

    // Check if the user already exists
    const existingUser = await strapi.db.query('api::user.user').findOne({
      where: { email },
    });
    if (existingUser) {
      return ctx.badRequest('Email already in use.');
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the user
    const user = await strapi.db.query('api::user.user').create({
      data: { username, email, password: hashedPassword },
    });

    // Generate a token
    const token = jwt.sign({ id: user.id }, SECRET_KEY, { expiresIn: '1d' });

    return ctx.send({ user, token });
  },

  async login(ctx) {
    const { email, password } = ctx.request.body;

    // Find the user
    const user = await strapi.db.query('api::user.user').findOne({
      where: { email },
    });
    if (!user) {
      return ctx.badRequest('Invalid email or password.');
    }

    // Check the password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return ctx.badRequest('Invalid email or password.');
    }

    // Generate a token
    const token = jwt.sign({ id: user.id }, SECRET_KEY, { expiresIn: '1d' });

    return ctx.send({ user, token });
  },
};
