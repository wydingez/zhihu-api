module.exports = {
  apps: [
    {
      name: 'zhihu-api',
      script: 'bin/www',
      watch: true,
      env_production: {
        PORT: 3000,
        NODE_ENV: 'production',
        ENV_CONFIG: 'production'
      }
    }
  ]
}