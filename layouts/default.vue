<template>
  <div id="templateDiv">
    <Header />
    <div class="middle">
      <Nuxt />
    </div>
    <Tabbar />
  </div>
</template>

<script>
import Header from "@/components/Header";
import Tabbar from "@/components/Tabbar";
import { mapActions, mapMutations, mapState } from "vuex";
import { reqGetUser } from "~/api";

//公共模板
export default {
  name: "Default",
  components: {
    Header,
    Tabbar
  },
  async mounted() {
    document.getElementById("templateDiv").style.height =
      document.documentElement.clientHeight + "px";

    //一上来就获取用户信息，判断用户是否登录，并保存到vuex中。如果在这之前已经成功获取了用户信息则立即返回
    if (this.authenticated) return;
    const result = await reqGetUser();
    if (result.status === 0) {
      this.changeAuthStatus({
        authenticated: true,
        username: result.data.username
      });
    } else {
      this.resetState();
    }
  },
  methods: {
    ...mapActions(["changeAuthStatus"]),
    ...mapMutations(["resetState"])
  },
  computed: {
    ...mapState(["authenticated"])
  }
};
</script>

<style lang="scss">
*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
h4 {
  font-weight: 400;
  color: rgb(50, 50, 50);
}
a {
  text-decoration: none;
  color: blue;
}
ul {
  list-style: none;
}
html {
  font-size: 100px;
}
body {
  font-size: 16px;
  background-color: #f6f6f6;
}

#templateDiv {
  display: flex;
  flex-direction: column;
  .middle {
    flex-grow: 1;
    overflow: hidden;
    display: flex;
    flex-direction: column;
  }
}
</style>
