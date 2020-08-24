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
      <em v-if="authenticated&&totleGoodsSelected">{{ totleGoodsSelected }}</em>
      <span>购物车</span>
    </nuxt-link>
    <nuxt-link to="/center" tag="li" active-class="active">
      <i class="iconfont icon-center"></i>
      <span>个人中心</span>
    </nuxt-link>
  </ul>
</template>

<script>
import { mapGetters, mapState } from "vuex";
export default {
  name: "Tabbar",
  computed: {
    ...mapState(["authenticated"]),
    ...mapGetters(["totleGoodsSelected"])
  }
};
</script>

<style lang="scss" scoped>
.tabbar {
  flex: none;
  display: flex;
  justify-content: space-around;
  padding: 5px;
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
    &:nth-of-type(3) {
      position: relative;
      em {
        position: absolute;
        font-style: normal;
        right: 28px;
        top: -3px;
        border-radius: 6px;
        font-size: 6px;
        padding: 2px 4px;
        background-color: red;
      }
    }
    span {
      font-size: 12px;
    }
  }
}
</style>
