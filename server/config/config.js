const dotenv = require('dotenv');

dotenv.config();

module.exports = {
  development: {
    use_env_variable: 'DEV_DATABASE_URL',
    dialect: 'postgres'
  },
  test: {
    use_env_variable: 'TEST_DATABASE_URL',
    dialect: 'postgres'
  },
  production: {
    use_env_variable: 'PROD_DATABASE_URL',
    dialect: 'postgres'
  }
};
