<template>
  <div class="message-box">
    <h2 v-if="title">{{title}}</h2>
    <p v-if="content">{{content}}</p>
    <div>
      <div v-if="cancel" @click="onCancel">{{cancel}}</div>
      <div v-if="ok" @click="onOk">{{ok}}</div>
    </div>
  </div>
</template>

<script>
//消息弹出框
export default {
  name: "MessageBox"
};
</script>

<style lang="scss" scoped>
.message-box {
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translateX(-50%) translateY(-50%);
  width: 220px;
  height: 130px;
  border: 1px #ccc solid;
  background-color: #fff;
  text-align: center;
  line-height: 40px;
  h2 {
    font-size: 18px;
  }
  > div {
    display: flex;
    position: absolute;
    width: 100%;
    bottom: 0;
    border-top: 1px #ccc solid;
    div {
      flex-grow: 1;
      border-right: 1px #ccc solid;
      &:last-child {
        border-right: none;
      }
    }
  }
}
</style>