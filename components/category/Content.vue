<template>
  <div class="content" ref="content">
    <dl v-for="lv2Category in lv2Categories" :key="lv2Category._id">
      <dt>
        <h3>{{ lv2Category.categoryName }}</h3>
      </dt>
      <div>
        <dd
          v-for="lv3Category in lv2Category.children"
          :key="lv3Category._id"
          @click="$router.push('/goodsList/' + lv3Category._id)"
        >
          <img
            :src="$imagesDir + lv3Category.categoryImage"
            :alt="lv3Category.categoryName"
          />
          <h4>{{ lv3Category.categoryName }}</h4>
        </dd>
      </div>
    </dl>
  </div>
</template>

<script>
// 某个一级分类下的所有二级、三级分类展示区组件
export default {
  name: "Content",
  props: {
    lv2Categories: {
      type: Array,
      required: true
    }
  },
  updated() {
    this.$refs.content.scrollTop = 0;
  }
};
</script>

<style lang="scss" scoped>
.content {
  flex-grow: 1;
  overflow: auto;
  margin: 10px;
  background-color: #fff;
  dl {
    margin-top: 10px;
    border-bottom: 1px solid #e7e7e7;
    h3 {
      padding-left: 20px;
    }
    div {
      display: flex;
      flex-wrap: wrap;
      dd {
        padding: 10px;
        font-size: 14px;
        text-align: center;
        img {
          width: 55px;
          height: 55px;
        }
      }
    }
  }
}
</style>
