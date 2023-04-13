const { v4: uuidv4 } = require('uuid');
const crypto = require('crypto');
const { registration, signIn } = require('../models/auth.js')

const register = (req, res) => {
      const { username, password } = req.body;
      if(!username && !password) {
            return res.status(422).json({
                  error: "Registration not successful. Valid data not sent in the request."
            })
      }

      const salt = uuidv4();
      const encryptedPassword = crypto.pbkdf2Sync(password, salt, 1000, 64, "sha512").toString('hex')

      registration(username, password, salt).then(result => {
            if(result === 'user successfully registered') {
                  return res.status(201).json({ message: "Account created successfully."})
            } else {
                  return res.status(400).json( {message: "Error in creating account"} )
            }
      })
};

const login = (req, res) => {
      const { username, password } = req.body
      
      signIn(username).then(user => {
            if(!user) {
                  return res.status(400).json({ message: "User not found in the db" })
            }

            const encryptedRequestPassword = crypto.pbkdf2Sync(password, user.dataValues.salt, 1000, 64, "sha512").toString("hex")
            const encryptedDbPassword = crypto.pbkdf2Sync(user.dataValues.password, user.dataValues.salt, 1000, 64, "sha512").toString("hex")

            if(encryptedDbPassword !== encryptedRequestPassword) {
                  return res.status(401).json({ message: "Unauthorized access" })
            }

            const token = crypto.pbkdf2Sync(user.dataValues.username, user.dataValues.salt, 1000, 64, "sha512").toString("hex")

            const response = res.status(200).json({
                  message: "You are now logged in",
                  token: token,
                  loginTime: new Date()
            })

            return response
      })
};

module.exports = { register, login };