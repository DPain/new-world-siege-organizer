const PROFILES = ['production', 'PRODUCTION', 'prod', 'PROD'];

interface Config {
  server_url: string;
  wealth_url: string;
  news_url: string;
}

let config: Config;
if (PROFILES.includes(process.env.NODE_ENV)) {
  config = require('@/config/prod');
} else {
  config = require('@/config/dev');
}

export default config;
