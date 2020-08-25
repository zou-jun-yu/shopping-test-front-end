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
    <button class="add" @click="addGoodsToCart">
      加入购物车
      <transition name="bounce" @after-leave="afterLeave">
        <span v-if="show" class="dot"></span>
      </transition>
    </button>
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
  data() {
    return {
      show: true
    };
  },
  computed: {
    ...mapState(["authenticated"])
  },
  methods: {
    ...mapActions({
      addTocart: "addTocart"
    }),
    addGoodsToCart() {
      this.show = false;
      if (!this.authenticated) {
        this.$router.push("/login");
        return;
      }
      this.addTocart(this.goodsDetail);
    },
    buyNow() {
      if (!this.authenticated) {
        this.$router.push("/login");
        return;
      }
      this.addTocart(this.goodsDetail);
      this.$router.push("/cart");
    },
    afterLeave(el) {
      this.show = true;
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
    position: relative;
    .dot {
      position: absolute;
      border-radius: 50%;
      background-color: red;
    }
  }
  .buy {
    background-color: royalblue;
    width: 100px;
  }
}

.bounce-enter-active {
  animation: bounce-in 0s;
}
.bounce-leave-active {
  animation: bounce-in 0.3s reverse;
}
@keyframes bounce-in {
  0% {
    left: 100px;
    top: -600px;
    opacity: 0;
    width: 20px;
    height: 20px;
  }
  20% {
    left: 50px;
    top: -520px;
    opacity: 1;
    width: 20px;
    height: 20px;
  }
  40% {
    left: 0;
    top: -450px;
    opacity: 1;
    width: 20px;
    height: 20px;
  }
  60% {
    left: 0;
    top: -300px;
    opacity: 1;
    width: 20px;
    height: 20px;
  }
  80% {
    left: 0;
    top: -170px;
    opacity: 1;
    width: 20px;
    height: 20px;
  }
  100% {
    left: 0;
    top: 0;
    opacity: 0;
    width: 20px;
    height: 20px;
  }
}
</style>
