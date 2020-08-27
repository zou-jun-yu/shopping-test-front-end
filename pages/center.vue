<template>
  <div>
    <p v-if="authenticated">个人中心,欢迎！{{ username }}</p>
    <p v-else>
      请先<nuxt-link to="/login">登录</nuxt-link>&nbsp;/&nbsp;<nuxt-link
        to="register"
        >注册</nuxt-link
      >
    </p>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "Center",
  computed: {
    ...mapState(["username", "authenticated"])
  }
};
</script>

<style></style>
