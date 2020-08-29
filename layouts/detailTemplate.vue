<template>
  <div>
    <Nuxt keep-alive />
  </div>
</template>

<script>
import { mapActions, mapMutations, mapState } from "vuex";
import { reqGetUser } from "~/api";

//商品详情页模板
export default {
  name: "detailTemplate",
  async mounted() {
    //一上来就获取用户信息，并保存到vuex中。如果在这之前已经成功获取了用户信息则立即返回
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
