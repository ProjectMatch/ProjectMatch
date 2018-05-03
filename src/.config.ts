const development = {
  host: {
    name: 'http://localhost:8080'
  },
  env: 'developement'
};

const production = {
  host: {
    name: 'http://projectmatch.me'
  },
  env: 'production'
};

const config = process.env.NODE_ENV === 'production' ? production : development;

export default {
  ...config
};
