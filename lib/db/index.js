'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(module.filename);

let config = {
  database: 'localdb',
  username: 'username',
  password: '',
  host: 'localhost',
  dialect: 'sqlite',
  pool: {
    min: 0,
    max: 5,
    idle: 20000,
    acquire: 20000
  },
  storage: 'localdb.sqlite'
};

let sequelize = new Sequelize(config.database, config.username, config.password, config);

let db = {};

fs.readdirSync(__dirname)
  .filter(function (file) {
    // file.indexOf('.') means that it doesn't start with a dot aka not designated hidden
    // basename set to resolve to this filename
    // slice off the .js extension
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js')
  })
    // import the files in the root directory that meet the requirements above into sequelize
  .forEach(function (file) {
    let model = sequelize['import'](path.join(__dirname, file));
    // attach each model to the db object being exported
    db[modelName] = model;
  });

  // if the model has associate method, invoke the method and give it that db
Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

// attach import and instance of sequelize to db object
db.sequelize = sequelize;
db.Sequelize = Sequelize;
db.ready = new Promise((resolve, reject) => {
  if (process.env.DB_SYNC) {
    db.sequelize.sync()
      .then(() => resolve(true));
  } else {
    return resolve(true);
  }
});

module.exports = db;
