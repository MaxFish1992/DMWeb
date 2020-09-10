<template>
  <el-container>
    <el-header style="text-align: center; font-size: 30px;">智能化生产管理系统</el-header>
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
        <el-image :src="imgSrc" style="max-height:867px;"></el-image>
      </el-container>
    </el-container>
    <el-dialog title="订单信息" :visible.sync="orderDialogVisible"  customClass="customWidth">
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
            <el-form-item label="是否合格" :label-width="formLabelWidth">
              <el-button type="text" @click="openDrawing()" style>工艺图</el-button>
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
              <el-form-item :label="product.PlateSpringThickness"></el-form-item>
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
            <el-form-item label="其它" :label-width="formLabelWidth" style="color:red"></el-form-item>
            <el-form-item
              label="product.Markasdjojsfo几点去减肥减肥强迫甲方确认迫切的脾气欧伟平亲王而且我i额抛弃我i额剽窃破i去脾气文凭"
              label-width="300px"
            ></el-form-item>
          </el-form>
        </el-col>
      </el-row>
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
      orderDialogVisible: false,
      activeIndex: "1",
      imgSrc: require("../../assets/images/wxjz.jpg"),
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
    //查看工艺图
    openDrawing() {},
  },
  created: function () {
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

        this.orderDialogVisible = true;
        let params = { vin: this.code };
        https
          .fetchGet("Order/getsingle", params)
          .then((data) => {
            this.product = data.data;
          })
          .catch((err) => {
            console.log(err);
          });

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