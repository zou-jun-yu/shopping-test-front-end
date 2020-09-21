<template>
  <div class="recommendList">
    <h3>{{ title }}</h3>
    <div class="wrap">
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
          <p>￥{{ goodsDetail.nowPrice }}</p>
        </li>
      </ul>
    </div>
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
  display: inline-block;
  margin: 15px 5px;
  border-radius: 10px;
  background-color: #fff;
  // text-align: center;
  max-width: 95%;
  h3 {
    padding: 5px 3px;
    color: #ca5155;
    text-align: left;
  }
  .wrap {
    display: inline-block;
    max-width: 100%;
    overflow-x: auto;
    ul {
      display: inline-block;
      white-space: nowrap;
      // width: 100%;
      li {
        display: inline-block;
        // flex-shrink: 0;
        padding: 0 10px;
        // text-align: center;
        font-size: 14px;
        p {
          color: red;
        }
      }
    }
  }
}
</style>
