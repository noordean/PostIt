import Sequelize from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();
// connect to an online postgreSQL database
const sequelize = new Sequelize(process.env.DATABASE_URL, { query: { raw: true } });

sequelize.authenticate().then(() => {
  console.log('connected');
}).catch((err) => {
  console.log('errorrr');
});

export default sequelize;
