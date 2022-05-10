const User = require('../models/User.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const login = async (req, res) => {
  const { email, password } = req.body;
  let existingUser;
  try {
    existingUser = await User.findOne({ email });
  } catch (err) {
    console.log(err);
    return res.json({
      errors: [{ technical: 'Login failed please try again' }],
    });
  }

  console.log('Existing user: ', existingUser);

  if (!existingUser) {
    return res.json({
      errors: [
        { email: 'Invalid credentials' },
        { password: 'Invalid credentials' },
      ],
    });
  }

  let isValidPassword = false;
  try {
    isValidPassword = await bcrypt.compare(password, existingUser.password);
  } catch (err) {
    console.log(err);
    return res.json({
      errors: [{ technical: 'Login failed please try again' }],
    });
  }

  if (!isValidPassword) {
    return res.json({
      errors: [
        { email: 'Invalid credentials' },
        { password: 'Invalid credentials' },
      ],
    });
  }

  let token;
  try {
    token = jwt.sign(
      { userId: existingUser._id, email: existingUser.email },
      'supersecret_dont_share',
      { expiresIn: '1h' }
    );
  } catch (err) {
    console.log(err);
    return res.json({
      errors: [{ technical: 'Login failed please try again' }],
    });
  }

  res.json({
    username: existingUser.username,
    userId: existingUser.id,
    email: existingUser.email,
    token: token,
  });
};

const register = async (req, res) => {
  const { username, email, password } = req.body;
  let errors = {};
  if (username.length === 0) {
    errors.username = 'Username cannot be empty';
  }
  if (email.length === 0) {
    errors.email = 'Email cannot be empty';
  } else if (!email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)) {
    errors.email = 'Enter a valid email address';
  }
  if (password.length < 6) {
    errors.password = 'Password needs at least 6 characters';
  }
  if (errors) {
    return res.json({ errors: errors });
  }

  let existingUser;
  try {
    existingUser = await User.findOne({ email: email });
  } catch (err) {
    console.log(err);
    return res.json({
      errors: { technical: 'Registration failed please try again' },
    });
  }

  console.log(existingUser);
  if (existingUser) {
    return res.json({
      errors: { email: 'User already exists' },
    });
  }

  let hashedPassword;
  try {
    hashedPassword = await bcrypt.hash(password, 12);
  } catch (err) {
    console.log(err);
    return res.json({
      errors: { technical: 'Registration failed please try again' },
    });
  }

  const createdUser = new User({
    username,
    email,
    password: hashedPassword,
  });

  try {
    await createdUser.save();
  } catch (err) {
    console.log(err);
    return res.json({
      errors: [{ technical: 'Registration failed please try again' }],
    });
  }

  let token;
  try {
    token = jwt.sign(
      { userId: createdUser._id, email: createdUser.email },
      'supersecret_dont_share',
      { expiresIn: '1h' }
    );
  } catch (err) {
    console.log(err);
    return res.json({
      errors: [{ technical: 'Registration failed please try again' }],
    });
  }

  console.log('Created Place: ', createdUser);
  res
    .status(201)
    .json({ userId: createdUser._id, email: createdUser.email, token: token });
};

module.exports = {
  login,
  register,
};
