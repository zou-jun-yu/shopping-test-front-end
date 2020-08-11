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
          :style="{ width: '110px', height }"
        />
        <h4>{{ goodsDetail.goodsName }}</h4>
      </li>
    </ul>
  </div>
</template>

<script>
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
    },
    height: {
      type: String,
      required: true
    }
  }
};
</script>

<style lang="scss" scoped>
.recommendList {
  background-color: white;
  margin-top: 10px;
  h3 {
    padding: 0 3px;
  }
  ul {
    display: flex;
    overflow-x: auto;
    width: 100%;
    li {
      flex-shrink: 0;
      padding: 0 10px;
      text-align: center;
    }
  }
}
</style>
