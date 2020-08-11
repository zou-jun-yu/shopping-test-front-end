<template>
  <div class="orderbar">
    <span>综合</span>
    <span>销量</span>
    <span>新品</span>
    <span>价格</span>
  </div>
</template>

<script>
export default {
  name: "Orderbar"
};
</script>

<style lang="scss" scoped>
.orderbar {
  flex: none;
  display: flex;
  margin: 0 10px;
  padding: 5px;
  background-color: #f6f6f6;
  span {
    line-height: 20px;
    text-align: center;
    flex-grow: 1;
    border-right: 1px solid #d3d3d3;
    &:last-child {
      border-right: none;
    }
  }
}
</style>