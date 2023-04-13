const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const { register, login } = require('../controllers/auth.js')


router.post('/register', [
      // checking username and password keys in the body (object) sent to this route
      check('username', 'email is not valid').isEmail(),
      check('password', 'password is invalid').isLength({ min: 3, max: 100})
], register);

router.post('/login', [
      check('username', 'email is invalid').isEmail(),
      check('password', 'password is invalid').isLength({ min: 3, max: 100 })
], login);

module.exports = router;