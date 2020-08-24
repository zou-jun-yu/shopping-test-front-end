<template>
  <div class="category">
    <Search />
    <div>
      <Sidebar
        :level1Categories="level1Categories"
        @mainCategoryChange="mainCategoryChange"
      />
      <Content :level2Categories="level2Categories" />
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Search from "@/components/Search";
import Sidebar from "@/components/category/Sidebar";
import Content from "@/components/category/Content";
import { reqGetCategoriesLevel1, reqGetCategoriesLevel2Andlevel3 } from "@/api";
export default {
  name: "Category",
  async asyncData() {
    const level1CategoriesResponse = await reqGetCategoriesLevel1({
      url: (process.server ? process.env.baseUrl : "") + "/api2/shopping/getSubCategories"
    });
    const level2CategoriesResponse = await reqGetCategoriesLevel2Andlevel3({
      url: (process.server
        ? process.env.baseUrl
        : "") + "/api2/shopping/getSubCategoriesLevel2AndLevel3",
      parentId: level1CategoriesResponse.data.subCategories[0]._id
    });
    return {
      level1Categories: level1CategoriesResponse.data.subCategories,
      level2Categories: level2CategoriesResponse.data.categoriesLevel2
    };
  },
  methods: {
    async mainCategoryChange(selectedIndex) {
      const level2CategoriesResponse = await reqGetCategoriesLevel2Andlevel3({
        url: "/api2/shopping/getSubCategoriesLevel2AndLevel3",
        parentId: this.level1Categories[selectedIndex]._id
      });
      this.level2Categories = level2CategoriesResponse.data.categoriesLevel2;
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
