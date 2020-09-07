<template>
  <div class="category">
    <Search />
    <div>
      <Sidebar
        :lv1Categories="lv1Categories"
        @lv1CategoryChange="lv1CategoryChange"
      />
      <Content :lv2Categories="lv2Categories" />
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Search from "@/components/Search";
import Sidebar from "@/components/category/Sidebar";
import Content from "@/components/category/Content";
import { reqGetCategoriesLv1, reqGetCategoriesLv2Andlv3 } from "@/api";
export default {
  name: "Category",
  async asyncData() {
    const lv1CategoriesResponse = await reqGetCategoriesLv1({
      url: (process.server ? process.env.baseUrl : "") + "/api2/shopping/getSubCategories"
    });
    const lv2CategoriesResponse = await reqGetCategoriesLv2Andlv3({
      url: (process.server
        ? process.env.baseUrl
        : "") + "/api2/shopping/getDescendantCategories",
      parentId: lv1CategoriesResponse.data.subCategories[0]._id
    });
    return {
      lv1Categories: lv1CategoriesResponse.data.subCategories,
      lv2Categories: lv2CategoriesResponse.data.lv2Categories
    };
  },
  methods: {
    async lv1CategoryChange(selectedIndex) {
      const lv2CategoriesResponse = await reqGetCategoriesLv2Andlv3({
        url: "/api2/shopping/getDescendantCategories",
        parentId: this.lv1Categories[selectedIndex]._id
      });
      this.lv2Categories = lv2CategoriesResponse.data.lv2Categories;
    }
  },
  components: {
    Search,
    Sidebar,
    Content
  }
};
</script>

<style lang="scss" scoped>
.category {
  flex-grow: 1;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  > div {
    flex-grow: 1;
    overflow: hidden;
    display: flex;
    align-items: stretch;
    background-color: #fff;
  }
}
</style>
