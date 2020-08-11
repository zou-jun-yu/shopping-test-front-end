<template>
  <div id="search">
    <input
      type="search"
      placeholder="搜索商品"
      v-model="search"
      @keyup.enter="$router.push({ path: '/goodsList', query: {search} })"
    />
  </div>
</template>

<script>
export default {
  name: "Search",
  data() {
    return {
      search: ""
    };
  }
};
</script>

<style lang="scss" scoped>
#search {
  flex: none;
  text-align: center;
  background-color: white;
  input {
    height: 40px;
    width: 355px;
    margin: 10px;
    padding: 0 10px;
    outline: none;
    border: 1px solid #002ae8;
    font-size: 20px;
  }
}
</style>
