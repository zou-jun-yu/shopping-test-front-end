<template>
  <div>
    <div v-if="!loading">
      <form @submit.prevent="submit">
        <input type="text" v-model="username" placeholder="账户名" />
        <input
          type="password"
          v-model="password"
          placeholder="请输入您的密码"
        />
        <input type="submit" value="登录" />
      </form>
      <div class="forget">
        <a href="javascript:;" @click="$router.push('/register')">立即注册</a>
        <a
          href="javascript:;"
          @click="
            $router.push({ path: 'register', query: { isRegisterPage: false } })
          "
          >忘记密码</a
        >
      </div>
    </div>
    <div v-else>正在登录中...</div>
  </div>
</template>

<script>
import { reqLogin } from "@/api";
// import messageBox from "@/components/messageBox";
import { mapActions } from "vuex";
import { Toast } from "mint-ui";
export default {
  name: "Login",
  data() {
    return {
      username: "",
      password: "",
      loading: false
    };
  },
  methods: {
    async submit() {
      this.$nuxt.$loading.start();
      const result = await reqLogin({
        username: this.username,
        password: this.password
      });
      this.$nuxt.$loading.finish();
      Toast(result.msg);
      if (result.status === 0) {
        // messageBox({
        //   title: "登录成功！",
        //   ok: "确认",
        //   onOk: async () => {
        //     await this.changeAuthStatus({authenticated:true,username:result.data.username});
        //     this.$router.go(-1);
        //   }
        // });
        this.loading = true;
        await this.changeAuthStatus({
          authenticated: true,
          username: result.data.username
        });
        this.loading = false;
        this.$router.go(-1);
      }
    },
    ...mapActions({
      changeAuthStatus: "changeAuthStatus"
    })
  }
};
</script>

<style lang="scss" scoped>
$theme: #00a2e8;
form {
  width: 100%;
  input {
    display: block;
    border: 1px solid $theme;
    outline: none;
    height: 60px;
    width: 90%;
    margin: 20px auto;
    padding: 0 20px;
    font-size: 20px;
  }
  [type="submit"] {
    width: 80%;
    height: 60px;
    color: white;
    background-color: $theme;
    border-radius: 10px;
  }
}
.forget {
  display: flex;
  padding: 0 20px;
  width: 100%;
  justify-content: space-between;
}
</style>
