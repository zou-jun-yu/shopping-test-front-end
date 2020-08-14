import Vue from "vue";
import { reqModifyCart, reqGetCart } from "~/api";

export const state = () => ({
  cart: {},
  authenticated: false,
  username: ""
});

const reqUpdateCart = async state => {
  let cartInfo = {};
  for (let goodsId in state.cart) {
    cartInfo[goodsId] = {
      count: state.cart[goodsId].count,
      checked: state.cart[goodsId].checked
    };
  }
  const result = await reqModifyCart(cartInfo);
  if (result.status !== 0) {
    throw Error(result.msg);
  } else {
    console.log(result.msg);
  }
};

export const mutations = {
  addCount(state, goodsId) {
    console.log(state, goodsId, state.cart);
    state.cart[goodsId].count++;
  },
  reduceCount(state, goodsId) {
    if (state.cart[goodsId].count === 1) {
      this.commit("removeFromCart", goodsId);
      return;
    }
    state.cart[goodsId].count--;
  },
  setGoodsCount(state, { goodsId, count }) {
    if (count < 1) {
      count = 1;
    }
    state.cart[goodsId].count = count;
  },
  addTocart(state, goods) {
    if (state.cart[goods._id]) {
      this.commit("addCount", goods._id);
      return;
    }
    // Vue.set(state.cart, goods._id, {});
    // Vue.set(state.cart[goods._id],  "count" ,1)。。。;
    state.cart = {
      ...state.cart,
      [goods._id]: {
        count: 1,
        checked: true,
        ...goods,
      }
    };
  },
  removeFromCart(state, goodsId) {
    Vue.delete(state.cart, goodsId);
  },
  toggleCheck(state, { goodsId, value }) {
    state.cart[goodsId].checked = value;
  },
  toggleCheckAll(state, value) {
    const { cart } = state;
    for (var prop in cart) {
      cart[prop].checked = value;
    }
  },
  initCart(state, cart) {
    state.cart = cart;
  },
  changeAuthStatus(state, {authenticated,username}) {
    state.authenticated = authenticated;
    state.username = username;
  },
  resetState(state) {
    state.cart = {};
    state.authenticated = false;
    state.username = "";
  }
};

export const getters = {
  totlePrice(state) {
    let totle = 0;
    const { cart } = state;
    for (var prop in cart) {
      if (cart[prop].checked) {
        totle += cart[prop].count * cart[prop].nowPrice;
      }
    }
    return totle;
  },
  isAllChecked(state) {
    return Object.keys(state.cart).every(prop => state.cart[prop].checked);
  }
};

//每次修改购物车后都要调用reqUpdateCart向服务器发起请求，以访刷新后丢失购物车数据。唉，要是有个像后端语言中的面向切面编程（AOP）的用法就好了。
export const actions = {
  addCount({ commit, state }, goodsId) {
    commit("addCount", goodsId);
    reqUpdateCart(state);
  },
  reduceCount({ commit, state }, goodsId) {
    commit("reduceCount", goodsId);
    reqUpdateCart(state);
  },
  setGoodsCount({ commit, state }, { goodsId, count }) {
    commit("setGoodsCount", { goodsId, count });
    reqUpdateCart(state);
  },
  addTocart({ commit, state }, goods) {
    commit("addTocart", goods);
    reqUpdateCart(state);
  },
  removeFromCart({ commit, state }, goodsId) {
    commit("removeFromCart", goodsId);
    reqUpdateCart(state);
  },
  toggleCheck({ commit, state }, { goodsId, value }) {
    commit("toggleCheck", { goodsId, value });
    reqUpdateCart(state);
  },
  toggleCheckAll({ commit, state }, value) {
    commit("toggleCheckAll", value);
    reqUpdateCart(state);
  },
  async changeAuthStatus({ commit, state }, {authenticated,username}) {
    if (!authenticated) {
      commit("resetState");
      return;
    }
    commit("changeAuthStatus", {authenticated,username});
    const initCartResponse = await reqGetCart();
    if (initCartResponse.status === 0) {
      commit("initCart", initCartResponse.cart);
    } else {
      console.log(initCartResponse.msg);
    }
  }
};
