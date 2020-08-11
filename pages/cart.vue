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
            <button class="step" @click="addCount(key)">+</button>
          </template>
        </GoodsItem>
      </div>
      <div class="total" v-if="Object.keys(cartGoodsItems).length">
        <input type="checkbox" id="check-all" v-model="isCheckAllItems" />
        <label for="check-all">全选</label>
        <span>合计：</span>
        <strong class="total-price">￥{{ totlePrice }}</strong>
        <button>去结算</button>
      </div>
      <p v-else>您的购物车空空如也~~~</p>
    </div>
    <div v-else><span>请先</span><nuxt-link to="/login">登录</nuxt-link></div>
  </div>
</template>

<script>
import axios from "axios";
import { mapState, mapActions, mapGetters } from "vuex";
import GoodsItem from "@/components/goodsList/GoodsItem";
import { reqGetGoodsDetail } from "@/api";
export default {
  name: "Cart",
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
    })
  },
  computed: {
    ...mapState({
      cartGoodsItems: state => state.cart,
      authenticated: state => state.authenticated
    }),
    ...mapGetters(["totlePrice", "isAllChecked"]),
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
    h3 {
      text-align: center;
      line-height: 40px;
      flex: none;
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
</style>
