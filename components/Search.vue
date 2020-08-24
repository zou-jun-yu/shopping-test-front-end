<template>
  <div id="search">
    <i class="iconfont icon-sousuo"></i>
    <input
      type="search"
      placeholder="搜索商品"
      v-model="search"
      @keyup.enter="$router.push({ path: '/goodsList', query: { search } })"
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
  position: relative;
  flex: none;
  text-align: center;
  background-color: #00a2e8;
  padding: 0 10px;
  .icon-sousuo {
    position: absolute;
    top: 20px;
    left: 17px;
    color: #858585;
  }
  input {
    height: 40px;
    width: 100%;
    margin: 10px 0;
    padding: 0 5px 0 30px;
    outline: none;
    border-radius: 5px;
    background-color: #fff;
    border: none;
    font-size: 16px;
  }
}
</style>
