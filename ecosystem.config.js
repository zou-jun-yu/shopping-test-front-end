module.exports = {
  apps: [
    {
      name: "NuxtShopping",
      instances: 1,
      script: "./node_modules/nuxt/bin/nuxt.js",
      args: "start",
      env: {
        COMMON_VARIABLE: "true"
      },
      env_production: {
        NODE_ENV: "production"
      }
    }
  ],

  deploy: {
    production: {
      // key: `${process.env.HOME}/.ssh/your-privite.key`,
      user: "root",
      host: "47.115.157.0",
      ref: "origin/master",
      // ssh_options: "StrictHostKeyChecking=no",
      repo: "git@github.com:zou-uoz/shopping-test-front-end.git",
      path: "/root/shopping-test/shopping-test-front-end",
      // port: 22        //ssh端口
      // 安装后置任务
      // "post-setup": "npm install",
      // 部署后置任务
      // "post-deploy": "npm run build",
      // pre-deploy: git fetch --all //部署前执行
      // "pre-deploy-local": "",
      "post-deploy":
        "npm install && pm2 reload ecosystem.config.js --env production",
      // "pre-setup": ""
    }
  }
};
