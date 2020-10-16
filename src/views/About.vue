<template>
  <el-container>
    <el-header style="text-align: center; font-size: 30px"
      >智能化生产管理系统</el-header
    >
    <el-container style="height: 100%; border: 1px solid #eee">
      <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
        <el-menu
          :default-openeds="['1', '1']"
          :router="true"
          :default-active="this.$route.path"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
          @select="handleSelect"
        >
          <el-menu-item
            v-for="(item, i) in menuitems"
            :key="i"
            :index="item.router"
            >{{ item.name }}</el-menu-item
          >
        </el-menu>
      </el-aside>

      <el-container>
        <h3>关于</h3>
      </el-container>
    </el-container>
  </el-container>
</template>


<style>
.el-header {
  background-color: #545c64;
  color: #fff;
  line-height: 60px;
}

.el-aside {
  color: #333;
}
</style>

<script>
import https from "../https.js"; // 注意用自己的路径
export default {
  data() {
    return {
      activeIndex: "1",
      imgSrc: require("../assets/images/wxjz.jpg"),
      menuitems: [],
    };
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
  },
  created: function () {
      let params = { authority: this.$root.user.authority };
      https
        .fetchGet("Menu/getmenu", params)
        .then((data) => {
          this.menuitems = [];
          this.menuitems = data.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
};
</script>