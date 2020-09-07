<template>
  <ul>
    <li
      v-for="(category, index) in lv1Categories"
      :key="category._id"
      @click="selectLv1Category(index)"
      :class="{ active: index === selectedIndex }"
    >
      {{ category.categoryName }}
    </li>
  </ul>
</template>

<script>
//分类页面的左侧一级分类
import axios from "axios";
export default {
  name: "Sidebar",
  props: {
    lv1Categories: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      selectedIndex: 0
    };
  },
  methods: {
    selectLv1Category(index) {
      this.selectedIndex = index;
      this.$emit("lv1CategoryChange", this.selectedIndex);
    }
  }
};
</script>

<style lang="scss" scoped>
ul {
  flex: none;
  overflow: auto;
  width: 90px;
  background-color: #f6f6f6;
  .active {
    background-color: #fff;
  }
  li {
    line-height: 50px;
    text-align: center;
    border-bottom: 2px solid #ebecee;
  }
}
</style>
