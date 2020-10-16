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
        <el-image :src="imgSrc" style="max-height: 867px"></el-image>
      </el-container>
    </el-container>
    <el-dialog
      title="半挂车订单信息"
      :visible.sync="orderDialogVisible"
      customClass="customWidth"
    >
      <el-row>
        <el-col :span="6">
          <el-form>
            <el-form-item label="下单日期" :label-width="formLabelWidth">
              <el-form-item :label="product.OrderDate"></el-form-item>
            </el-form-item>
            <el-form-item label="交货期" :label-width="formLabelWidth">
              <el-form-item :label="product.DeliveryDate"></el-form-item>
            </el-form-item>
            <el-form-item label="合同号" :label-width="formLabelWidth">
              <el-form-item :label="product.ProductNumber"></el-form-item>
            </el-form-item>
            <el-form-item label="VIN" :label-width="formLabelWidth">
              <el-form-item :label="product.VIN"></el-form-item>
            </el-form-item>
            <el-form-item label="下料是否完成" :label-width="formLabelWidth">
              <el-form-item :label="product.Blanking"></el-form-item>
            </el-form-item>
            <el-form-item label="合箱是否完成" :label-width="formLabelWidth">
              <el-form-item :label="product.CloseCompartment"></el-form-item>
            </el-form-item>
            <el-form-item label="是否出厂" :label-width="formLabelWidth">
              <el-form-item :label="product.LeaveFactory"></el-form-item>
            </el-form-item>
            <el-form-item label="是否合格" :label-width="formLabelWidth">
              <el-form-item :label="product.Qualified"></el-form-item>
            </el-form-item>
            <el-form-item label="" :label-width="0">
              <el-button type="text" @click="showDrawing()" style
                >工艺图</el-button
              >
            </el-form-item>
          </el-form>
        </el-col>
        <el-col :span="6">
          <el-form>
            <el-form-item label="长" :label-width="formLabelWidth">
              <el-form-item :label="product.Length"></el-form-item>
            </el-form-item>
            <el-form-item label="宽" :label-width="formLabelWidth">
              <el-form-item :label="product.Width"></el-form-item>
            </el-form-item>
            <el-form-item label="高" :label-width="formLabelWidth">
              <el-form-item :label="product.Height"></el-form-item>
            </el-form-item>
            <el-form-item label="边板厚度" :label-width="formLabelWidth">
              <el-form-item :label="product.SideBoardThickness"></el-form-item>
            </el-form-item>
            <el-form-item label="边板材料" :label-width="formLabelWidth">
              <el-form-item :label="product.SideBoardMaterial"></el-form-item>
            </el-form-item>
            <el-form-item label="底板厚度" :label-width="formLabelWidth">
              <el-form-item :label="product.FloorThickness"></el-form-item>
            </el-form-item>
            <el-form-item label="底板材料" :label-width="formLabelWidth">
              <el-form-item :label="product.FloorMaterial"></el-form-item>
            </el-form-item>
            <el-form-item label="钢圈个数" :label-width="formLabelWidth">
              <el-form-item :label="product.SteelRingNum"></el-form-item>
            </el-form-item>
            <el-form-item label="钢圈材料" :label-width="formLabelWidth">
              <el-form-item :label="product.SteelRingMaterial"></el-form-item>
            </el-form-item>
          </el-form>
        </el-col>
        <el-col :span="6">
          <el-form>
            <el-form-item label="轮胎品牌" :label-width="formLabelWidth">
              <el-form-item :label="product.TireBrand"></el-form-item>
            </el-form-item>
            <el-form-item label="轮胎花色" :label-width="formLabelWidth">
              <el-form-item :label="product.TireShape"></el-form-item>
            </el-form-item>
            <el-form-item label="轮胎数量" :label-width="formLabelWidth">
              <el-form-item :label="product.TireNum"></el-form-item>
            </el-form-item>
            <el-form-item label="板簧品牌" :label-width="formLabelWidth">
              <el-form-item :label="product.PlateSpringBrand"></el-form-item>
            </el-form-item>
            <el-form-item label="板簧厚度" :label-width="formLabelWidth">
              <el-form-item
                :label="product.PlateSpringThickness"
              ></el-form-item>
            </el-form-item>
            <el-form-item label="板簧片数" :label-width="formLabelWidth">
              <el-form-item :label="product.PlateSpringNum"></el-form-item>
            </el-form-item>
            <el-form-item label="液压品牌" :label-width="formLabelWidth">
              <el-form-item :label="product.HydraulicBrand"></el-form-item>
            </el-form-item>
            <el-form-item label="液压型号" :label-width="formLabelWidth">
              <el-form-item :label="product.HydraulicModel"></el-form-item>
            </el-form-item>
            <el-form-item label="空气悬挂" :label-width="formLabelWidth">
              <el-form-item :label="product.HasAirSuspension"></el-form-item>
            </el-form-item>
          </el-form>
        </el-col>
        <el-col :span="6">
          <el-form>
            <el-form-item label="车桥" :label-width="formLabelWidth">
              <el-form-item :label="product.Axle"></el-form-item>
            </el-form-item>
            <el-form-item label="ABS" :label-width="formLabelWidth">
              <el-form-item :label="product.ABS"></el-form-item>
            </el-form-item>
            <el-form-item label="自动调整臂" :label-width="formLabelWidth">
              <el-form-item :label="product.HasAdjustingArm"></el-form-item>
            </el-form-item>
            <el-form-item label="后门" :label-width="formLabelWidth">
              <el-form-item :label="product.BackDoorType"></el-form-item>
            </el-form-item>
            <el-form-item label="喷涂" :label-width="formLabelWidth">
              <el-form-item :label="product.CarriageColor"></el-form-item>
            </el-form-item>
            <el-form-item
              label="其它"
              :label-width="formLabelWidth"
              style="color: red"
            ></el-form-item>
            <el-form-item
              :label="product.Mark"
              label-width="300px"
            ></el-form-item>
          </el-form>
        </el-col>
      </el-row>
    </el-dialog>
    <el-dialog
      title="自卸车订单信息"
      :visible.sync="zxcDialogVisible"
      customClass="customWidth"
    >
      <el-row>
        <el-col :span="8">
          <el-form :model="zxcproduct" :aria-readonly="true">
            <el-form-item label="生产日期" :label-width="formLabelWidth">
              <el-input
                v-model="zxcproduct.ProductDate"
                auto-complete="off"
                :readonly="dialogReadonly"
              ></el-input>
            </el-form-item>
            <el-form-item label="交货期" :label-width="formLabelWidth">
              <el-date-picker
                style="width: 250px"
                v-model="zxcproduct.DeliveryDate"
                align="right"
                type="date"
                format="yyyy 年 MM 月 dd 日"
                value-format="yyyy年MM月dd 日"
                placeholder="选择日期"
                :readonly="dialogReadonly"
              ></el-date-picker>
            </el-form-item>
            <el-form-item
              label="合同号"
              :label-width="formLabelWidth"
              auto-complete="off"
              :readonly="dialogReadonly"
            >
              <el-input
                v-model="zxcproduct.ProductNumber"
                auto-complete="off"
                :readonly="dialogReadonly"
              ></el-input>
            </el-form-item>
            <el-form-item label="底板型号" :label-width="formLabelWidth">
              <el-input
                v-model="zxcproduct.FloorType"
                auto-complete="off"
                :readonly="dialogReadonly"
              ></el-input>
            </el-form-item>
            <el-form-item label="底盘号" :label-width="formLabelWidth">
              <el-input
                v-model="zxcproduct.FloorNumber"
                auto-complete="off"
                :readonly="dialogReadonly"
              ></el-input>
            </el-form-item>
            <el-form-item label="客户名称" :label-width="formLabelWidth">
              <el-input
                v-model="zxcproduct.CustomerName"
                auto-complete="off"
                :readonly="dialogReadonly"
              ></el-input>
            </el-form-item>
            <el-form-item label="客户联系方式" :label-width="formLabelWidth">
              <el-input
                v-model="zxcproduct.CustomerPhone"
                auto-complete="off"
                :readonly="dialogReadonly"
              ></el-input>
            </el-form-item>
            <el-form-item label="是否出厂" :label-width="formLabelWidth">
              <el-input
                v-model="zxcproduct.LeaveFactory"
                auto-complete="off"
                :readonly="dialogReadonly"
              ></el-input>
            </el-form-item>
            <el-form-item label="是否合格" :label-width="formLabelWidth">
              <el-input
                v-model="zxcproduct.Qualified"
                auto-complete="off"
                :readonly="dialogReadonly"
              ></el-input>
            </el-form-item>
            <el-form-item label="图纸" :label-width="formLabelWidth">
              <el-button
                @click="uploadDrawing2()"
                type="text"
                size="small"
                :disabled="dialogReadonly"
                >上传</el-button
              >
              <el-button @click="showDrawing()" type="text" size="small"
                >查看</el-button
              >
            </el-form-item>
          </el-form>
        </el-col>
        <el-col :span="8">
          <el-collapse accordion v-model="activeCollapseItem">
            <el-collapse-item title="货厢规格" name="1">
              <el-form>
                <el-row>
                  <el-col :span="12">
                    <el-form-item label="长">
                      <el-input
                        style="width: 150px"
                        v-model="zxcproduct.Length"
                        auto-complete="off"
                        :readonly="dialogReadonly"
                      ></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="宽">
                      <el-input
                        style="width: 150px"
                        v-model="zxcproduct.Width"
                        auto-complete="off"
                        :readonly="dialogReadonly"
                      ></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="12">
                    <el-form-item label="高">
                      <el-input
                        style="width: 150px"
                        v-model="zxcproduct.Height"
                        auto-complete="off"
                        :readonly="dialogReadonly"
                      ></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-form>
            </el-collapse-item>
            <el-collapse-item title="板厚要求" name="1">
              <el-form>
                <el-row>
                  <el-col :span="12">
                    <el-form-item label="底板">
                      <el-input
                        style="width: 150px"
                        v-model="zxcproduct.FloorThickness"
                        auto-complete="off"
                        :readonly="dialogReadonly"
                      ></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="边板">
                      <el-input
                        style="width: 150px"
                        v-model="zxcproduct.SideBoardThickness"
                        auto-complete="off"
                        :readonly="dialogReadonly"
                      ></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="12">
                    <el-form-item label="前挡">
                      <el-input
                        style="width: 150px"
                        v-model="zxcproduct.FrontboardThickness"
                        auto-complete="off"
                        :readonly="dialogReadonly"
                      ></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="后门">
                      <el-input
                        style="width: 150px"
                        v-model="zxcproduct.BackboardThickness"
                        auto-complete="off"
                        :readonly="dialogReadonly"
                      ></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-form>
            </el-collapse-item>
          </el-collapse>
          <el-form>
            <el-form-item
              label="材质类型"
              :label-width="formLabelWidth"
              style="margin-top: 20px"
            >
              <el-input
                v-model="zxcproduct.Material"
                auto-complete="off"
                :readonly="dialogReadonly"
              ></el-input>
            </el-form-item>
            <el-form-item label="纵梁数" :label-width="formLabelWidth">
              <el-input
                v-model="zxcproduct.CarlingNumber"
                auto-complete="off"
                :readonly="dialogReadonly"
              ></el-input>
            </el-form-item>
          </el-form>
        </el-col>
        <el-col :span="8">
          <el-form style="margin-top: 0px; margin-left: 30px">
            <el-form-item>
              <el-card class="box-card" style="width: 480px">
                <div style="padding: 0px; margin-top: 0px">
                  <span>特别约定</span>
                </div>
                <el-input
                  type="textarea"
                  :rows="24"
                  placeholder="请输入内容"
                  v-model="zxcproduct.Mark"
                  :readonly="dialogReadonly"
                ></el-input>
              </el-card>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
      <!-- <div id="qrcode1" class="qrcode1" ref="qrCodeUrl1"></div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="SaveProductInfo()">确 定</el-button>
        <el-button type="primary" @click="CreateQRCode()">生成二维码</el-button>
      </div> -->
    </el-dialog>
    <el-dialog title="工艺图" :visible.sync="dialogDrawingVisible">
      <div>
        <ol>
          <ul
            v-for="image in imagenames"
            :key="image.index"
            @click="previewDrawing(image.FileName)"
          >
            {{
              image.FileName
            }}
          </ul>
        </ol>
        <img :src="imageUrl" />
      </div>
    </el-dialog>
  </el-container>
</template>


<style>
.el-header {
  background-color: #545c64;
  color: #fff;
  line-height: 60px;
  /* min-height: 70px; */
  /* height: 200px; */
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
      product: {
        OrderDate: "2020-8-31",
        DeliveryDate: "",
        ProductNumber: "",
        VIN: "",
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
      zxcproduct: {
        ProductDate: "",
        DeliveryDate: "",
        ProductNumber: "",
        FloorType: "",
        FloorNumber: "",
        CustomerName: "",
        CustomerPhone: "",
        LeaveFactory: "",
        Qualified: "",
        Length: "",
        Width: "",
        Height: "",
        FloorThickness: "",
        SideboardThickness: "",
        FrontboardThickness: "",
        BackboardThickness: "",
        Material: "",
        CarlingNumber: "",
        OilCylinder: "",
        Mark: "",
      },
      orderDialogVisible: false,
      zxcDialogVisible: false,
      dialogDrawingVisible: false,
      dialogReadonly: true,
      activeCollapseItem: "1",
      activeIndex: "1",
      imgSrc: require("../../assets/images/wxjz.jpg"),
      imageUrl: "",
      imagenames: [],
      menuitems:[]
    };
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
    //查看工艺图
    showDrawing() {
      this.dialogDrawingVisible = true;
      if (this.orderDialogVisible) {
        let params = { vin: this.product.VIN };
        https
          .fetchGet("Download/getfilenames", params)
          .then((data) => {
            this.imagenames = data.data;
          })
          .catch((err) => {
            console.log(err);
          });
      } else if (this.zxcDialogVisible) {
        let params = { vin: this.zxcproduct.FloorNumber };
        https
          .fetchGet("Download/getfilenames", params)
          .then((data) => {
            this.imagenames = data.data;
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },
    //预览工艺图
    previewDrawing(filename) {
      if (this.orderDialogVisible) {
        this.imageUrl =
          "http://192.168.1.105:8090/Download/getimage?vin=" +
          this.product.VIN +
          "&fileName=" +
          filename;
      } else if (this.zxcDialogVisible) {
        this.imageUrl =
          "http://192.168.1.105:8090/Download/getimage?vin=" +
          this.zxcproduct.FloorNumber +
          "&fileName=" +
          filename;
      }
    },
  },
  created: function () {
    //获取菜单项
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

        this.code.replace("undefined", "");
        this.$notify({
          title: "提示",
          message: this.code,
          duration: 3000,
        });

        let params = { vin: this.code };
        if (this.code.indexOf("CWX") >= 0) {
          console.log("111111");
          https
            .fetchGet("Order/getsingle", params)
            .then((data) => {
              this.product = data.data;
              this.orderDialogVisible = true;
              this.zxcDialogVisible = false;
            })
            .catch((err) => {
              console.log(err);
            });
        } else {
          console.log("222222");
          https
            .fetchGet("ZxcOrder/getsingle", params)
            .then((data) => {
              this.zxcproduct = data.data;
              this.orderDialogVisible = false;
              this.zxcDialogVisible = true;
            })
            .catch((err) => {
              console.log(err);
            });
        }

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