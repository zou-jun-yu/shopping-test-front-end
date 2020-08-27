<template>
  <div class="goods-list">
    <Search />
    <Orderbar
      :isAscending="isAscending"
      :sortField="sortField"
      @change-sort-field="rearrangement($event)"
    />
    <ul
      v-infinite-scroll="loadMore"
      infinite-scroll-disabled="loading"
      infinite-scroll-distance="10"
      ref="goodsList"
    >
      <li
        v-for="goodsDetail in goodsList"
        :key="goodsDetail._id"
        @click="$router.push('/detail/' + goodsDetail._id)"
      >
        <GoodsItem :goodsDetail="goodsDetail">
          <template v-slot:price>
            <span class="now-price">￥{{ goodsDetail.nowPrice }}</span>
            <span class="market-price">￥{{ goodsDetail.marketPrice }}</span>
            <span
              >折扣{{
                ((goodsDetail.nowPrice / goodsDetail.marketPrice) * 10).toFixed(
                  1
                )
              }}折</span
            >
          </template>
        </GoodsItem>
      </li>
      <p v-if="goodsList.length < total">loading...</p>
      <p v-else>到底啦！</p>
    </ul>
  </div>
</template>

<script>
import axios from "axios";
import Search from "@/components/Search";
import GoodsItem from "@/components/goodsList/GoodsItem";
import Orderbar from "@/components/goodsList/Orderbar";
import { reqGetGoodsList } from "@/api";
export default {
  name: "GoodsList",
  components: {
    GoodsItem,
    Orderbar,
    Search
  },
  //路由参数改变了，但仍然对应同一个组件时
  async beforeRouteUpdate(to, from, next) {
    let dynamicAttr, dynamicValue;
    if (from.query.search !== to.query.search) {
      dynamicAttr = "keyWord";
      dynamicValue = to.query.search;
    } else if (from.params.categoryId !== to.params.categoryId) {
      dynamicAttr = "categoryId";
      dynamicValue = to.params.categoryId;
    }
    const { data } = await reqGetGoodsList({
      url: "/api2/shopping/getGoodsList",
      [dynamicAttr]: dynamicValue,
      pageSize: 6,
      pageNumber: 1,
      sortField: this.sortField,
      isAscending: this.isAscending
    });
    this.goodsList = data.goodsList;
    this.total = data.total;
    this.loading = false;
    this.pageNumber = 1;
    next();
  },
  async asyncData({ params, query }) {
    let dynamicAttr, dynamicValue;
    if (params.categoryId) {
      dynamicAttr = "categoryId";
      dynamicValue = params.categoryId;
    } else {
      dynamicAttr = "keyWord";
      dynamicValue = query.search;
    }
    const { data } = await reqGetGoodsList({
      url:
        (process.server ? process.env.baseUrl : "") +
        "/api2/shopping/getGoodsList",
      [dynamicAttr]: dynamicValue,
      pageSize: 6,
      pageNumber: 1,
      sortField: "salesNumber",
      isAscending: false
    });
    return {
      goodsList: data.goodsList,
      loading: false,
      pageNumber: 1,
      total: data.total,
      sortField: "salesNumber",
      isAscending: false
    };
  },
  methods: {
    async loadMore() {
      if (this.goodsList.length === this.total) {
        this.loading = true;
        return;
      }
      this.loading = true;
      this.pageNumber++;
      let dynamicAttr, dynamicValue;
      if (this.$route.params.categoryId) {
        dynamicAttr = "categoryId";
        dynamicValue = this.$route.params.categoryId;
      } else {
        dynamicAttr = "keyWord";
        dynamicValue = this.$route.query.search;
      }
      const result = await reqGetGoodsList({
        url: "/api2/shopping/getGoodsList",
        [dynamicAttr]: dynamicValue,
        pageSize: 6,
        pageNumber: this.pageNumber,
        sortField: this.sortField,
        isAscending: this.isAscending
      });
      this.goodsList = [...this.goodsList, ...result.data.goodsList];
      this.loading = false;
      this.total = result.data.total;
    },
    async rearrangement(sortField) {
      this.$refs.goodsList.scrollTop = 0;
      if (sortField === this.sortField) {
        this.isAscending = !this.isAscending;
      } else {
        this.sortField = sortField;
        this.isAscending = false;
      }
      let dynamicAttr, dynamicValue;
      if (this.$route.params.categoryId) {
        dynamicAttr = "categoryId";
        dynamicValue = this.$route.params.categoryId;
      } else {
        dynamicAttr = "keyWord";
        dynamicValue = this.$route.query.search;
      }
      const result = await reqGetGoodsList({
        url:
          (process.server ? process.env.baseUrl : "") +
          "/api2/shopping/getGoodsList",
        [dynamicAttr]: dynamicValue,
        pageSize: 6,
        pageNumber: 1,
        sortField: this.sortField,
        isAscending: this.isAscending
      });
      this.goodsList = result.data.goodsList;
      this.total = result.data.total;
      this.loading = false;
      this.pageNumber = 1;
    }
  }
};
</script>

<style lang="scss" scoped>
.goods-list {
  flex-grow: 1;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  background-color: #fff;
  ul {
    flex-grow: 1;
    overflow: auto;
    .now-price {
      color: red;
      font-size: 16px;
    }
    .market-price {
      text-decoration: line-through;
      margin-right: 30px;
    }
  }
}
</style>
