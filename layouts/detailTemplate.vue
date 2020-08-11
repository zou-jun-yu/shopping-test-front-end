<template>
  <div>
    <Nuxt />
  </div>
</template>

<script>
import { mapActions, mapMutations, mapState } from "vuex";
import { reqGetUser } from "~/api";
export default {
  name: "detailTemplate",
  async mounted() {
    if (this.authenticated) return;
    const result = await reqGetUser();
    if (result.status === 0) {
      this.changeAuthStatus({
        authenticated: true,
        username: result.data.username
      });
    } else {
      await this.resetState();
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
