require('dotenv').config();
const Sequelize = require('sequelize');

const sequelize = new Sequelize(process.env.DBNAME, process.env.DBUSER, process.env.DBPASSWORD, {
      host: "localhost",
      dialect: "postgres",
      define: {
            freezeTableName: true,
            timestamps: false
      }
})

exports.sequelize = sequelize;
exports.connection = () => {
      sequelize.authenticate()
      .then(() => {
                  console.log('the database is now connected to the backend ')

                  sequelize.sync({
                        force: false
                  })
                        .then(() => {
                              console.log('Database synchronized with models')
                        })
                        .catch((error) => {
                              console.error('Error syncing the database with models: ' + error)
                        })
      }).catch(err => {
                        console.error(`Unable to connect to database with error ${err}`)
                  })
};