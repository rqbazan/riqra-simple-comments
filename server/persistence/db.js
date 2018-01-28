import Sequelize from 'sequelize';
import Config from './config';

const Conn = new Sequelize(
  Config.database, 
  Config.user, 
  Config.password, 
  Config.settings
);

const Comment = Conn.define('Comment', {
  content: {
    type: Sequelize.STRING,
    allowNull: false
  }
});

export default Conn;