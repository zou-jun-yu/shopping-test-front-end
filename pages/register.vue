<template>
  <div>
    <form @submit.prevent="submit">
      <input type="text" v-model="email" placeholder="Email" />
      <input
        type="text"
        v-model="username"
        placeholder="请输入您的用户名"
        v-if="isRegisterPage"
      />
      <input
        type="password"
        v-model="password"
        :placeholder="isRegisterPage ? '请输入您的密码' : '请您输入新密码'"
      />
      <p class="verify">
        <input
          type="text"
          v-model="verify"
          placeholder="请输入您的验证码"
        /><button @click.prevent="getVerify">获取验证码</button>
      </p>
      <input type="submit" :value="isRegisterPage ? '注册' : '修改密码'" />
    </form>
    <div class="forget-register">
      <a href="javascript:;" @click="$router.push('/login')">立即登录</a>
      <a href="javascript:;" @click="isRegisterPage = !isRegisterPage">{{
        isRegisterPage ? "忘记密码" : "立即注册"
      }}</a>
    </div>
  </div>
</template>

<script>
import { Toast } from "mint-ui";
import { reqGetVerify, reqRegister, reqFindPassword } from "@/api";
export default {
  name: "Register",
  data() {
    return {
      username: "",
      password: "",
      email: "",
      verify: "",
      isRegisterPage: true
    };
  },
  created() {
    const isRegisterPage = this.$route.query.isRegisterPage;
    if (isRegisterPage === false) {
      this.isRegisterPage = isRegisterPage;
    }
  },
  methods: {
    async getVerify() {
      const result = await reqGetVerify(this.email);
      Toast(result.msg);
    },
    async submit() {
      const { username, password, email, verify } = this;
      let result;
      if (this.isRegisterPage) {
        result = await reqRegister({ username, password, email, verify });
      } else {
        result = await reqFindPassword({ password, email, verify });
      }
      Toast(result.msg);
      if (result.status === 0) {
        this.$router.push("/login");
      }
    }
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
  .verify {
    display: flex;
    width: 90%;
    margin: 20px auto;
    input {
      margin: 0;
      width: 70%;
      padding: 0 20px;
      font-size: 20px;
    }
    button {
      width: 30%;
      height: 60px;
      background-color: #00a2e8;
      border: none;
      font-size: 16px;
    }
  }
}
.forget-register {
  display: flex;
  padding: 0 20px;
  width: 100%;
  justify-content: space-between;
}
</style>
