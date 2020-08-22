<template>
  <div id="home">
    <Search />
    <div class="show">
      <mt-swipe :auto="4000" style="height:150px">
        <mt-swipe-item v-for="banner in bannerData" :key="banner._id">
          <img
            style="height:100%; width:100%"
            :src="$imagesDir + banner.goodsImages[0]"
            :alt="banner.goodsName"
            @click="$router.push('/detail/' + banner._id)"
          />
        </mt-swipe-item>
      </mt-swipe>
      <IconList :iconData="iconData" />
      <RecommendList :dataSource="everydayData" title="每日推荐" height="110px" />
      <RecommendList :dataSource="fashionData" title="当季流行" height="150px" />
    </div>
  </div>
</template>

<script>
import Search from "@/components/Search";
import IconList from "@/components/home/IconList";
import RecommendList from "@/components/home/RecommendList";
import { reqGetRandomGoods, reqGetRandomCategoriesLevel3 } from "~/api";
export default {
  name: "Home",
  async asyncData() {
    const categoryPromise = reqGetRandomCategoriesLevel3({
      url:
        (process.server ? process.env.baseUrl : "") +
        "/api2/shopping/getRandomCategoriesLevel3",
      categoryNumber: 10,
    });
    const goodsPromise = reqGetRandomGoods({
      url:
        (process.server ? process.env.baseUrl : "") +
        "/api2/shopping/getRandomGoods",
      goodsNumber: 30,
    });
    const categoriesLevel3Response = await categoryPromise;
    const goodsResponse = await goodsPromise;
    const goodsList = goodsResponse.data.goodsList;
    return {
      everydayData: goodsList.slice(0, 10),
      fashionData: goodsList.slice(10, 20),
      bannerData: goodsList.slice(20, 30),
      iconData: categoriesLevel3Response.data.categories,
    };
  },
  components: {
    Search,
    IconList,
    RecommendList,
  },
};
</script>

<style lang="scss" scoped>
#home {
  flex-grow: 1;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  .show {
    flex-grow: 1;
    overflow: auto;
  }
}
</style>
