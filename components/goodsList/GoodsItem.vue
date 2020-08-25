<template>
  <div class="goods-item">
    <slot name="checkbox"></slot>
    <img
      :src="$imagesDir + goodsDetail.goodsImages[0]"
      :alt="goodsDetail.goodsName"
    />
    <div>
      <p class="desc">{{ goodsDetail.goodsName }}</p>
      <p>
        <slot name="price"></slot>
        <slot name="calculatePrice"></slot>
      </p>
    </div>
  </div>
</template>

<script>
//商品列表中的某一个商品展示
export default {
  name: "GoodsItem",
  props: {
    goodsDetail: {
      type: Object,
      required: true
    }
  }
};
</script>

<style lang="scss" scoped>
.goods-item {
  display: flex;
  align-items: center;
  padding: 10px;
  border-bottom: 1px solid #e6e6e6;
  background-color: #fff;
  img {
    width: 100px;
    height: 100px;
  }
  div {
    align-self: stretch;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding-left: 10px;
    line-height: 25px;
    font-size: 14px;
    .desc {
      line-height: 30px;
    }
  }
}
</style>
