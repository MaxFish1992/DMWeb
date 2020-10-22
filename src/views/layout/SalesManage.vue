<template>
  <el-container>
    <el-header style="text-align: center; font-size: 26px"
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
            v-for="(item, i) in $root.menuitems"
            :key="i"
            :index="item.router"
            >{{ item.name }}</el-menu-item
          >
        </el-menu>
      </el-aside>

      <el-container>
        <el-header style="text-align: right; font-size: 16px">
          <el-date-picker
            v-model="queryrange"
            type="daterange"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            value-format="yyyy-MM-dd"
          >
          </el-date-picker>
          <el-button
            type="text"
            @click="queryByDate()"
            style="margin-right: 50px; margin-left: 10px"
            >查询</el-button
          >
          <el-input
            v-model="searchProduct"
            placeholder="输入关键字搜索"
            style="width: 200px; margin-right: 20px"
          />
          <el-button type="text" @click="addSale()">新增</el-button>
          <el-button type="text" @click="ExportTable()">导出</el-button>
          <el-button type="text" @click="exitSystem()">退出</el-button>
        </el-header>
        <el-tabs v-model="activeName">
          <el-tab-pane label="自卸半挂" name="first">
            <el-table
              class="bgctable"
              :data="bgcFilterData"
              style="width: 100%"
              max-height="855"
            >
              <el-table-column
                fixed
                prop="ProductDate"
                label="日期"
                width="120"
                :formatter="formatDate"
              ></el-table-column>
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
              class="zxctable"
              :data="zxcFilterData"
              style="width: 100%"
              max-height="855"
            >
              <el-table-column
                fixed
                prop="ProductDate"
                label="日期"
                width="120"
                :formatter="formatDate"
              ></el-table-column>
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
      <el-dialog
        title="半挂车生产信息"
        :visible.sync="dialogFormVisible"
        width="25%"
      >
        <el-form :model="product">
          <el-form-item label="生产日期" :label-width="formLabelWidth">
            <el-date-picker
              v-model="product.ProductDate"
              type="date"
              placeholder="选择日期"
              value-format="yyyy-MM-dd"
            >
            </el-date-picker>
          </el-form-item>
          <el-form-item label="合同号" :label-width="formLabelWidth">
            <el-input
              v-model="product.ContractNum"
              auto-complete="off"
              :readonly="dialogReadonly"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="VIN"
            :label-width="formLabelWidth"
            auto-complete="off"
            :readonly="dialogReadonly"
          >
            <el-input
              v-model="product.VINNum"
              auto-complete="off"
              :readonly="dialogReadonly"
            ></el-input>
          </el-form-item>
          <el-form-item label="下料" :label-width="formLabelWidth">
            <el-input
              v-model="product.Blanking"
              auto-complete="off"
              :readonly="dialogReadonly"
            ></el-input>
          </el-form-item>
          <el-form-item label="底板" :label-width="formLabelWidth">
            <el-input
              v-model="product.Floor"
              auto-complete="off"
              :readonly="dialogReadonly"
            ></el-input>
          </el-form-item>
          <el-form-item label="边板" :label-width="formLabelWidth">
            <el-input
              v-model="product.SideBoard"
              auto-complete="off"
              :readonly="dialogReadonly"
            ></el-input>
          </el-form-item>
          <el-form-item label="前挡" :label-width="formLabelWidth">
            <el-input
              v-model="product.FrontDoor"
              auto-complete="off"
              :readonly="dialogReadonly"
            ></el-input>
          </el-form-item>
          <el-form-item label="后门" :label-width="formLabelWidth">
            <el-input
              v-model="product.BackDoor"
              auto-complete="off"
              :readonly="dialogReadonly"
            ></el-input>
          </el-form-item>
          <el-form-item label="合厢" :label-width="formLabelWidth">
            <el-input
              v-model="product.CloseCompartments"
              auto-complete="off"
              :readonly="dialogReadonly"
            ></el-input>
          </el-form-item>
          <el-form-item label="装厢" :label-width="formLabelWidth">
            <el-input
              v-model="product.FinalAssembly"
              auto-complete="off"
              :readonly="dialogReadonly"
            ></el-input>
          </el-form-item>
          <el-form-item label="大梁" :label-width="formLabelWidth">
            <el-input
              v-model="product.Girder"
              auto-complete="off"
              :readonly="dialogReadonly"
            ></el-input>
          </el-form-item>
          <el-form-item label="车桥" :label-width="formLabelWidth">
            <el-input
              v-model="product.Bridge"
              auto-complete="off"
              :readonly="dialogReadonly"
            ></el-input>
          </el-form-item>
          <el-form-item label="小件" :label-width="formLabelWidth">
            <el-input
              v-model="product.SmallParts"
              auto-complete="off"
              :readonly="dialogReadonly"
            ></el-input>
          </el-form-item>
          <el-form-item label="喷漆" :label-width="formLabelWidth">
            <el-input
              v-model="product.SprayPaint"
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
      <el-dialog
        title="自卸车生产信息"
        :visible.sync="zxcDialogFormVisible"
        width="25%"
      >
        <el-form :model="zxcproduct">
          <el-form-item label="生产日期" :label-width="formLabelWidth">
            <el-date-picker
              v-model="zxcproduct.ProductDate"
              type="date"
              placeholder="选择日期"
              value-format="yyyy-MM-dd"
            >
            </el-date-picker>
          </el-form-item>
          <el-form-item label="合同号" :label-width="formLabelWidth">
            <el-input
              v-model="zxcproduct.ContractNum"
              auto-complete="off"
              :readonly="dialogReadonly"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="VIN"
            :label-width="formLabelWidth"
            auto-complete="off"
            :readonly="dialogReadonly"
          >
            <el-input
              v-model="zxcproduct.VINNum"
              auto-complete="off"
              :readonly="dialogReadonly"
            ></el-input>
          </el-form-item>
          <el-form-item label="下料" :label-width="formLabelWidth">
            <el-input
              v-model="zxcproduct.Blanking"
              auto-complete="off"
              :readonly="dialogReadonly"
            ></el-input>
          </el-form-item>
          <el-form-item label="底板" :label-width="formLabelWidth">
            <el-input
              v-model="zxcproduct.Floor"
              auto-complete="off"
              :readonly="dialogReadonly"
            ></el-input>
          </el-form-item>
          <el-form-item label="边板" :label-width="formLabelWidth">
            <el-input
              v-model="zxcproduct.SideBoard"
              auto-complete="off"
              :readonly="dialogReadonly"
            ></el-input>
          </el-form-item>
          <el-form-item label="前挡" :label-width="formLabelWidth">
            <el-input
              v-model="zxcproduct.FrontDoor"
              auto-complete="off"
              :readonly="dialogReadonly"
            ></el-input>
          </el-form-item>
          <el-form-item label="后门" :label-width="formLabelWidth">
            <el-input
              v-model="zxcproduct.BackDoor"
              auto-complete="off"
              :readonly="dialogReadonly"
            ></el-input>
          </el-form-item>
          <el-form-item label="合厢" :label-width="formLabelWidth">
            <el-input
              v-model="zxcproduct.CloseCompartments"
              auto-complete="off"
              :readonly="dialogReadonly"
            ></el-input>
          </el-form-item>
          <el-form-item label="总装" :label-width="formLabelWidth">
            <el-input
              v-model="zxcproduct.FinalAssembly"
              auto-complete="off"
              :readonly="dialogReadonly"
            ></el-input>
          </el-form-item>
          <el-form-item label="小件" :label-width="formLabelWidth">
            <el-input
              v-model="zxcproduct.SmallParts"
              auto-complete="off"
              :readonly="dialogReadonly"
            ></el-input>
          </el-form-item>
          <el-form-item label="喷漆" :label-width="formLabelWidth">
            <el-input
              v-model="zxcproduct.SprayPaint"
              auto-complete="off"
              :readonly="dialogReadonly"
            ></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="zxcDialogFormVisible = false">取 消</el-button>
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
import FileSaver from "file-saver";
import XLSX from "xlsx";
export default {
  data() {
    return {
      formLabelWidth: "120px",
      dialogFormVisible: false,
      zxcDialogFormVisible: false,
      dialogReadonly: false,
      operationType: "1", // 操作类型,添加、编辑、查看
      activeIndex: "1",
      imgSrc: require("../../assets/images/wxjz.jpg"),
      activeName: "first",
      tableData: [],
      zxcTableData: [],
      searchProduct: "",
      queryrange: "",
      product: {
        ProductDate: "",
        ContractNum: "",
        VINNum: "",
        Blanking: "",
        SideBoard: "",
        Floor: "",
        FrontDoor: "",
        BackDoor: "",
        CloseCompartments: "",
        FinalAssembly: "",
        SprayPaint: "",
        Girder: "",
        Bridge: "",
        SmallParts: "",
      },
      zxcproduct: {
        ProductDate: "",
        ContractNum: "",
        VINNum: "",
        Blanking: "",
        SideBoard: "",
        Floor: "",
        FrontDoor: "",
        BackDoor: "",
        CloseCompartments: "",
        FinalAssembly: "",
        SprayPaint: "",
        SmallParts: "",
      },
      search: "",
      menuitems: [],
    };
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
    formatDate(row, column) {
      // 获取单元格数据
      let data = row[column.property];
      if (data == null) {
        return null;
      }
      let dt = new Date(data);
      return dt.getFullYear() + "-" + (dt.getMonth() + 1) + "-" + dt.getDate();
    },
    //根据时间段查询生产信息
    queryByDate() {
      if (this.activeName == "first") {
        if (this.queryrange==null||this.queryrange[0] == null || this.queryrange[1] == null) {
          https
            .fetchGet("Product/getall")
            .then((data) => {
              this.tableData = data.data;
            })
            .catch((err) => {
              console.log(err);
            });
          return;
        }
        let params = { start: this.queryrange[0], end: this.queryrange[1] };
        https
          .fetchGet("Product/getproductbydate", params)
          .then((data) => {
            this.tableData = data.data;
          })
          .catch((err) => {
            console.log(err);
          });
      } else if (this.activeName == "second") {
        if (this.queryrange[0] == null || this.queryrange[1] == null) {
          https
            .fetchGet("ZxcProduct/getall")
            .then((data) => {
              this.zxcTableData = data.data;
            })
            .catch((err) => {
              console.log(err);
            });
          return;
        }
        let params = { start: this.queryrange[0], end: this.queryrange[1] };
        https
          .fetchGet("ZxcProduct/getproductbydate", params)
          .then((data) => {
            this.zxcTableData = data.data;
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },
    //查看生产信息
    showSale(sale) {
      if (this.activeName == "first") {
        this.zxcDialogFormVisible = false;
        this.dialogFormVisible = true;
        this.product = sale;
      } else if (this.activeName == "second") {
        this.zxcDialogFormVisible = true;
        this.dialogFormVisible = false;
        this.zxcproduct = sale;
      }
      this.dialogReadonly = true;
      this.operationType = "1";
    },
    //添加生产信息
    addSale() {
      // var nowDate = new Date();
      // let date = {
      //   year: nowDate.getFullYear(),
      //   month: nowDate.getMonth() + 1,
      //   date: nowDate.getDate(),
      // };
      // console.log(date);
      // let systemDate = date.year + "-" + date.month + "-" + date.date;

      if (this.activeName == "first") {
        this.dialogFormVisible = true;
        this.zxcDialogFormVisible = false;
        this.product.ProductDate = new Date();
      } else if (this.activeName == "second") {
        this.dialogFormVisible = false;
        this.zxcDialogFormVisible = true;
        this.zxcproduct.ProductDate = new Date();
      }
      this.dialogReadonly = false;
      this.operationType = "2";
    },
    //编辑生产信息
    editSale(sale) {
      if (this.activeName == "first") {
        this.zxcDialogFormVisible = false;
        this.dialogFormVisible = true;
        this.product = sale;
      } else if (this.activeName == "second") {
        this.zxcDialogFormVisible = true;
        this.dialogFormVisible = false;
        this.zxcproduct = sale;
      }
      this.dialogReadonly = false;
      this.operationType = "3";
    },
    //删除生产信息
    deleteSale(product) {
      this.$confirm("是否确认删除该条数据?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
        center: true,
      })
        .then(() => {
          if (this.activeName == "first") {
            let params = { productJson: product };
            https
              .fetchGet("Product/delete", params)
              .then((data) => {
                this.$notify({
                  title: "提示",
                  message: data.data,
                  duration: 1500,
                });
                if (data.data == "删除成功") {
                  this.tableData.splice(this.tableData.indexOf(product), 1); //删除表格信息
                }
              })
              .catch((err) => {
                console.log(err);
              });
          } else if (this.activeName == "second") {
            let params = { productJson: product };
            https
              .fetchGet("ZxcProduct/delete", params)
              .then((data) => {
                this.$notify({
                  title: "提示",
                  message: data.data,
                  duration: 1500,
                });
                if (data.data == "删除成功") {
                  this.zxcTableData.splice(
                    this.zxcTableData.indexOf(product),
                    1
                  ); //删除表格信息
                }
              })
              .catch((err) => {
                console.log(err);
              });
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    //保存销售信息
    SaveSaleInfo() {
      if (this.operationType == "2") {
        if (this.activeName == "first") {
          let params = { productJson: this.product };
          https
            .fetchGet("Product/add", params)
            .then((data) => {
              this.$notify({
                title: "提示",
                message: data.data,
                duration: 1500,
              });
              if (data.data == "添加成功") {
                this.tableData.push(this.product);
                this.dialogFormVisible = false;
              }
            })
            .catch((err) => {
              console.log(err);
            });
        } else if (this.activeName == "second") {
          let params = { productJson: this.zxcproduct };
          https
            .fetchGet("ZxcProduct/add", params)
            .then((data) => {
              this.$notify({
                title: "提示",
                message: data.data,
                duration: 1500,
              });
              if (data.data == "添加成功") {
                this.zxcTableData.push(this.zxcproduct);
                this.zxcDialogFormVisible = false;
              }
            })
            .catch((err) => {
              console.log(err);
            });
        }
      } else if (this.operationType == "3") {
        if (this.activeName == "first") {
          let params = { productJson: this.product };
          https
            .fetchGet("Product/update", params)
            .then((data) => {
              this.$notify({
                title: "提示",
                message: data.data,
                duration: 1500,
              });
            })
            .catch((err) => {
              console.log(err);
            });
        } else if (this.activeName == "second") {
          let params = { productJson: this.zxcproduct };
          https
            .fetchGet("ZxcProduct/update", params)
            .then((data) => {
              this.$notify({
                title: "提示",
                message: data.data,
                duration: 1500,
              });
            })
            .catch((err) => {
              console.log(err);
            });
        }
      }
    },
    //导出表格
    ExportTable() {
      if (this.activeName == "first") {
        /* generate workbook object from table */
        //  .table要导出的表格
        var wb = XLSX.utils.table_to_book(document.querySelector(".bgctable"));
        /* get binary string as output */
        var wbout = XLSX.write(wb, {
          bookType: "xlsx",
          bookSST: true,
          type: "array",
        });
        try {
          //table.xlsx默认导出文件名，在弹出文件夹框的时候可修改保存
          FileSaver.saveAs(
            new Blob([wbout], { type: "application/octet-stream" }),
            "半挂车生产进度.xlsx"
          );
        } catch (e) {
          if (typeof console !== "undefined") console.log(e, wbout);
        }
        return wbout;
      } else if (this.activeName == "second") {
        /* generate workbook object from table */
        //  .table要导出的表格
        var wb = XLSX.utils.table_to_book(document.querySelector(".zxctable"));
        /* get binary string as output */
        var wbout = XLSX.write(wb, {
          bookType: "xlsx",
          bookSST: true,
          type: "array",
        });
        try {
          //table.xlsx默认导出文件名，在弹出文件夹框的时候可修改保存
          FileSaver.saveAs(
            new Blob([wbout], { type: "application/octet-stream" }),
            "自卸车生产进度.xlsx"
          );
        } catch (e) {
          if (typeof console !== "undefined") console.log(e, wbout);
        }
        return wbout;
      }
    },
    //退出系统
    exitSystem() {
      this.$router.push("/login");
    },
  },
  computed: {
    // 模糊搜索
    bgcFilterData: function () {
      var input = this.searchProduct && this.searchProduct.toLowerCase();
      var items = this.tableData;
      var items1;
      if (input) {
        items1 = items.filter(function (item) {
          return Object.keys(item).some(function (key1) {
            return String(item[key1]).toLowerCase().match(input);
          });
        });
      } else {
        items1 = items;
      }
      return items1;
    },
    zxcFilterData: function () {
      var input = this.searchProduct && this.searchProduct.toLowerCase();
      var items = this.zxcTableData;
      var items1;
      if (input) {
        items1 = items.filter(function (item) {
          return Object.keys(item).some(function (key1) {
            return String(item[key1]).toLowerCase().match(input);
          });
        });
      } else {
        items1 = items;
      }
      return items1;
    },
  },
  created: function () {
    https
      .fetchGet("Product/getall")
      .then((data) => {
        this.tableData = data.data;
      })
      .catch((err) => {
        console.log(err);
      });

    https
      .fetchGet("ZxcProduct/getall")
      .then((data) => {
        this.zxcTableData = data.data;
      })
      .catch((err) => {
        console.log(err);
      });
  },
};
</script>