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
      <i class="iconfont icon-Cart">
        <em v-if="authenticated && totalGoodsSelected">{{
          totalGoodsSelected
        }}</em>
      </i>
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
//底部导航栏
export default {
  name: "Tabbar",
  computed: {
    ...mapState(["authenticated"]),
    ...mapGetters(["totalGoodsSelected"])
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
  background-color: #00a2e8;
  li {
    flex-grow: 1;
    display: flex;
    justify-content: space-around;
    flex-direction: column;
    text-align: center;
    &.active {
      color: white;
    }
    .iconfont {
      margin: auto;
      font-size: 20px;
      width: 20px;
    }
    .icon-Cart {
      position: relative;
      em {
        position: absolute;
        font-style: normal;
        right: -12px;
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
