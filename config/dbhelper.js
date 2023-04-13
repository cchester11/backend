require('dotenv').config();
const Sequelize = require('sequelize');

const sequelize = new Sequelize(process.env.DBNAME, process.env.DBUSER, process.env.DBPW, {
      host: "localhost",
      dialect: "mysql",
      define: {
            freezeTableName: true,
            timestamps: false
      }
})

exports.sequelize = sequelize;
exports.connection = () => {
      sequelize.authenticate().then(() => {
                  console.log('the database is now connected to the backend ')
      }).catch(err => {
                        console.error(`Unable to connect to database with error ${err}`)
                  })
};