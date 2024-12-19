module.exports = {
  apps: [
    {
      name: "backend",
      script: "src/index.ts", // Path to your backend entry point
      env: {
        NODE_ENV: "production",
      },
    },
  ],
};
