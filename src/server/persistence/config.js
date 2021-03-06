const isDevelopment = process.env.NODE_ENV !== "production";

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
  prod: new Config('COMMENTS', 'santiago@riqra-simple-comments-mysqldbserver', 'simple-pass-123456', {
    host: 'riqra-simple-comments-mysqldbserver.mysql.database.azure.com',
    dialect: 'mysql',
    operatorsAliases: false
  })
}

export default isDevelopment? config.dev : config.prod;