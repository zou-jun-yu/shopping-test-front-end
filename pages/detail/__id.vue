<template>
  <div>
    <div class="goods-detail">
      <mt-swipe :auto="0" style="height:375px;position:relative">
        <i class="iconfont back" @click="$router.go(-1)">&#xe611;</i>
        <i class="iconfont cart">&#xe6df;</i>
        <mt-swipe-item
          v-for="(goodsImage, index) in goodsDetail.goodsImages"
          :key="index"
        >
          <img
            :src="$imagesDir + goodsImage"
            alt
            style="width:100%; height:100%"
          />
        </mt-swipe-item>
      </mt-swipe>
      <div class="description">
        <span class="now-price">￥{{ goodsDetail.nowPrice }}</span>
        <span class="price">￥{{ goodsDetail.marketPrice }}</span>
        <span class="discount"
          >{{
            ((goodsDetail.nowPrice / goodsDetail.marketPrice) * 10).toFixed(1)
          }}折</span
        >
        <p class="title">{{ goodsDetail.goodsName }}</p>
        <p class="store-name">萨拉蒂恩</p>
      </div>
      <div class="service">
        <span>服务：</span>
        <span>正品保证</span>
        <span>专业鉴定</span>
        <span>7填无理由退货</span>
        <span>急速退款</span>
      </div>
      <div>配送至</div>
      <div>
        <p>请选择：颜色/尺码</p>
        <p>参数：品牌/材质</p>
      </div>
      <div>商品评价</div>
      <div>店铺信息</div>
      <div>图文详情</div>
    </div>
    <DetailFooter :goodsDetail="goodsDetail" />
  </div>
</template>

<script>
import axios from "axios";
import DetailFooter from "@/components/detail/DetailFooter";
import { reqGetGoodsDetail } from "@/api";
export default {
  layout: "detailTemplate",
  name: "Detail",
  async asyncData({ params }) {
    const { data } = await reqGetGoodsDetail({
      url: (process.server ? process.env.baseUrl : "") + "/api2/shopping/getGoodsDetail",
      _id: params._id
    });
    return { goodsDetail: data.goodsDetail };
  },
  components: {
    DetailFooter
  }
};
</script>

<style lang="scss" scoped>
.goods-detail {
  flex-grow: 1;
  overflow: auto;
  padding: 10px;
  margin-bottom: 100px;
  .iconfont {
    position: absolute;
    z-index: 999;
    top: 10px;
    padding: 5px;
    border-radius: 50%;
    background-color: rgba(0, 0, 0, 0.7);
    color: white;
    font-size: 20px;
  }
  .back {
    left: 10px;
  }
  .cart {
    right: 10px;
  }
  > div:nth-of-type(n + 2) {
    background-color: #fff;
    margin-bottom: 10px;
    line-height: 25px;
  }
  .description {
    padding: 10px 0;
    line-height: 20px;
    .now-price {
      color: red;
      font-size: 20px;
    }
    .class {
      color: #9e9e9e;
    }
    .discount {
      color: #9e9e9e;
    }
    .title {
      line-height: 25px;
      margin: 10px 0;
    }
    .store-name {
      color: blue;
      font-size: 12px;
    }
  }
  .service span {
    display: inline-block;
    padding-right: 30px;
  }
}
</style>
