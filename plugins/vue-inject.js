import Vue from "vue";

Vue.prototype.$imagesDir =
  process.env.NODE_ENV === "production"
    ? "http://47.115.157.0/images/"
    : "http://127.0.0.1:5000/images/uploads/";
// Vue.prototype.$imagesDir="http://47.115.157.0:5000/images/uploads/";
// Vue.prototype.$imagesDir="http://127.0.0.1:5000/images/uploads/";
