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
        <el-header style="text-align: right; font-size: 16px">
          <el-input
            v-model="search"
            size="mini"
            placeholder="输入关键字搜索"
            style="width:200px;margin-right:20px;"
          />
          <el-button type="text" @click="addSale()">新增</el-button>
          <el-button type="text" @click="exitSystem()">退出</el-button>
        </el-header>
        <el-table :data="tableData" style="width: 100%;" max-height="855">
          <el-table-column fixed prop="SignDate" label="日期" width="150"></el-table-column>
          <el-table-column prop="ContractNum" label="合同号" width="120"></el-table-column>
          <el-table-column prop="VIN" label="VIN" width="120"></el-table-column>
          <el-table-column prop="CustomerName" label="客户名称" width="150"></el-table-column>
          <el-table-column prop="CustomerPhone" label="客户联系方式" width="180"></el-table-column>
          <el-table-column prop="DeliveryDate" label="交货期" width="120"></el-table-column>
          <el-table-column prop="IsCompletion" label="完成情况" width="120"></el-table-column>
          <el-table-column fixed="right" label="操作" width="150">
            <template slot-scope="scope">
              <el-button @click="showSale(scope.row)" type="text" size="small">查看</el-button>
              <el-button @click="editSale(scope.row)" type="text" size="small">编辑</el-button>
              <el-button
                @click.native.prevent="deleteSale(scope.row)"
                type="text"
                size="small"
              >移除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-container>
      <el-dialog title="销售信息" :visible.sync="dialogFormVisible"  customClass="customWidth">
        <el-form :model="currentSale">
          <el-form-item label="签订日期" :label-width="formLabelWidth">
            <el-input v-model="currentSale.SignDate" auto-complete="off" :readonly="dialogReadonly"></el-input>
          </el-form-item>
          <el-form-item
            label="合同号"
            :label-width="formLabelWidth"
            auto-complete="off"
            :readonly="dialogReadonly"
          >
            <el-input
              v-model="currentSale.ContractNum"
              auto-complete="off"
              :readonly="dialogReadonly"
            ></el-input>
          </el-form-item>
          <el-form-item label="VIN" :label-width="formLabelWidth">
            <el-input v-model="currentSale.VIN" auto-complete="off" :readonly="dialogReadonly"></el-input>
          </el-form-item>
          <el-form-item label="客户名称" :label-width="formLabelWidth">
            <el-input
              v-model="currentSale.CustomerName"
              auto-complete="off"
              :readonly="dialogReadonly"
            ></el-input>
          </el-form-item>
          <el-form-item label="客户联系方式" :label-width="formLabelWidth">
            <el-input
              v-model="currentSale.CustomerPhone"
              auto-complete="off"
              :readonly="dialogReadonly"
            ></el-input>
          </el-form-item>
          <el-form-item label="交货期" :label-width="formLabelWidth">
            <el-input
              v-model="currentSale.DeliveryDate"
              auto-complete="off"
              :readonly="dialogReadonly"
            ></el-input>
          </el-form-item>
          <el-form-item label="完成情况" :label-width="formLabelWidth">
            <el-input
              v-model="currentSale.IsCompletion"
              auto-complete="off"
              :readonly="dialogReadonly"
            ></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="SaveSaleInfo()">确 定</el-button>
        </div>
      </el-dialog>
    </el-container>
  </el-container>
</template>


<style>
.el-header {
  background-color: #545c64;
  color: #fff;
  line-height: 60px;
}
.el-menu {
  min-height: 867px;
}
.el-aside {
  color: #333;
}
</style>

<script>
import https from "../../https.js";
export default {
  data() {
    return {
      formLabelWidth: "120px",
      dialogFormVisible: false,
      dialogReadonly: false,
      operationType: "1", // 操作类型,添加、编辑、查看
      activeIndex: "1",
      imgSrc: require("../../assets/images/wxjz.jpg"),
      navList: [
        { name: "/home", navItem: "首页" },
        { name: "/productmanage", navItem: "生产管理" },
        { name: "/salesmanage", navItem: "销售管理" },
        // { name: "/financialmanage", navItem: "财务管理" },
        // { name: "/procurementmanage", navItem: "进销存管理" },
        { name: "/about", navItem: "关于" },
      ],
      tableData: [],
      currentSale: {
        SignDate: "",
        ContractNum: "",
        VIN: "",
        CustomerName: "",
        CustomerPhone: "",
        DeliveryDate: "",
        IsCompletion: "",
      },
      search: "",
    };
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
    //查看生产信息
    showSale(sale) {
      this.dialogFormVisible = true;
      this.dialogReadonly = true;
      this.currentSale = sale;
      this.operationType = "1";
    },
    //添加生产信息
    addSale() {
      this.dialogFormVisible = true;
      this.dialogReadonly = false;

      var nowDate = new Date();
      let date = {
        year: nowDate.getFullYear(),
        month: nowDate.getMonth() + 1,
        date: nowDate.getDate(),
      };
      console.log(date);
      let systemDate = date.year + "-" + 0 + date.month + "-" + date.date;
      this.currentSale.SignDate = systemDate;

      this.operationType = "2";
    },
    //编辑生产信息
    editSale(sale) {
      this.dialogFormVisible = true;
      this.dialogReadonly = false;
      this.currentSale = sale;
      this.operationType = "3";
    },
    //删除生产信息
    deleteSale(sale) {
      let params = { vinNum: sale.VIN };
      https
        .fetchGet("Sales/DeleteSale", params)
        .then((data) => {
          this.$notify({
            title: "提示",
            message: data.data,
            duration: 3000,
          });
          if (data.data == "删除成功") {
            this.tableData.splice(this.tableData.indexOf(sale), 1); //删除表格信息
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    //保存销售信息
    SaveSaleInfo() {
      this.dialogFormVisible = true;

      if (this.operationType == "2") {
        let params = { sale: this.currentSale };
        https
          .fetchGet("Sales/AddSale", params)
          .then((data) => {
            this.$notify({
              title: "提示",
              message: data.data,
              duration: 3000,
            });
            if (data.data == "添加成功") {
              this.tableData.push(this.currentSale);
              this.dialogFormVisible = false;
            }
          })
          .catch((err) => {
            console.log(err);
          });
      } else if (this.operationType == "3") {
        let params = { sale: this.currentSale };
        https
          .fetchGet("Sales/UpdateSale", params)
          .then((data) => {
            this.$notify({
              title: "提示",
              message: data.data,
              duration: 3000,
            });
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },
    //退出系统
    exitSystem() {
      this.$router.push("/login");
    },
  },
  created: function () {
    https
      .fetchGet("Sales/GetAllSales")
      .then((data) => {
        this.tableData = data.data;
      })
      .catch((err) => {
        console.log(err);
      });
  },
};
</script>