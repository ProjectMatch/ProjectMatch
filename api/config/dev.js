const env = process.env;

const config = {
  port: 8080,
  secrets: {},
  db: {
    url: `mongodb://${env.DB_USER}:${env.DB_PASSWORD}@${process.DB_HOST}:${
      env.DB_PORT
    }/${env.DB_NAME}`
  }
};

module.exports = config;
