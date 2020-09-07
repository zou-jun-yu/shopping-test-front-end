<template>
  <header>
    <h1>南海龙宫商城</h1>
    <span v-if="authenticated" @click="logout">退出</span>
    <span v-else @click="$router.push('/login')">登录</span>
  </header>
</template>

<script>
//页面头部
import { mapState, mapActions } from "vuex";
import { Toast } from "mint-ui";
import { reqLogout } from "@/api";
export default {
  name: "Header",
  computed: {
    ...mapState(["authenticated"])
  },
  methods: {
    async logout() {
      const result = await reqLogout();
      Toast(result.msg);
      if (result.status === 0) {
        this.changeAuthStatus({ authenticated: false, username: "" });
        this.$router.push("/login");
      }
    },
    ...mapActions(["changeAuthStatus"])
  }
};
</script>

<style lang="scss" scoped>
header {
  flex: none;
  display: flex;
  height: 35px;
  position: relative;
  background: #00a2e8;
  text-align: center;
  color: black;
  line-height: 40px;
  h1 {
    font-size: 22px;
    flex-grow: 1;
  }
  span {
    position: absolute;
    right: 15px;
    line-height: 40px;
    z-index: 999;
  }
}
</style>
