<template>
  <ul class="tabbar">
    <nuxt-link to="/home" tag="li" active-class="active">
      <i class="iconfont icon-home"></i>
      <span>首页</span>
    </nuxt-link>
    <nuxt-link to="/category" tag="li" active-class="active">
      <i class="iconfont icon-ts-tubiao_categoryDefault"></i>
      <span>分类</span>
    </nuxt-link>
    <nuxt-link to="/cart" tag="li" active-class="active">
      <i class="iconfont icon-Cart"></i>
      <span>购物车</span>
    </nuxt-link>
    <nuxt-link to="/center" tag="li" active-class="active">
      <i class="iconfont icon-center"></i>
      <span>个人中心</span>
    </nuxt-link>
  </ul>
</template>

<script>
export default {
  name: "Tabbar"
};
</script>

<style lang="scss" scoped>
.tabbar {
  flex: none;
  display: flex;
  justify-content: space-around;
  padding: 5px;;
  height: 55px;
  text-align: center;
  background-color: #00a2e8;
  li {
    flex-grow: 1;
    display: flex;
    justify-content: space-around;
    flex-direction: column;
    &.active {
      color: white;
    }
    .iconfont {
      font-size: 20px;
    }
    span {
      font-size: 12px;
    }
  }
}
</style>