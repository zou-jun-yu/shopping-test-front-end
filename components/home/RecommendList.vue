<template>
  <div class="recommendList">
    <h3>{{ title }}</h3>
    <ul>
      <li
        v-for="goodsDetail in dataSource"
        :key="goodsDetail._id"
        @click="$router.push('/detail/' + goodsDetail._id)"
      >
        <img
          :src="$imagesDir + goodsDetail.goodsImages[0]"
          :alt="goodsDetail.goodsDescription"
          :style="{ width: '80px', height: '80px' }"
        />
        <h4>
          {{
            goodsDetail.goodsName.substr(0, Math.round(Math.random() * 2 + 3))
          }}
        </h4>
        <p>￥{{goodsDetail.nowPrice}}</p>
      </li>
    </ul>
  </div>
</template>

<script>
//精选好货或当季流行展示区做成一个组件
export default {
  name: "RecommendList",
  props: {
    dataSource: {
      type: Array,
      required: true
    },
    title: {
      type: String,
      required: true
    }
  }
};
</script>

<style lang="scss" scoped>
.recommendList {
  margin: 15px 5px;
  border-radius: 10px;
  background-color: #fff;
  h3 {
    padding: 5px 3px;
    color: #ca5155;
  }
  ul {
    display: flex;
    overflow-x: auto;
    width: 100%;
    li {
      flex-shrink: 0;
      padding: 0 10px;
      text-align: center;
      font-size: 14px;
      p{
        color: red;
      }
    }
  }
}
</style>
