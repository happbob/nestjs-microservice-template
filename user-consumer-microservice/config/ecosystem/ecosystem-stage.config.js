module.exports = {
  apps: [
    {
      name: 'stage',
      script: './dist/src/main.js',
      env: {
        NODE_ENV: 'stage',
      },
    },
  ],
};
