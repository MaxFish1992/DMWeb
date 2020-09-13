<template>
  <el-container>
    <el-header style="text-align: center; font-size: 26px">智能化生产管理系统</el-header>
    <el-container style="height: 100%; border: 1px solid #eee">
      <el-aside width="200px" style="background-color: rgb(84,92,100);">
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
            v-model="searchProduct"
            size="mini"
            placeholder="输入关键字搜索"
            style="width:200px;margin-right:20px;"
          />
          <el-button type="text" @click="addProduct()">新增</el-button>
          <el-button type="text" @click="exitSystem()">退出</el-button>
        </el-header>
        <el-table :data="filterData" style="width: 100%;" max-height="855">
          <el-table-column fixed prop="OrderDate" label="日期" width="150"></el-table-column>
          <el-table-column prop="ProductNumber" label="合同号" width="120"></el-table-column>
          <el-table-column prop="VIN" label="VIN" width="120"></el-table-column>
          <el-table-column prop="CustomerName" label="客户名称" width="120"></el-table-column>
          <el-table-column prop="CustomerPhone" label="客户联系方式" width="150"></el-table-column>
          <el-table-column prop="Drawing" label="图纸" width="120"></el-table-column>
          <el-table-column prop="Blanking" label="下料" width="120"></el-table-column>
          <!-- <el-table-column prop="SideBoard" label="边板" width="120"></el-table-column>
          <el-table-column prop="Floor" label="底板" width="120"></el-table-column>
          <el-table-column prop="FrontDoor" label="前档" width="120"></el-table-column>
          <el-table-column prop="BackDoor" label="后门" width="120"></el-table-column>-->
          <el-table-column prop="CloseCompartment" label="合厢" width="120"></el-table-column>
          <!-- <el-table-column prop="FinalAssembly" label="总装" width="120"></el-table-column> -->
          <el-table-column prop="Qualified" label="是否合格" width="120"></el-table-column>
          <el-table-column prop="LeaveFactory" label="是否出厂" width="120"></el-table-column>
          <el-table-column prop="SprayPaint" label="工艺图" width="120">
            <template slot-scope="scope">
              <el-button @click="uploadDrawing(scope.row)" type="text" size="small">查看</el-button>
            </template>
          </el-table-column>
          <el-table-column fixed="right" label="操作" width="150">
            <template slot-scope="scope">
              <el-button @click="showProduct(scope.row)" type="text" size="small">查看</el-button>
              <el-button type="text" size="small" @click="editProduct(scope.row)">编辑</el-button>
              <el-button
                @click.native.prevent="deleteProduct(scope.row)"
                type="text"
                size="small"
              >移除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-container>
    </el-container>
    <el-dialog title="生产信息" :visible.sync="dialogFormVisible" customClass="customWidth">
      <el-row>
        <el-col :span="8">
          <el-form :model="product">
            <el-form-item label="生产日期" :label-width="formLabelWidth">
              <el-input v-model="product.OrderDate" auto-complete="off" :readonly="dialogReadonly"></el-input>
            </el-form-item>
            <el-form-item label="交货期" :label-width="formLabelWidth">
              <el-date-picker
                style="width:250px;"
                v-model="product.DeliveryDate"
                align="right"
                type="date"
                placeholder="选择日期"
                :picker-options="pickerOptions"
              ></el-date-picker>
            </el-form-item>
            <el-form-item
              label="合同号"
              :label-width="formLabelWidth"
              auto-complete="off"
              :readonly="dialogReadonly"
            >
              <el-input
                v-model="product.ProductNumber"
                auto-complete="off"
                :readonly="dialogReadonly"
              ></el-input>
            </el-form-item>
            <el-form-item label="VIN" :label-width="formLabelWidth">
              <el-input v-model="product.VIN" auto-complete="off" :readonly="dialogReadonly"></el-input>
            </el-form-item>
            <el-form-item label="客户名称" :label-width="formLabelWidth">
              <el-input
                v-model="product.CustomerName"
                auto-complete="off"
                :readonly="dialogReadonly"
              ></el-input>
            </el-form-item>
            <el-form-item label="客户联系方式" :label-width="formLabelWidth">
              <el-input
                v-model="product.CustomerPhone"
                auto-complete="off"
                :readonly="dialogReadonly"
              ></el-input>
            </el-form-item>
            <el-form-item label="图纸" :label-width="formLabelWidth">
              <el-input v-model="product.Drawing" auto-complete="off" :readonly="dialogReadonly"></el-input>
            </el-form-item>
            <el-form-item label="下料" :label-width="formLabelWidth">
              <el-input v-model="product.Blanking" auto-complete="off" :readonly="dialogReadonly"></el-input>
            </el-form-item>
            <el-form-item label="合厢" :label-width="formLabelWidth">
              <el-input
                v-model="product.CloseCompartment"
                auto-complete="off"
                :readonly="dialogReadonly"
              ></el-input>
            </el-form-item>
            <el-form-item label="是否出厂" :label-width="formLabelWidth">
              <el-input
                v-model="product.LeaveFactory"
                auto-complete="off"
                :readonly="dialogReadonly"
              ></el-input>
            </el-form-item>
            <el-form-item label="是否合格" :label-width="formLabelWidth">
              <el-input v-model="product.Qualified" auto-complete="off" :readonly="dialogReadonly"></el-input>
            </el-form-item>
          </el-form>
        </el-col>
        <el-col :span="8">
          <el-collapse accordion>
            <el-collapse-item title="产品规格">
              <el-form>
                <el-form-item label="长" :label-width="formLabelWidth">
                  <el-input v-model="product.Length" auto-complete="off" :readonly="dialogReadonly"></el-input>
                </el-form-item>
                <el-form-item label="宽" :label-width="formLabelWidth">
                  <el-input v-model="product.Width" auto-complete="off" :readonly="dialogReadonly"></el-input>
                </el-form-item>
                <el-form-item label="高" :label-width="formLabelWidth">
                  <el-input v-model="product.Height" auto-complete="off" :readonly="dialogReadonly"></el-input>
                </el-form-item>
              </el-form>
            </el-collapse-item>
            <el-collapse-item title="边板规格">
              <el-form>
                <el-row>
                  <el-col :span="12">
                    <el-form-item label="厚度">
                      <el-input
                        style="width:180px;"
                        v-model="product.SideBoardThickness"
                        auto-complete="off"
                        :readonly="dialogReadonly"
                      ></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="材料">
                      <el-select
                        v-model="product.SideBoardMaterial"
                        placeholder="请选择"
                        style="width:200px;"
                      >
                        <el-option
                          v-for="item in sideboardTypes"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value"
                        ></el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-form>
            </el-collapse-item>
            <el-collapse-item title="底板规格">
              <el-form>
                <el-row>
                  <el-col :span="12">
                    <el-form-item label="厚度">
                      <el-input
                        style="width:180px;"
                        v-model="product.FloorThickness"
                        auto-complete="off"
                        :readonly="dialogReadonly"
                      ></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="材料">
                      <el-select
                        v-model="product.FloorMaterial"
                        placeholder="请选择"
                        style="width:200px;"
                      >
                        <el-option
                          v-for="item in sideboardTypes"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value"
                        ></el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-form>
            </el-collapse-item>
            <el-collapse-item title="轮胎">
              <el-form>
                <el-form-item label="品牌" :label-width="formLabelWidth">
                  <el-input
                    v-model="product.TireBrand"
                    auto-complete="off"
                    :readonly="dialogReadonly"
                  ></el-input>
                </el-form-item>
                <el-form-item label="花色" :label-width="formLabelWidth">
                  <el-input
                    v-model="product.TireShape"
                    auto-complete="off"
                    :readonly="dialogReadonly"
                  ></el-input>
                </el-form-item>
                <el-form-item label="数量" :label-width="formLabelWidth">
                  <el-input
                    v-model="product.TireNum"
                    auto-complete="off"
                    :readonly="dialogReadonly"
                  ></el-input>
                </el-form-item>
              </el-form>
            </el-collapse-item>
            <el-collapse-item title="钢圈">
              <el-form>
                <el-row>
                  <el-col :span="12">
                    <el-form-item label="个数">
                      <el-input
                        style="width:180px;"
                        v-model="product.SteelRingNum"
                        auto-complete="off"
                        :readonly="dialogReadonly"
                      ></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="材料">
                      <el-select
                        v-model="product.SteelRingMaterial"
                        placeholder="请选择"
                        style="width:200px;"
                      >
                        <el-option
                          v-for="item in steelRingTypes"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value"
                        ></el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-form>
            </el-collapse-item>
            <el-collapse-item title="板簧">
              <el-form>
                <el-form-item label="品牌" :label-width="formLabelWidth">
                  <el-input
                    v-model="product.PlateSpringBrand"
                    auto-complete="off"
                    :readonly="dialogReadonly"
                  ></el-input>
                </el-form-item>
                <el-form-item label="厚度" :label-width="formLabelWidth">
                  <el-input
                    v-model="product.PlateSpringThickness"
                    auto-complete="off"
                    :readonly="dialogReadonly"
                  ></el-input>
                </el-form-item>
                <el-form-item label="片数" :label-width="formLabelWidth">
                  <el-input
                    v-model="product.PlateSpringBrand"
                    auto-complete="off"
                    :readonly="dialogReadonly"
                  ></el-input>
                </el-form-item>
              </el-form>
            </el-collapse-item>
            <el-collapse-item title="液压">
              <el-form>
                <el-row>
                  <el-col :span="12">
                    <el-form-item label="品牌">
                      <el-input
                        style="width:180px;"
                        v-model="product.HydraulicBrand"
                        auto-complete="off"
                        :readonly="dialogReadonly"
                      ></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="型号">
                      <el-input
                        style="width:180px;"
                        v-model="product.HydraulicModel"
                        auto-complete="off"
                        :readonly="dialogReadonly"
                      ></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-form>
            </el-collapse-item>
          </el-collapse>
          <el-row>
            <el-col :span="10">
              <el-form style="margin-top:20px;">
                <el-form-item label="车桥" :label-width="formLabelWidth">
                  <el-select v-model="product.Axle" placeholder="请选择" style="width:180px;">
                    <el-option
                      v-for="item in axleTypes"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="空气悬架" :label-width="formLabelWidth">
                  <el-select
                    v-model="product.HasAirSuspension"
                    placeholder="请选择"
                    style="width:180px;"
                  >
                    <el-option
                      v-for="item in hasOrNot"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="自动调整臂" :label-width="formLabelWidth">
                  <el-select
                    v-model="product.HasAdjustingArm"
                    placeholder="请选择"
                    style="width:180px;"
                  >
                    <el-option
                      v-for="item in hasOrNot"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="ABS" :label-width="formLabelWidth">
                  <el-select v-model="product.ABS" placeholder="请选择" style="width:180px;">
                    <el-option
                      v-for="item in absTypes"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-form>
            </el-col>
            <el-col :span="12">
              <el-form style="margin-top:20px;margin-left:100px;">
                <el-form-item label="后门">
                  <el-input
                    style="width:120px;"
                    v-model="product.BackDoorType"
                    auto-complete="off"
                    :readonly="dialogReadonly"
                  ></el-input>
                </el-form-item>
                <el-form-item label="喷涂">
                  <el-input
                    style="width:120px;"
                    v-model="product.CarriageColor"
                    auto-complete="off"
                    :readonly="dialogReadonly"
                  ></el-input>
                </el-form-item>
              </el-form>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="8">
          <el-form style="margin-top:0px;margin-left:30px;">
            <el-form-item>
              <el-card class="box-card" style="width:480px;">
                <div style="padding: 0px;margin-top:0px;">
                  <span>其它配置</span>
                </div>
                <el-input type="textarea" :rows="24" placeholder="请输入内容" v-model="product.Mark"></el-input>
              </el-card>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
      <div id="qrcode" class="qrcode" ref="qrCodeUrl"></div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="SaveProductInfo()">确 定</el-button>
        <el-button type="primary" @click="CreateQRCode()">生成二维码</el-button>
      </div>
    </el-dialog>
    <el-dialog title="工艺图" :visible.sync="dialogPictureVisible">
      <!-- <div>
        <Upload multiple type="drag" action="http://localhost:50792/Upload">
          <div style="padding: 20px 0">
            <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
            <p>点击或将文件拖拽到这里上传</p>
          </div>
        </Upload>
      </div>-->
      <el-upload
        class="upload-demo"
        action="http://192.168.1.105:8090/Upload"
        ref="newupload"
        :before-upload="beforeUpload"
        :on-preview="handlePreview"
        :on-remove="handleRemove"
        :file-list="imageList"
        :auto-upload="true"
        list-type="picture"
      >
        <el-button size="small" type="primary">选择图片</el-button>
        <!-- <el-button size="small" type="primary" @click="newSubmitForm()" class="yes-btn">确 定</el-button> -->
        <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
      </el-upload>

      <!-- <Upload multiple type="drag" action="http://localhost:50792/Upload">
        <div style="padding: 20px 0">
          <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
          <p>点击或将文件拖拽到这里上传</p>
        </div>
      </Upload>-->
    </el-dialog>
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
  min-height: 867px;
}
.el-input {
  max-width: 250px;
}
/* .el-dialog {
  width: 82%;
} */
.customWidth {
  width: 82%;
}
.el-select {
  width: 350px;
}
.qrcode {
  display: inline-block;
  /* img {
        width: 132px;
        height:132px;
        background-color:#fff;
        padding:6px; 
        box-sizing:border-box;
    } */
}
</style>

<script>
import qs from "qs";
import https from "../../https.js";
import QRCode from "qrcodejs2";
import axios from "axios";

export function startUpload(data) {
  return axios({
    method: "post",
    url: "http://localhost:50792/Upload",
    timeout: 20000,
    data: data,
    dataType: "json",
    contentType: "application/json",
  });
}

export default {
  data() {
    return {
      formLabelWidth: "120px",
      dialogPictureVisible: false,
      dialogFormVisible: false,
      dialogReadonly: false,
      operationType: "1", // 操作类型,添加、编辑、查看
      activeIndex: "1",
      iconVal: "",
      imageList: [],
      imgSrc: require("../../assets/images/wxjz.jpg"),
      navList: [
        { name: "/home", navItem: "首页" },
        { name: "/productmanage", navItem: "生产管理" },
        // { name: "/salesmanage", navItem: "销售管理" },
        // { name: "/financialmanage", navItem: "财务管理" },
        // { name: "/procurementmanage", navItem: "进销存管理" },
        { name: "/about", navItem: "关于" },
      ],
      sideboardTypes: [
        {
          value: "高强度",
          label: "高强度",
        },
        {
          value: "不锈钢",
          label: "不锈钢",
        },
      ],
      steelRingTypes: [
        {
          value: "铁",
          label: "铁",
        },
        {
          value: "铝",
          label: "铝",
        },
      ],
      axleTypes: [
        {
          value: "富华",
          label: "富华",
        },
        {
          value: "沃胜",
          label: "沃胜",
        },
        {
          value: "BPW",
          label: "BPW",
        },
        {
          value: "华劲",
          label: "华劲",
        },
      ],
      hasOrNot: [
        {
          value: "有",
          label: "有",
        },
        {
          value: "无",
          label: "无",
        },
      ],
      absTypes: [
        {
          value: "科密",
          label: "科密",
        },
        {
          value: "威薄科",
          label: "威薄科",
        },
      ],
      pickerOptions: {
        // disabledDate(time) {
        //   return time.getTime() > Date.now();
        // },
        shortcuts: [
          {
            text: "一周后",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() + 3600 * 1000 * 24 * 7);
              picker.$emit("pick", date);
            },
          },
          {
            text: "10天后",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() + 3600 * 1000 * 24 * 10);
              picker.$emit("pick", date);
            },
          },
          {
            text: "半个月后",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() + 3600 * 1000 * 24 * 7 * 2);
              picker.$emit("pick", date);
            },
          },
        ],
      },
      tableData: [],
      product: {
        OrderDate: "",
        DeliveryDate: "",
        ProductNumber: "",
        VIN: "",
        CustomerName: "",
        CustomerPhone: "",
        Drawing: "",
        Blanking: "",
        CloseCompartment: "",
        LeaveFactory: "",
        Qualified: "",
        Length: "",
        Width: "",
        Height: "",
        SideBoardThickness: "",
        SideBoardMaterial: "",
        FloorThickness: "",
        FloorMaterial: "",
        Axle: "",
        HasAdjustingArm: "",
        HasAirSuspension: "",
        ABS: "",
        TireBrand: "",
        TireShape: "",
        TireNum: "",
        SteelRingMaterial: "",
        SteelRingNum: "",
        PlateSpringBrand: "",
        PlateSpringThickness: "",
        PlateSpringNum: "",
        HydraulicBrand: "",
        HydraulicModel: "",
        BackDoorType: "",
        CarriageColor: "",
        Mark: "",
      },
      qrcode: {},
      searchProduct: "",
    };
  },
  methods: {
    handleSelect() {},
    beforeUpload() {
      let fd = new FormData();
      fd.append("vin", this.product.VIN);

      let params = { vin: this.product.VIN };
      https
        .fetchGet("Upload/setvin", params)
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

      startUpload(fd).then((res) => {
        console.log(res);
      });

      return true;
    },
    newSubmitForm() {
      this.$refs.newupload.submit();
    },
    //上传工艺图
    uploadDrawing(product) {
      this.dialogPictureVisible = true;
      this.product = product;
    },
    //查看生产信息
    showProduct(product) {
      this.dialogFormVisible = true;
      this.dialogReadonly = true;
      this.product = product;
      this.operationType = "1";
    },
    //添加生产信息
    addProduct() {
      this.dialogFormVisible = true;
      this.dialogReadonly = false;
      this.product = {};

      var nowDate = new Date();
      let date = {
        year: nowDate.getFullYear(),
        month: nowDate.getMonth() + 1,
        date: nowDate.getDate(),
      };
      console.log(date);
      let systemDate = date.year + "-" + 0 + date.month + "-" + date.date;
      this.product.OrderDate = systemDate;

      this.operationType = "2";
    },
    //编辑生产信息
    editProduct(product) {
      this.dialogFormVisible = true;
      this.dialogReadonly = false;
      this.product = product;
      this.operationType = "3";
    },
    //删除生产信息
    deleteProduct(product) {
      let params = { orderJson: product };
      https
        .fetchGet("Order/delete", params)
        .then((data) => {
          this.$notify({
            title: "提示",
            message: data.data,
            duration: 3000,
          });
          if (data.data == "删除成功") {
            this.tableData.splice(this.tableData.indexOf(product), 1); //删除表格信息
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    //保存生产信息
    SaveProductInfo() {
      this.dialogFormVisible = true;

      if (this.operationType == "2") {
        let params = { orderJson: this.product };
        https
          .fetchGet("Order/add", params)
          .then((data) => {
            this.$notify({
              title: "提示",
              message: data.data,
              duration: 3000,
            });
            if (data.data == "添加成功") {
              this.tableData.push(this.product);
              this.dialogFormVisible = false;
            }
          })
          .catch((err) => {
            console.log(err);
          });
      } else if (this.operationType == "3") {
        let params = { orderJson: this.product };
        https
          .fetchGet("Order/update", params)
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

    //生成二维码
    CreateQRCode() {
      document.getElementById("qrcode").innerHTML = "";
      this.qrcode = new QRCode(this.$refs.qrCodeUrl, {
        text: this.product.VIN, // 需要转换为二维码的内容
        width: 100,
        height: 100,
        colorDark: "#000000",
        colorLight: "#ffffff",
        correctLevel: QRCode.CorrectLevel.H,
      });
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    //对上传图片的大小、格式进行限制
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isJPG2 = file.type === "image/jpg";
      const isPNG = file.type === "image/png";
      const isLt5M = file.size / 1024 / 1024 < 5;
      if (!isJPG && !isJPG2 && !isPNG) {
        this.$notify({
          title: "提示",
          message: "只支持jpg或png格式图片",
          duration: 3000,
        });
      }
      if (!isLt5M) {
        this.$notify({
          title: "提示",
          message: "请上传5MB以内的图片",
          duration: 3000,
        });
      }
      return (isJPG || isJPG2 || isPNG) && isLt5M;
    },
    //上传工艺图
    uploadImage() {
      console.log("文件json:" + qs.stringify(this.imageList));
      let fd = new FormData(); //参数的格式是formData格式的
      fd.append("uploadFile", qs.stringify(this.imageList)); //参数
      https
        .fetchGet("Image/Upload", qs.stringify(this.imageList))
        .then((res) => {
          if (res) {
            this.iconVal = res;
            this.$notify({
              title: "提示",
              message: res.data,
              duration: 3000,
            });
          } else {
            this.$notify({
              title: "提示",
              message: "上传失败",
              duration: 3000,
            });
          }
        })
        .catch((error) => {});
    },
    addToElements(flag) {
      return (el) => {
        this.elements[flag] = el;
      };
    },
    //退出系统
    exitSystem() {
      this.$router.push("/login");
    },
  },
  computed: {
    // 模糊搜索
    // filterData: function () {
    //   const search = this.search;
    //   if (search) {
    //     // filter() 方法创建一个新的数组，新数组中的元素是通过检查指定数组中符合条件的所有元素。
    //     // 注意： filter() 不会对空数组进行检测。
    //     // 注意： filter() 不会改变原始数组。
    //     return this.tableData.filter((data) => {
    //       // some() 方法用于检测数组中的元素是否满足指定条件;
    //       // some() 方法会依次执行数组的每个元素：
    //       // 如果有一个元素满足条件，则表达式返回true , 剩余的元素不会再执行检测;
    //       // 如果没有满足条件的元素，则返回false。
    //       // 注意： some() 不会对空数组进行检测。
    //       // 注意： some() 不会改变原始数组。
    //       return Object.keys(data).some((key) => {
    //         // indexOf() 返回某个指定的字符在某个字符串中首次出现的位置，如果没有找到就返回-1；
    //         // 该方法对大小写敏感！所以之前需要toLowerCase()方法将所有查询到内容变为小写。
    //         return String(data[key]).toLowerCase().indexOf(search) > -1;
    //       });
    //     });
    //   }
    //   return this.tableData;
    // },
    filterData: function () {
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
  },
  created: function () {
    https
      .fetchGet("Order/getall")
      .then((data) => {
        this.tableData = data.data;
      })
      .catch((err) => {
        console.log(err);
      });

    window.document.onkeypress = (e) => {
      if (window.event) {
        // IE
        this.nextCode = e.keyCode;
      } else if (e.which) {
        // Netscape/Firefox/Opera
        this.nextCode = e.which;
      }
      if (this.nextCode === 13) {
        if (this.code.length < 3) return; // 手动输入的时间不会让code的长度大于2，所以这里只会对扫码枪有
        // 获取到扫码枪输入的内容，做别的操作

        // this.$notify({
        //   title: "提示",
        //   message: this.code,
        //   duration: 3000,
        // });

        // if (this.code == this.product.VIN) {
        // this.product.Drawing = "有";
        let params = { vin: this.code };
        https
          .fetchGet("Order/getsingle", params)
          .then((data) => {
            // this.$notify({
            //   title: "提示",
            //   message: data.data,
            //   duration: 3000,
            // });
            this.product = data.data;
            this.dialogFormVisible = true;
          })
          .catch((err) => {
            console.log(err);
          });
        // }

        this.onchange && this.onchange(this.code);

        this.code = "";
        this.lastCode = "";
        this.lastTime = "";
        return;
      }
      this.nextTime = new Date().getTime();
      if (!this.lastTime && !this.lastCode) {
        this.code += e.key;
      }

      if (
        this.lastCode &&
        this.lastTime &&
        this.nextTime - this.lastTime > 30
      ) {
        // 当扫码前有keypress事件时,防止首字缺失
        this.code = e.key;
      } else if (this.lastCode && this.lastTime) {
        this.code += e.key;
      }
      this.lastCode = this.nextCode;
      this.lastTime = this.nextTime;
    };
  },
};
</script>