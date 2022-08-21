module.exports = {
  apps: [
    {
      name: 'prod',
      script: './dist/src/main.js',
      env: {
        NODE_ENV: 'prod',
      },
    },
  ],
};
