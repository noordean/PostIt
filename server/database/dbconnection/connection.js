import Sequelize from 'sequelize';

// connect to an online postgreSQL database
const sequelize = new Sequelize('postgres://ybblqxvs:GCYNSQW0othmnzhzmvPmm4kTgaODqW1j@stampy.db.elephantsql.com:5432/ybblqxvs', { query: { raw: true } });

sequelize.authenticate().then(() => {
  console.log('connected');
}).catch((err) => {
  console.log('errorrr');
});

export default sequelize;
