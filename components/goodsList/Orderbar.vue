<template>
  <div class="orderbar">
    <span
      :class="{
        activeAsc: sortField === '_id' && isAscending === true,
        activeDesc: sortField === '_id' && isAscending === false
      }"
      @click="$emit('change-sort-field', '_id')"
      >新品</span
    >
    <span
      :class="{
        activeAsc: sortField === 'salesNumber' && isAscending === true,
        activeDesc: sortField === 'salesNumber' && isAscending === false
      }"
      @click="$emit('change-sort-field', 'salesNumber')"
      >销量</span
    >
    <span
      :class="{
        activeAsc: sortField === 'goodsName' && isAscending === true,
        activeDesc: sortField === 'goodsName' && isAscending === false
      }"
      @click="$emit('change-sort-field', 'goodsName')"
      >综合</span
    >
    <span
      :class="{
        activeAsc: sortField === 'nowPrice' && isAscending === true,
        activeDesc: sortField === 'nowPrice' && isAscending === false
      }"
      @click="$emit('change-sort-field', 'nowPrice')"
      >价格</span
    >
  </div>
</template>

<script>
//排序导航栏
export default {
  name: "Orderbar",
  props: {
    isAscending: {
      type: Boolean,
      requied: true
    },
    sortField: {
      type: String,
      requied: true
    }
  }
};
</script>

<style lang="scss" scoped>
.orderbar {
  flex: none;
  display: flex;
  margin: 5px 10px;
  background-color: #f6f6f6;
  span {
    line-height: 30px;
    text-align: center;
    flex-grow: 1;
    border-right: 1px solid #d3d3d3;
    &:last-child {
      border-right: none;
    }
  }
  .activeAsc {
    position: relative;
    background-color: #fff;
    color: red;
    &::after {
      content: "↑";
      position: absolute;
      right: 12px;
    }
  }
  .activeDesc {
    position: relative;
    background-color: #fff;
    color: red;
    &::after {
      content: "↓";
      right: 12px;
      position: absolute;
    }
  }
}
</style>
