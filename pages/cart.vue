<template>
  <div id="cart">
    <div v-if="authenticated" class="wrap">
      <h3>购物车</h3>
      <div class="shppping-list">
        <GoodsItem
          v-for="(cartGoodsItem, key) in cartGoodsItems"
          :key="key"
          :goodsDetail="cartGoodsItem"
        >
          <template v-slot:checkbox>
            <input
              type="checkbox"
              class="check"
              :checked="cartGoodsItem.checked"
              @change="toggleCheck(key, $event)"
            />
          </template>
          <template v-slot:calculatePrice>
            <span class="now-price">￥{{ cartGoodsItem.nowPrice }}</span>
            <button class="step" @click="reduceCount(key)">
              -
            </button>
            <input
              class="counter"
              type="number"
              :value="cartGoodsItem.count + ''"
              @change="setGoodsCount(key, $event)"
            />
            <button class="step" @click="addGoodsCount(key)">
              +
            </button>
          </template>
        </GoodsItem>
      </div>
      <div class="total" v-if="Object.keys(cartGoodsItems).length">
        <input type="checkbox" id="check-all" v-model="isCheckAllItems" />
        <label for="check-all">全选</label>
        <span>合计：</span>
        <strong class="total-price">￥{{ totalPrice }}</strong>
        <button @click.prevent="toPayFor">去结算</button>
      </div>
      <p v-else>您的购物车空空如也~~~</p>
      <transition name="bounce" @after-leave="afterLeave">
        <span v-if="show" class="dot"></span>
      </transition>
    </div>
    <div v-else>
      <span>请先</span
      ><nuxt-link to="/login">登录</nuxt-link>&nbsp;/&nbsp;<nuxt-link
        to="register"
        >注册</nuxt-link
      >
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { mapState, mapActions, mapGetters } from "vuex";
import messageBox from "@/components/messageBox";
import GoodsItem from "@/components/goodsList/GoodsItem";
import { reqGetGoodsDetail } from "@/api";
export default {
  name: "Cart",
  data() {
    return {
      show: true
    };
  },
  methods: {
    setGoodsCount(cartGoodsItemId, event) {
      this.$store.dispatch("setGoodsCount", {
        goodsId: cartGoodsItemId,
        count: event.target.value * 1
      });
    },
    toggleCheck(cartGoodsItemId, event) {
      this.$store.dispatch("toggleCheck", {
        goodsId: cartGoodsItemId,
        value: event.target.checked
      });
    },
    ...mapActions({
      addCount: "addCount",
      reduceCount: "reduceCount",
      toggleCheckAll: "toggleCheckAll"
    }),
    addGoodsCount(goodsId) {
      this.show = false;
      this.addCount(goodsId);
    },
    afterLeave(el) {
      this.show = true;
    },
    toPayFor() {
      messageBox({
        title: "抱歉，此网站仅用于测试，未实现支付功能(^_^)",
        ok: "确认"
      });
    }
  },
  computed: {
    ...mapState({
      cartGoodsItems: state => state.cart,
      authenticated: state => state.authenticated
    }),
    ...mapGetters(["totalPrice", "isAllChecked"]),
    isCheckAllItems: {
      get() {
        return this.isAllChecked;
      },
      set(value) {
        this.toggleCheckAll(value);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
#cart {
  flex-grow: 1;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  .wrap {
    flex-grow: 1;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    .dot {
      position: fixed;
      border-radius: 50%;
      background-color: red;
    }
    h3 {
      text-align: center;
      line-height: 40px;
      flex: none;
      color: purple;
    }
    .shppping-list {
      flex-grow: 1;
      overflow: auto;
      .check {
        margin: 0 13px 0 6px;
      }
      .step {
        border: 1px solid black;
        border-radius: 3px;
        width: 30px;
        position: relative;
        top: -3px;
      }
      .counter {
        position: relative;
        top: -3px;
        width: 50px;
        text-align: center;
      }
    }
    input {
      border: 1px solid black;
    }
    .now-price,
    .total-price {
      display: inline-block;
      width: 75px;
      color: red;
      font-size: 20px;
    }
    .total {
      flex: none;
      line-height: 50px;
      background-color: rgba(200, 200, 200, 0.3);
      #check-all {
        margin: 16px;
      }
      label {
        margin-right: 50px;
      }
      button {
        position: relative;
        top: -3px;
        padding: 3px;
        background-color: red;
        color: white;
        border: none;
        font-size: 16px;
        border-radius: 5px;
      }
    }
    p {
      position: fixed;
      left: 50%;
      top: 50%;
      transform: translate3d(-50%, -50%, 0);
      width: 100%;
      font-size: 20px;
      text-align: center;
    }
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
    left: 220px;
    top: 600px;
    opacity: 0;
    width: 20px;
    height: 20px;
  }
  20% {
    left: 160px;
    top: 520px;
    opacity: 1;
    width: 20px;
    height: 20px;
  }
  40% {
    left: 70px;
    top: 400px;
    opacity: 1;
    width: 20px;
    height: 20px;
  }
  60% {
    left: 70px;
    top: 300px;
    opacity: 1;
    width: 20px;
    height: 20px;
  }
  80% {
    left: 175px;
    top: 170px;
    opacity: 1;
    width: 20px;
    height: 20px;
  }
  100% {
    left: 360px;
    top: 70px;
    opacity: 0;
    width: 20px;
    height: 20px;
  }
}
</style>
