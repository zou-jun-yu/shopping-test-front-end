<template>
  <div class="goods-list">
    <Search />
    <Orderbar />
    <ul
      v-infinite-scroll="loadMore"
      infinite-scroll-disabled="loading"
      infinite-scroll-distance="10"
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
import { reqGetGoodsList, reqSearchGoods } from "@/api";
export default {
  name: "GoodsList",
  components: {
    GoodsItem,
    Orderbar,
    Search
  },
  async asyncData({ params, query }) {
    if (params.categoryId) {
      const { data } = await reqGetGoodsList({
        url: (process.server ? process.env.baseUrl : "") + "/api2/shopping/getGoodsList",
        categoryId: params.categoryId,
        pageSize: 6,
        pageNumber: 1
      });
      return {
        goodsList: data.goodsList,
        loading: false,
        pageNumber: 1,
        total: data.total
      };
    } else {
      const { data } = await reqSearchGoods({
        url: (process.server ? process.env.baseUrl : "") + "/api2/shopping/searchGoods",
        keyWord: query.search,
        pageSize: 6,
        pageNumber: 1
      });
      return {
        goodsList: data.goodsList,
        loading: false,
        pageNumber: 1,
        total: data.total
      };
    }
  },
  methods: {
    async loadMore() {
      if (this.goodsList.length === this.total) {
        this.loading = true;
        return;
      }
      this.loading = true;
      this.pageNumber++;
      let result;
      if (this.$route.params.categoryId) {
        result = await reqGetGoodsList({
          url: "/api2/shopping/getGoodsList",
          categoryId: this.$route.params.categoryId,
          pageSize: 6,
          pageNumber: this.pageNumber
        });
      } else {
        result = await reqSearchGoods({
          url: "/api2/shopping/searchGoods",
          keyWord: this.$route.query.search,
          pageSize: 6,
          pageNumber: this.pageNumber
        });
      }
      this.goodsList = [...this.goodsList, ...result.data.goodsList];
      this.loading = false;
      this.total = result.data.total;
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
