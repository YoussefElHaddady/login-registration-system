const router = require('express').Router();
const User = require('../model/User');
const { registerValidation, loginValidation } = require('./validation');
const bcrypt = require('bcryptjs');

router.post('/register', async (req, res) => {
  //Data validation
  const { error } = registerValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  //checking if the user is already in the database
  const emailExist = await User.findOne({ email: req.body.email });
  if (emailExist) return res.status(400).send('Email already exists');

  // Hash passwords
  const salt = await bcrypt.genSalt(10);
  const hashedPass = await bcrypt.hash(req.body.password, salt);

  // Create a new user
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: hashedPass,
  });
  try {
    const savedUser = await user.save();
    res.send({ user: savedUser._id });
  } catch (err) {
    res.status(400).send(err);
  }
});

router.post('/login', async (req, res) => {
  //Data validation
  const { error } = loginValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  //checking if the user is already in the database
  const errorMsg = 'Email or password is wrong';
  const userExist = await User.findOne({ email: req.body.email });
  if (!userExist) return res.status(400).send(errorMsg);

  // valid password
  const validePass = await bcrypt.compare(
    req.body.password,
    userExist.password
  );

  if (!validePass) return res.status(400).send(errorMsg);

  res.send('Logged in !');
});

module.exports = router;
