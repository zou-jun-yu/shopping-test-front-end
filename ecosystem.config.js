module.exports = {
  apps: [
    {
      name: "ShoppingFront",
      instances: 1,
      script: "./node_modules/nuxt/bin/nuxt.js",
      args: "start",
      log_date_format: "YYYY-MM-DD HH:mm Z",
      // watch: true,
      // ignore_watch : ["node_modules", ".nuxt"],
      env: {
        NODE_ENV: "development"
      },
      env_production: {
        NODE_ENV: "production"
      }
    }
  ],

  deploy: {
    production: {
      user: "root",
      host: "47.115.157.0",
      ref: "origin/master",
      repo: "git@github.com:zou-uoz/shopping-front-end.git",
      path: "/root/shopping/shopping-front-end",
      "post-deploy":
        "git pull && npm install && npm run build && pm2 reload ecosystem.config.js --env production",
        // "git pull && npm run build && pm2 reload ecosystem.config.js --env production",
      env: {
        NODE_ENV: "production"
      }
    }
  }
};
