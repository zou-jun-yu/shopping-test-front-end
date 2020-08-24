<template>
  <div class="icon-list">
    <ul>
      <li
        v-for="icon in iconData"
        :key="icon._id"
        @click="$router.push('/goodsList/' + icon._id)"
      >
        <img :src="$imagesDir + icon.categoryImage" :alt="icon.categoryName" />
        <h4>
          {{ icon.categoryName.substr(0, Math.round(Math.random() + 2)) }}
        </h4>
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
  margin-top: 6px;
  background-color: #fff;
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
        width: 50px;
        height: 50px;
        border-radius: 50%;
        border: 2px solid #dc38d5;
      }
      h4{
        font-size: 14px;
      }
    }
  }
}
</style>
