<template>
  <div class="icon-list">
    <ul>
      <li
        v-for="icon in iconData"
        :key="icon._id"
        @click="$router.push('/goodsList/' + icon._id)"
      >
        <img :src="$imagesDir + icon.categoryImage" :alt="icon.categoryName" />
        <h4>{{ icon.categoryName }}</h4>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "IconList",
  props: {
    iconData: {
      type: Array,
      required: true
    }
  }
};
</script>

<style lang="scss" scoped>
.icon-list {
  width: 100%;
  overflow-x: auto;
  background-color: white;
  ul {
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    height: 200px;
    justify-content: space-evenly;
    li {
      display: flex;
      flex-direction: column;
      text-align: center;
      margin: 0 10px;
      img {
        width: 55px;
        height: 55px;
        border-radius: 50%;
        background-color: burlywood;
      }
    }
  }
}
</style>
