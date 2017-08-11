import dotenv from 'dotenv';

dotenv.config();

module.exports = {
  development: {
    username: 'postgres',
    password: 'ibrahim5327',
    database: 'postit',
    host: 'localhost',
    port: 5433,
    dialect: 'postgres'
  },
  test: {
    use_env_variable: 'TEST_DATABASE-URL'
  },
  production: {
    use_env_variable: 'PROD_DATABASE_URL'
  }
};
