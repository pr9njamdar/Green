// config.js
import Constants from 'expo-constants';

const ENV = {
  dev: {
    apiUrl: 'https://ws-test-2azo.onrender.com',
    //apiUrl: 'http://localhost:3000',
    debug: true,
  },
  prod: {
    apiUrl: 'https://ws-test-2azo.onrender.com',
    debug: false,
  },
};

const getEnvVars = (env = Constants.expoConfig) => {
  if (__DEV__) {
    return ENV.dev;
  } else if (env === 'prod') {
    return ENV.prod;
  }
};

export default getEnvVars;
