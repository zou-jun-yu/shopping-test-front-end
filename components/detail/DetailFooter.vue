<template>
  <footer>
    <button>
      <i class="iconfont">&#xe650;</i>
      <span>店铺</span>
    </button>
    <button>
      <i class="iconfont">&#xe63a;</i>
      <span>客服</span>
    </button>
    <button>
      <i class="iconfont">&#xf2d3;</i>
      <span>收藏</span>
    </button>
    <button class="add" @click="addGoodsToCart">加入购物车</button>
    <button class="buy" @click="buyNow">立即购买</button>
  </footer>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
  name: "DetailFooter",
  props: {
    goodsDetail: Object,
    required: true
  },
  computed: {
    ...mapState(["authenticated"])
  },
  methods: {
    ...mapActions({
      addTocart: "addTocart"
    }),
    addGoodsToCart() {
      if (!this.authenticated) {
        this.$router.push("/login");
        return;
      }
      addTocart(this.goodsDetail);
    },
    buyNow() {
      if (!this.authenticated) {
        this.$router.push("/login");
        return;
      }
      this.addTocart(this.goodsDetail);
      this.$router.push("/cart");
    }
  }
};
</script>

<style lang="scss" scoped>
footer {
  position: fixed;
  bottom: 0;
  width: 100%;
  display: flex;
  .iconfont {
    font-size: 24px;
    color: #adadad;
  }
  button {
    flex-grow: 1;
    border: none;
    padding: 5px 10px;
    font-size: 16px;
    color: white;
    background-color: #fff;
    span {
      display: block;
      font-size: 14px;
      color: #adadad;
    }
  }
  .add {
    background-color: purple;
    width: 100px;
  }
  .buy {
    background-color: royalblue;
    width: 100px;
  }
}
</style>
