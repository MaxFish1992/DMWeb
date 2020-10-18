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
        <el-header style="text-align: right; font-size: 16px">
          <el-input
            v-model="search"
            size="mini"
            placeholder="输入关键字搜索"
            style="width: 200px; margin-right: 20px"
          />
          <el-button type="text" @click="addSale()">新增</el-button>
          <el-button type="text" @click="exitSystem()">退出</el-button>
        </el-header>
        <el-tabs v-model="activeName">
          <el-tab-pane label="自卸半挂" name="first">
            <el-table
              :data="bgcFilterData"
              style="width: 100%"
              max-height="855"
            >
              <el-table-column
                prop="ContractNum"
                label="合同号"
                width="120"
              ></el-table-column>
              <el-table-column
                prop="VINNum"
                label="VIN"
                width="120"
              ></el-table-column>
              <el-table-column
                prop="Blanking"
                label="下料"
                width="120"
              ></el-table-column>
              <el-table-column
                prop="Floor"
                label="底板"
                width="120"
              ></el-table-column>
              <el-table-column
                prop="SideBoard"
                label="边板"
                width="120"
              ></el-table-column>
              <el-table-column
                prop="FrontDoor"
                label="前挡"
                width="120"
              ></el-table-column>
              <el-table-column
                prop="BackDoor"
                label="后门"
                width="120"
              ></el-table-column>
              <el-table-column
                prop="CloseCompartments"
                label="合厢"
                width="120"
              ></el-table-column>
              <el-table-column
                prop="FinalAssembly"
                label="装厢"
                width="120"
              ></el-table-column>
              <el-table-column
                prop="Girder"
                label="大梁"
                width="120"
              ></el-table-column>
              <el-table-column
                prop="Bridge"
                label="装桥"
                width="120"
              ></el-table-column>
              <el-table-column
                prop="SmallParts"
                label="小件"
                width="120"
              ></el-table-column>
              <el-table-column
                prop="SprayPaint"
                label="喷漆"
                width="120"
              ></el-table-column>
              <el-table-column fixed="right" label="操作" width="150">
                <template slot-scope="scope">
                  <el-button
                    @click="showSale(scope.row)"
                    type="text"
                    size="small"
                    >查看</el-button
                  >
                  <el-button
                    @click="editSale(scope.row)"
                    type="text"
                    size="small"
                    >编辑</el-button
                  >
                  <el-button
                    @click.native.prevent="deleteSale(scope.row)"
                    type="text"
                    size="small"
                    >移除</el-button
                  >
                </template>
              </el-table-column>
            </el-table>
          </el-tab-pane>
          <el-tab-pane label="自卸车" name="second">
            <el-table
              :data="zxcFilterData"
              style="width: 100%"
              max-height="855"
            >
              <el-table-column
                prop="ContractNum"
                label="合同号"
                width="120"
              ></el-table-column>
              <el-table-column
                prop="VINNum"
                label="底盘号"
                width="120"
              ></el-table-column>
              <el-table-column
                prop="Blanking"
                label="下料"
                width="120"
              ></el-table-column>
              <el-table-column
                prop="Floor"
                label="底板"
                width="120"
              ></el-table-column>
              <el-table-column
                prop="SideBoard"
                label="边板"
                width="120"
              ></el-table-column>
              <el-table-column
                prop="FrontDoor"
                label="前挡"
                width="120"
              ></el-table-column>
              <el-table-column
                prop="BackDoor"
                label="后门"
                width="120"
              ></el-table-column>
              <el-table-column
                prop="CloseCompartments"
                label="合厢"
                width="120"
              ></el-table-column>
              <el-table-column
                prop="FinalAssembly"
                label="装厢"
                width="120"
              ></el-table-column>
              <el-table-column
                prop="SmallParts"
                label="小件"
                width="120"
              ></el-table-column>
              <el-table-column
                prop="SprayPaint"
                label="喷漆"
                width="120"
              ></el-table-column>
              <el-table-column fixed="right" label="操作" width="150">
                <template slot-scope="scope">
                  <el-button
                    @click="showSale(scope.row)"
                    type="text"
                    size="small"
                    >查看</el-button
                  >
                  <el-button
                    @click="editSale(scope.row)"
                    type="text"
                    size="small"
                    >编辑</el-button
                  >
                  <el-button
                    @click.native.prevent="deleteSale(scope.row)"
                    type="text"
                    size="small"
                    >移除</el-button
                  >
                </template>
              </el-table-column>
            </el-table>
          </el-tab-pane>
        </el-tabs>
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
import https from "../../https.js"; // 注意用自己的路径
export default {
  data() {
    return {
      activeName: "first",
      activeIndex: "1",
      imgSrc: require("../../assets/images/wxjz.jpg"),
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