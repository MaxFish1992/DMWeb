<template>
  <el-container>
    <el-header style="text-align: center; font-size: 26px">智能化生产管理系统</el-header>
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
          <el-menu-item v-for="(item,i) in navList" :key="i" :index="item.name">{{ item.navItem }}</el-menu-item>
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
export default {
  data() {
    return {
      activeIndex: "1",
      imgSrc: require("../assets/images/wxjz.jpg"),
      navList: [
        { name: "/home", navItem: "首页" },
        { name: "/productmanage", navItem: "生产管理" },
        // { name: "/salesmanage", navItem: "销售管理" },
        // { name: "/financialmanage", navItem: "财务管理" },
        // { name: "/procurementmanage", navItem: "进销存管理" },
        { name: "/about", navItem: "关于" },
      ],
    };
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
  },
};
</script>