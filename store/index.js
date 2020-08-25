import Vue from "vue";
import { reqModifyCart, reqGetCart } from "~/api";

export const state = () => ({
  //cart是购物车对象，属性是商品id，值是购物车商品条目（cart改为map数据结构可能会更好一些）
  cart: {},
  authenticated: false,
  username: ""
});

//只要客户修改了购物车，就使用这个函数向服务器发出请求，以防刷新浏览器后购物车数据就丢失了
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
        ...goods
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
  changeAuthStatus(state, { authenticated, username }) {
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
  totalPrice(state) {
    let total = 0;
    const { cart } = state;
    for (var prop in cart) {
      if (cart[prop].checked) {
        total += cart[prop].count * cart[prop].nowPrice;
      }
    }
    return total;
  },
  totalGoodsSelected(state) {
    let number = 0;
    const { cart } = state;
    for (var prop in cart) {
      if (cart[prop].checked) {
        number += cart[prop].count;
      }
    }
    return number;
  },
  isAllChecked(state) {
    return Object.keys(state.cart).every(prop => state.cart[prop].checked);
  }
};

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
  async changeAuthStatus({ commit, state }, { authenticated, username }) {
    if (!authenticated) {
      commit("resetState");
      return;
    }
    commit("changeAuthStatus", { authenticated, username });
    const initCartResponse = await reqGetCart();
    if (initCartResponse.status === 0) {
      commit("initCart", initCartResponse.cart);
    } else {
      console.log(initCartResponse.msg);
    }
  }
};
