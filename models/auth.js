const Sequelize = require('sequelize');
const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/dbhelper.js')

const Registration = sequelize.define('registration', {
      username: {
            type: DataTypes.STRING(20),
            allowNull: false
      },
      password: {
            type: DataTypes.STRING(500),
            allowNull: false
      },
      salt: {
            type: DataTypes.STRING(100),
            allowNull: false
      }
});

// queries
exports.registration = (username, password, salt) => {
      return Registration.create({
            username: username,
            password: password,
            salt: salt
      })
            .then(result => {
                  return 'user successfully registered'
            })
            .catch(err => {
                  console.error(`Registration failed with error: ${err}`)
            })
};

exports.signIn = (username) => {
      return Registration.findOne({
            where: {
                  username: username
            }
      })
            .then(result => {
                  return result
            })
            .catch(err => {
                  console.log('Error in fetching username for sign in check with error ' + err)
            })
};