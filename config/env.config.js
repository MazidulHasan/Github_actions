// @ts-check

const environments = {
  dev: {
    baseURL: 'https://dummyjson.com',
  },
  staging: {
    baseURL: 'https://dummyjson.com',
  },
  prod: {
    baseURL: 'https://dummyjson.com',
  },
};

const env = process.env.TEST_ENV || 'dev';

if (!environments[env]) {
  throw new Error(`Unknown TEST_ENV: ${env}. Valid values: ${Object.keys(environments).join(', ')}`);
}

module.exports = {
  env,
  ...environments[env],
  timeout: Number(process.env.API_TIMEOUT) || 30_000,
};
