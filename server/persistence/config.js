const IS_DEV_ENVIRONMENT = process.env.NODE_ENV == 'dev';

class Config {
  constructor(database, user, password, settings) {
    this.database = database;
    this.user = user;
    this.password = password;
    this.settings = settings;
  }
}

const config = {
  dev: new Config('COMMENTS', 'root', 'simple-pass-123456', {
    host: 'localhost',
    dialect: 'mysql',
    operatorsAliases: false
  }),
  prod: new Config('COMMENTS', 'root', 'simple-pass-123456', {
    host: 'localhost',
    dialect: 'mysql',
    operatorsAliases: false
  })
}

export default IS_DEV_ENVIRONMENT? config.dev : config.prod;