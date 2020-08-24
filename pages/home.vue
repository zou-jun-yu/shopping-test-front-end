<template>
  <div id="home">
    <Search />
    <div class="show">
      <mt-swipe
        :auto="4000"
        style="height:150px; overflow:hidden; border-radius:10px; margin:5px"
      >
        <mt-swipe-item v-for="banner in bannerData" :key="banner._id">
          <img
            style="height:100%; width:100%;"
            :src="$imagesDir + banner.goodsImages[0]"
            :alt="banner.goodsName"
            @click="$router.push('/detail/' + banner._id)"
          />
        </mt-swipe-item>
      </mt-swipe>
      <IconList :iconData="iconData" />
      <RecommendList :dataSource="everydayData" title="精选好货" />
      <RecommendList :dataSource="fashionData" title="当季流行" />
      <TodaySales :todaySalesData="todaySalesData" title="今日特卖" />
      <footer>
        <p>
          Copyright © 2008-2019 mmm.ccc.com, All Rights Reserved
          粤ICP备0123456号
        </p>
        <p>
          <img src="@/assets/police.gif" alt="网络工商" /><span
            >粤公网安备 22222222000000号</span
          >
        </p>
      </footer>
    </div>
  </div>
</template>

<script>
import Search from "@/components/Search";
import IconList from "@/components/home/IconList";
import RecommendList from "@/components/home/RecommendList";
import TodaySales from "@/components/home/TodaySales";
import { reqGetRandomGoods, reqGetRandomCategoriesLevel3 } from "~/api";
export default {
  name: "Home",
  async asyncData() {
    const categoryPromise = reqGetRandomCategoriesLevel3({
      url:
        (process.server ? process.env.baseUrl : "") +
        "/api2/shopping/getRandomCategoriesLevel3",
      categoryNumber: 10
    });
    const goodsPromise = reqGetRandomGoods({
      url:
        (process.server ? process.env.baseUrl : "") +
        "/api2/shopping/getRandomGoods",
      goodsNumber: 40
    });
    const categoriesLevel3Response = await categoryPromise;
    const goodsResponse = await goodsPromise;
    const goodsList = goodsResponse.data.goodsList;
    return {
      everydayData: goodsList.slice(0, 10),
      fashionData: goodsList.slice(10, 20),
      bannerData: goodsList.slice(20, 30),
      todaySalesData: goodsList.slice(30, 40),
      iconData: categoriesLevel3Response.data.categories
    };
  },
  components: {
    Search,
    IconList,
    RecommendList,
    TodaySales
  }
};
</script>

<style lang="scss" scoped>
#home {
  flex-grow: 1;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  background-color: #f2f2f2;
  .show {
    flex-grow: 1;
    overflow: auto;
    margin-top: 3px;
  }
  footer {
    text-align: center;
    color: #d3d4d4;
    font-size: 14px;
    p {
      margin-top: 20px;
    }
    img{
      width: 18px;
      position: relative;
      top: 4px;
    }
  }
}
</style>
