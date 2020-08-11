<template>
  <header>
    <h1>京猫商城</h1>
    <span v-if="authenticated" @click="logout">退出</span>
    <span v-else @click="$router.push('/login')">登录</span>
  </header>
</template>

<script>
import { mapState, mapMutations } from "vuex";
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
        await this.changeAuthStatus({ authenticated: false, username: "" });
        this.$router.push("/login");
      }
    },
    ...mapMutations(["changeAuthStatus"])
  }
};
</script>

<style lang="scss" scoped>
header {
  flex: none;
  display: flex;
  height: 50px;
  position: relative;
  background: #00a2e8;
  text-align: center;
  color: white;
  line-height: 50px;
  h1 {
    font-size: 30px;
    flex-grow: 1;
  }
  span {
    position: absolute;
    right: 15px;
    line-height: 50px;
    z-index: 999;
  }
}
</style>
