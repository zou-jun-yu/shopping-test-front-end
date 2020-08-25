<template>
  <div class="content">
    <dl v-for="level2Category in level2Categories" :key="level2Category._id">
      <dt>
        <h3>{{ level2Category.categoryName }}</h3>
      </dt>
      <div>
        <dd
          v-for="level3Category in level2Category.children"
          :key="level3Category._id"
          @click="$router.push('/goodsList/' + level3Category._id)"
        >
          <img
            :src="$imagesDir + level3Category.categoryImage"
            :alt="level3Category.categoryName"
          />
          <h4>{{ level3Category.categoryName }}</h4>
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
    level2Categories: {
      type: Array,
      required: true
    }
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
