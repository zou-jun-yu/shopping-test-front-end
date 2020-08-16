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
      <RecommendList
        :dataSource="everydayData"
        title="每日推荐"
        height="110px"
      />
      <RecommendList
        :dataSource="fashionData"
        title="当季流行"
        height="150px"
      />
    </div>
  </div>
</template>

<script>
import Search from "@/components/Search";
import IconList from "@/components/home/IconList";
import RecommendList from "@/components/home/RecommendList";
import { reqGetGoodsDetail, reqGetCategoryById } from "~/api";
export default {
  name: "Home",
  async asyncData() {
    //在首页中要展示的分类或者商品的id
    const everydayDataIds = [
      "5f2f9496dc04dd1688cf09cb",
      "5f2f9559dc04dd1688cf09cc",
      "5f2f95b6dc04dd1688cf09cd",
      "5f2f966bdc04dd1688cf09d0",
      "5f2f96a8dc04dd1688cf09d1"
    ];
    const fashionDataIds = [
      "5f2f9816dc04dd1688cf09d2",
      "5f2f9891dc04dd1688cf09d3",
      "5f2f9902dc04dd1688cf09d4",
      "5f2f9981dc04dd1688cf09d5",
      "5f2f99f5dc04dd1688cf09d6"
    ];
    const bannerDataIds = [
      "5f2f8e6cdc04dd1688cf09c2",
      "5f2f8ff5dc04dd1688cf09c3",
      "5f2f90cddc04dd1688cf09c4",
      "5f2f9169dc04dd1688cf09c5",
      "5f2f920edc04dd1688cf09c6",
      "5f2f9320dc04dd1688cf09c8"
    ];
    const iconDataIds = [
      "5f2f9a90dc04dd1688cf09d7",
      "5f2f9acbdc04dd1688cf09d8",
      "5f2f9b0ddc04dd1688cf09d9",
      "5f2f9b31dc04dd1688cf09da",
      "5f2f9b57dc04dd1688cf09db",
      "5f2f9b79dc04dd1688cf09dc",
      "5f2f9b91dc04dd1688cf09dd",
      "5f2f9bcfdc04dd1688cf09df",
      "5f2f9beadc04dd1688cf09e0",
      "5f2f9c06dc04dd1688cf09e1"
    ];
    const everydayDataPromises = everydayDataIds.map(_id =>
      reqGetGoodsDetail({
        url: (process.server ? process.env.baseUrl : "") + "/api2/shopping/getGoodsDetail",
        _id
      })
    );
    const fashionDataPromises = fashionDataIds.map(_id =>
      reqGetGoodsDetail({
        url: (process.server ? process.env.baseUrl : "") + "/api2/shopping/getGoodsDetail",
        _id
      })
    );
    const bannerDataPromises = bannerDataIds.map(_id =>
      reqGetGoodsDetail({
        url: (process.server ? process.env.baseUrl : "") + "/api2/shopping/getGoodsDetail",
        _id
      })
    );
    const iconDataPromises = iconDataIds.map(_id =>
      reqGetCategoryById({
        url:
          (process.server ? process.env.baseUrl : "") + "/api2/shopping/getCategoryById",
        _id
      })
    );
    const ResponseArrayArray = await Promise.all([
      Promise.all(everydayDataPromises),
      Promise.all(fashionDataPromises),
      Promise.all(bannerDataPromises),
      Promise.all(iconDataPromises)
    ]);
    const everydayData = ResponseArrayArray[0].map(
      goodsDetailRes => goodsDetailRes.data.goodsDetail
    );
    const fashionData = ResponseArrayArray[1].map(
      goodsDetailRes => goodsDetailRes.data.goodsDetail
    );
    const bannerData = ResponseArrayArray[2].map(
      goodsDetailRes => goodsDetailRes.data.goodsDetail
    );
    const iconData = ResponseArrayArray[3].map(
      categoryRes => categoryRes.data.category
    );
    return {
      everydayData,
      fashionData,
      bannerData,
      iconData,
    };
  },
  components: {
    Search,
    IconList,
    RecommendList
  }
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
