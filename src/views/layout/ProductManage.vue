<template>
  <el-container>
    <el-header style="text-align: center; font-size: 26px"
      >智能化生产管理系统</el-header
    >
    <el-container style="height: 100%; border: 1px solid #eee">
      <el-aside width="200px" style="background-color: rgb(84, 92, 100)">
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
            v-for="(item, i) in $MenuItems"
            :key="i"
            :index="item.router"
            >{{ item.name }}</el-menu-item
          >
        </el-menu>
      </el-aside>
      <el-container>
        <el-header style="text-align: right; font-size: 16px">
          <el-input
            v-model="searchProduct"
            size="mini"
            placeholder="输入关键字搜索"
            style="width: 200px; margin-right: 20px"
          />
          <el-button type="text" @click="addProduct()">新增</el-button>
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
                fixed
                prop="OrderDate"
                label="日期"
                width="150"
              ></el-table-column>
              <el-table-column
                prop="ProductNumber"
                label="合同号"
                width="120"
              ></el-table-column>
              <el-table-column
                prop="VIN"
                label="VIN"
                width="120"
              ></el-table-column>
              <el-table-column
                prop="CustomerName"
                label="客户名称"
                width="120"
              ></el-table-column>
              <el-table-column
                prop="CustomerPhone"
                label="客户联系方式"
                width="150"
              ></el-table-column>
              <el-table-column
                prop="Drawing"
                label="图纸"
                width="120"
              ></el-table-column>
              <el-table-column
                prop="Blanking"
                label="下料"
                width="120"
              ></el-table-column>
              <!-- <el-table-column prop="SideBoard" label="边板" width="120"></el-table-column>
          <el-table-column prop="Floor" label="底板" width="120"></el-table-column>
          <el-table-column prop="FrontDoor" label="前档" width="120"></el-table-column>
              <el-table-column prop="BackDoor" label="后门" width="120"></el-table-column>-->
              <el-table-column
                prop="CloseCompartment"
                label="合厢"
                width="120"
              ></el-table-column>
              <!-- <el-table-column prop="FinalAssembly" label="总装" width="120"></el-table-column> -->
              <el-table-column
                prop="Qualified"
                label="是否合格"
                width="120"
              ></el-table-column>
              <el-table-column
                prop="LeaveFactory"
                label="是否出厂"
                width="120"
              ></el-table-column>
              <el-table-column prop="SprayPaint" label="工艺图" width="120">
                <template slot-scope="scope">
                  <el-button
                    @click="uploadDrawing(scope.row)"
                    type="text"
                    size="small"
                    >上传</el-button
                  >
                  <el-button
                    @click="showDrawing(scope.row)"
                    type="text"
                    size="small"
                    >查看</el-button
                  >
                </template>
              </el-table-column>
              <el-table-column fixed="right" label="操作" width="150">
                <template slot-scope="scope">
                  <el-button
                    @click="showProduct(scope.row)"
                    type="text"
                    size="small"
                    >查看</el-button
                  >
                  <el-button
                    type="text"
                    size="small"
                    @click="editProduct(scope.row)"
                    >编辑</el-button
                  >
                  <el-button
                    @click.native.prevent="deleteProduct(scope.row)"
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
                fixed
                prop="ProductDate"
                label="日期"
                width="120"
              ></el-table-column>
              <el-table-column
                prop="ProductNumber"
                label="合同号"
                width="100"
              ></el-table-column>
              <el-table-column
                prop="FloorType"
                label="底盘型号"
                width="100"
              ></el-table-column>
              <el-table-column
                prop="FloorNumber"
                label="底盘号"
                width="120"
              ></el-table-column>
              <el-table-column
                prop="CustomerName"
                label="客户名称"
                width="120"
              ></el-table-column>
              <!-- <el-table-column prop="CustomerPhone" label="客户联系方式" width="150"></el-table-column> -->
              <!-- <el-table-column prop="Drawing" label="货厢规格" width="200"></el-table-column> -->
              <!-- <el-table-column
                prop=""
                label="货厢规格"
                width="200"
              ></el-table-column> -->
              <!-- <el-table-column prop="SideBoard" label="边板" width="120"></el-table-column>
          <el-table-column prop="Floor" label="底板" width="120"></el-table-column>
          <el-table-column prop="FrontDoor" label="前档" width="120"></el-table-column>
              <el-table-column prop="BackDoor" label="后门" width="120"></el-table-column>-->
              <!-- <el-table-column prop="FinalAssembly" label="总装" width="120"></el-table-column> -->
              <!-- <el-table-column
                prop=""
                label="货厢类型"
                width="120"
              ></el-table-column> -->
              <el-table-column
                prop="OilCylinder"
                label="举升缸"
                width="120"
              ></el-table-column>
              <!-- <el-table-column prop="LeaveFactory" label="底板厚度" width="80"></el-table-column>
              <el-table-column prop="LeaveFactory" label="边板厚度" width="80"></el-table-column>
              <el-table-column prop="LeaveFactory" label="前挡厚度" width="80"></el-table-column>
              <el-table-column prop="LeaveFactory" label="后门厚度" width="80"></el-table-column>-->
              <el-table-column
                prop="CarlingNumber"
                label="纵梁数"
                width="80"
              ></el-table-column>
              <el-table-column prop label="工艺图" width="120">
                <template slot-scope="scope">
                  <el-button
                    @click="uploadDrawing1(scope.row)"
                    type="text"
                    size="small"
                    >上传</el-button
                  >
                  <el-button
                    @click="showDrawing1(scope.row)"
                    type="text"
                    size="small"
                    >查看</el-button
                  >
                </template>
              </el-table-column>
              <el-table-column fixed="right" label="操作" width="150">
                <template slot-scope="scope">
                  <el-button
                    @click="showProduct(scope.row)"
                    type="text"
                    size="small"
                    >查看</el-button
                  >
                  <el-button
                    type="text"
                    size="small"
                    @click="editProduct(scope.row)"
                    >编辑</el-button
                  >
                  <el-button
                    @click.native.prevent="deleteProduct(scope.row)"
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
    <el-dialog
      title="半挂车订单信息"
      :visible.sync="dialogFormVisible"
      customClass="customWidth"
    >
      <el-row>
        <el-col :span="8">
          <el-form :model="product">
            <el-form-item label="生产日期" :label-width="formLabelWidth">
              <el-input
                v-model="product.OrderDate"
                auto-complete="off"
                :readonly="dialogReadonly"
              ></el-input>
            </el-form-item>
            <el-form-item label="交货期" :label-width="formLabelWidth">
              <el-date-picker
                style="width: 250px"
                v-model="product.DeliveryDate"
                align="right"
                type="date"
                format="yyyy 年 MM 月 dd 日"
                value-format="yyyy年MM月dd 日"
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
              <el-input
                v-model="product.VIN"
                auto-complete="off"
                :readonly="dialogReadonly"
              ></el-input>
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
              <!-- <el-input v-model="product.Drawing" auto-complete="off" :readonly="dialogReadonly"></el-input> -->
              <el-button
                @click="uploadDrawing2()"
                type="text"
                size="small"
                :disabled="dialogReadonly"
                >上传</el-button
              >
              <el-button @click="showDrawing2()" type="text" size="small"
                >查看</el-button
              >
            </el-form-item>
            <el-form-item label="下料" :label-width="formLabelWidth">
              <el-input
                v-model="product.Blanking"
                auto-complete="off"
                :readonly="dialogReadonly"
              ></el-input>
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
              <el-input
                v-model="product.Qualified"
                auto-complete="off"
                :readonly="dialogReadonly"
              ></el-input>
            </el-form-item>
          </el-form>
        </el-col>
        <el-col :span="8">
          <el-collapse accordion>
            <el-collapse-item title="产品规格">
              <el-form>
                <el-form-item label="长" :label-width="formLabelWidth">
                  <el-input
                    v-model="product.Length"
                    auto-complete="off"
                    :readonly="dialogReadonly"
                  ></el-input>
                </el-form-item>
                <el-form-item label="宽" :label-width="formLabelWidth">
                  <el-input
                    v-model="product.Width"
                    auto-complete="off"
                    :readonly="dialogReadonly"
                  ></el-input>
                </el-form-item>
                <el-form-item label="高" :label-width="formLabelWidth">
                  <el-input
                    v-model="product.Height"
                    auto-complete="off"
                    :readonly="dialogReadonly"
                  ></el-input>
                </el-form-item>
              </el-form>
            </el-collapse-item>
            <el-collapse-item title="边板规格">
              <el-form>
                <el-row>
                  <el-col :span="12">
                    <el-form-item label="厚度">
                      <el-input
                        style="width: 180px"
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
                        style="width: 200px"
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
                        style="width: 180px"
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
                        style="width: 200px"
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
                        style="width: 180px"
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
                        style="width: 200px"
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
                    v-model="product.PlateSpringNum"
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
                        style="width: 180px"
                        v-model="product.HydraulicBrand"
                        auto-complete="off"
                        :readonly="dialogReadonly"
                      ></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="型号">
                      <el-input
                        style="width: 180px"
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
              <el-form style="margin-top: 20px">
                <el-form-item label="车桥" :label-width="formLabelWidth">
                  <el-select
                    v-model="product.Axle"
                    placeholder="请选择"
                    style="width: 180px"
                  >
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
                    style="width: 180px"
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
                    style="width: 180px"
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
                  <el-select
                    v-model="product.ABS"
                    placeholder="请选择"
                    style="width: 180px"
                  >
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
              <el-form style="margin-top: 20px; margin-left: 100px">
                <el-form-item label="后门">
                  <el-input
                    style="width: 120px"
                    v-model="product.BackDoorType"
                    auto-complete="off"
                    :readonly="dialogReadonly"
                  ></el-input>
                </el-form-item>
                <el-form-item label="喷涂">
                  <el-input
                    style="width: 120px"
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
          <el-form style="margin-top: 0px; margin-left: 30px">
            <el-form-item>
              <el-card class="box-card" style="width: 480px">
                <div style="padding: 0px; margin-top: 0px">
                  <span>其它配置</span>
                </div>
                <el-input
                  type="textarea"
                  :rows="24"
                  placeholder="请输入内容"
                  v-model="product.Mark"
                ></el-input>
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
        <el-button type="primary" @click="printPreview()">打印预览</el-button>
      </div>
    </el-dialog>
    <el-dialog
      title="自卸车订单信息"
      :visible.sync="zxcDialogVisible"
      customClass="customWidth"
    >
      <el-row>
        <el-col :span="8">
          <el-form :model="zxcproduct">
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

            <!-- <el-form-item label="下料" :label-width="formLabelWidth">
              <el-input v-model="product.Blanking" auto-complete="off" :readonly="dialogReadonly"></el-input>
            </el-form-item>-->
            <!-- <el-form-item label="合厢" :label-width="formLabelWidth">
              <el-input
                v-model="product.CloseCompartment"
                auto-complete="off"
                :readonly="dialogReadonly"
              ></el-input>
            </el-form-item>-->
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
              <el-button @click="showDrawing2()" type="text" size="small"
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
                ></el-input>
              </el-card>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
      <div id="qrcode1" class="qrcode1" ref="qrCodeUrl1"></div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="SaveProductInfo()">确 定</el-button>
        <el-button type="primary" @click="CreateQRCode()">生成二维码</el-button>
        <el-button type="primary" @click="zxcPrintPreview()"
          >打印预览</el-button
        >
      </div>
    </el-dialog>
    <el-dialog title="工艺图" :visible.sync="dialogPictureVisible">
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
        <div slot="tip" class="el-upload__tip">
          只能上传jpg/png文件，且不超过500kb
        </div>
      </el-upload>
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
    <el-dialog :visible.sync="printDialogVisible">
      <template>
        <div>
          <section ref="print" id="print">
            <div
              id="qrcode2"
              class="qrcode2"
              ref="qrCodeUrl2"
              style="float: right; margin-left: -100px"
            ></div>
            <p style="margin-top:-20px;">-----------------------------------------------------------------------------------------------------------------------------------------------------</p>
            <el-row :gutter="0">
              <el-col :span="12">
                <el-form>
                  <el-form-item label="生产号：" :label-width="formLabelWidth">
                    {{ product.ProductNumber }}
                  </el-form-item>
                  <el-form-item label="VIN：" :label-width="formLabelWidth">
                    {{ product.VIN }}
                  </el-form-item>
                  <el-form-item label="客户名称：" :label-width="formLabelWidth">
                    {{ product.CustomerName }}
                  </el-form-item>
                  <el-form-item label="交货期：" :label-width="formLabelWidth">
                    {{ product.DeliveryDate }}
                  </el-form-item>
                </el-form>
              </el-col>
            </el-row>
            <p style="margin-top:-0px;">-----------------------------------------------------------------------------------------------------------------------------------------------------</p>
            <p>产品规格</p>
            <el-row :gutter="0">
              <el-col :span="7">
                <el-form>
                  <el-form-item label="货厢长：" :label-width="formLabelWidth">
                    {{ product.Length }}
                  </el-form-item>
                </el-form>
              </el-col>
              <el-col :span="7">
                <el-form>
                  <el-form-item label="货厢宽：" :label-width="formLabelWidth">
                    {{ product.Width }}
                  </el-form-item>
                </el-form>
              </el-col>
              <el-col :span="7">
                <el-form>
                  <el-form-item label="货厢高：" :label-width="formLabelWidth">
                    {{ product.Height }}
                  </el-form-item>
                </el-form>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="10">
                <el-form>
                  <el-form-item label="边板厚度：" :label-width="formLabelWidth">
                    {{ product.SideBoardThickness }}
                  </el-form-item>
                </el-form>
              </el-col>
              <el-col :span="10">
                <el-form>
                  <el-form-item label="边板材质：" :label-width="formLabelWidth">
                    {{ product.SideBoardMaterial }}
                  </el-form-item>
                </el-form>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="10">
                <el-form>
                  <el-form-item label="底板厚度：" :label-width="formLabelWidth">
                    {{ product.FloorThickness }}
                  </el-form-item>
                </el-form>
              </el-col>
              <el-col :span="10">
                <el-form>
                  <el-form-item label="底板材质：" :label-width="formLabelWidth">
                    {{ product.FloorMaterial }}
                  </el-form-item>
                </el-form>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="10">
                <el-form>
                  <el-form-item label="后门类型：" :label-width="formLabelWidth">
                    {{ product.BackDoorType }}
                  </el-form-item>
                </el-form>
              </el-col>
            </el-row>
            <p style="margin-top:-0px;">-----------------------------------------------------------------------------------------------------------------------------------------------------</p>
            <p>产品配置</p>
            <el-row>
              <el-col :span="7">
                <el-form>
                  <el-form-item label="轮胎品牌：" :label-width="formLabelWidth">
                    {{ product.TireBrand }}
                  </el-form-item>
                </el-form>
              </el-col>
              <el-col :span="7">
                <el-form>
                  <el-form-item label="轮胎花色：" :label-width="formLabelWidth">
                    {{ product.TireShape }}
                  </el-form-item>
                </el-form>
              </el-col>
              <el-col :span="7">
                <el-form>
                  <el-form-item label="轮胎个数：" :label-width="formLabelWidth">
                    {{ product.TireNum }}
                  </el-form-item>
                </el-form>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="10">
                <el-form>
                  <el-form-item label="钢圈材质：" :label-width="formLabelWidth">
                    {{ product.SteelRingMaterial }}
                  </el-form-item>
                </el-form>
              </el-col>
              <el-col :span="10">
                <el-form>
                  <el-form-item label="钢圈数量：" :label-width="formLabelWidth">
                    {{ product.SteelRingNum }}
                  </el-form-item>
                </el-form>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="7">
                <el-form>
                  <el-form-item label="板簧品牌：" :label-width="formLabelWidth">
                    {{ product.PlateSpringBrand }}
                  </el-form-item>
                </el-form>
              </el-col>
              <el-col :span="7">
                <el-form>
                  <el-form-item label="板簧厚度：" :label-width="formLabelWidth">
                    {{ product.PlateSpringThickness }}
                  </el-form-item>
                </el-form>
              </el-col>
              <el-col :span="7">
                <el-form>
                  <el-form-item label="板簧片数：" :label-width="formLabelWidth">
                    {{ product.PlateSpringNum }}
                  </el-form-item>
                </el-form>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="10">
                <el-form>
                  <el-form-item label="液压品牌：" :label-width="formLabelWidth">
                    {{ product.HydraulicBrand }}
                  </el-form-item>
                </el-form>
              </el-col>
              <el-col :span="10">
                <el-form>
                  <el-form-item label="液压型号：" :label-width="formLabelWidth">
                    {{ product.HydraulicModel }}
                  </el-form-item>
                </el-form>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="10">
                <el-form>
                  <el-form-item label="车桥：" :label-width="formLabelWidth">
                    {{ product.Axle }}
                  </el-form-item>
                </el-form>
              </el-col>
              <el-col :span="10">
                <el-form>
                  <el-form-item label="ABS：" :label-width="formLabelWidth">
                    {{ product.ABS }}
                  </el-form-item>
                </el-form>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="10">
                <el-form>
                  <el-form-item label="空气悬挂：" :label-width="formLabelWidth">
                    {{ product.HasAirSuspension }}
                  </el-form-item>
                </el-form>
              </el-col>
              <el-col :span="10">
                <el-form>
                  <el-form-item label="自动调整臂：" :label-width="formLabelWidth">
                    {{ product.HasAdjustingArm }}
                  </el-form-item>
                </el-form>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form>
                  <el-form-item label="喷涂：" :label-width="formLabelWidth">
                    {{ product.SprayPaint }}
                  </el-form-item>
                </el-form>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="20">
                <el-form>
                  <el-form-item label="其它配置：" :label-width="formLabelWidth">
                    {{ product.Mark }}
                  </el-form-item>
                </el-form>
              </el-col>
            </el-row>
          </section>
        </div>
        <div slot="footer" class="dialog-footer">
          <el-button @click="printDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="printOrder()">打印</el-button>
          <el-button type="primary" @click="CreateQRCode()"
            >生成二维码</el-button
          >
        </div>
      </template>
    </el-dialog>
    <el-dialog :visible.sync="zxcPrintDialogVisible">
      <template>
        <div>
          <section ref="zxcprint" id="zxcprint">
            <el-divider></el-divider>
            <div
              id="qrcode3"
              class="qrcode3"
              ref="qrCodeUrl3"
              style="float: right; margin-left: -500px"
            ></div>
            <p style="margin-top:-20px;">------------------------------------------------------------------------------------------------------------------------------------------------------</p>
            <el-row :gutter="0">
              <el-col :span="10">
                <el-form :model="zxcproduct">
                  <el-form-item label="生产日期" :label-width="formLabelWidth">
                    {{ zxcproduct.ProductDate }}
                  </el-form-item>
                  <el-form-item label="交货期" :label-width="formLabelWidth">
                    {{ zxcproduct.DeliveryDate }}
                  </el-form-item>
                  <el-form-item
                    label="合同号"
                    :label-width="formLabelWidth"
                    auto-complete="off"
                    :readonly="dialogReadonly"
                  >
                    {{ zxcproduct.ProductNumber }}
                  </el-form-item>
                  <el-form-item
                    label="客户名称"
                    :label-width="formLabelWidth"
                    auto-complete="off"
                    :readonly="dialogReadonly"
                  >
                    {{ zxcproduct.CustomerName }}
                  </el-form-item>
                  <el-form-item label="底板型号" :label-width="formLabelWidth">
                    {{ zxcproduct.FloorType }}
                  </el-form-item>
                  <el-form-item label="底盘号" :label-width="formLabelWidth">
                    {{ zxcproduct.FloorNumber }}
                  </el-form-item>
                  <p>----------------------------------------------------------------------</p>
                  <el-form-item>
                    <div style="padding: 0px; margin-top: 0px">
                      <span>特别约定</span>
                    </div>
                    <el-input
                      type="textarea"
                      :rows="12"
                      placeholder="请输入内容"
                      v-model="zxcproduct.Mark"
                      style="font-size:18px;"
                    ></el-input>
                  </el-form-item>
                </el-form>
              </el-col>
              <el-col :span="10">
                <el-collapse
                  accordion
                  v-model="activeCollapseItem"
                  style="margin-top: 100px"
                >
                  <el-collapse-item title="" name="1">
                    <el-form>
                      <p>货厢规格</p>
                      <el-row>
                        <el-col :span="10">
                          <el-form-item
                            label="长"
                            :label-width="formLabelWidth"
                          >
                            {{ zxcproduct.Length }}
                          </el-form-item>
                        </el-col>
                        <el-col :span="10">
                          <el-form-item
                            label="宽"
                            :label-width="formLabelWidth"
                          >
                            {{ zxcproduct.Width }}
                          </el-form-item>
                        </el-col>
                      </el-row>
                      <el-row>
                        <el-col :span="10">
                          <el-form-item
                            label="高"
                            :label-width="formLabelWidth"
                          >
                            {{ zxcproduct.Height }}
                          </el-form-item>
                        </el-col>
                      </el-row>
                    </el-form>
                  </el-collapse-item>
                  <el-collapse-item title="" name="1" style="margin-top: -0px;">
                    <el-form>
                      <p>板厚要求</p>
                      <el-row>
                        <el-col :span="10">
                          <el-form-item
                            label="底板"
                            :label-width="formLabelWidth"
                          >
                            {{ zxcproduct.FloorThickness }}
                          </el-form-item>
                        </el-col>
                        <el-col :span="10">
                          <el-form-item
                            label="边板"
                            :label-width="formLabelWidth"
                          >
                            {{ zxcproduct.SideBoardThickness }}
                          </el-form-item>
                        </el-col>
                      </el-row>
                      <el-row>
                        <el-col :span="10">
                          <el-form-item
                            label="前挡"
                            :label-width="formLabelWidth"
                          >
                            {{ zxcproduct.FrontboardThickness }}
                          </el-form-item>
                        </el-col>
                        <el-col :span="10">
                          <el-form-item
                            label="后门"
                            :label-width="formLabelWidth"
                          >
                            {{ zxcproduct.BackboardThickness }}
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
                    style="margin-top: 50px"
                  >
                    {{ zxcproduct.Material }}
                  </el-form-item>
                  <el-form-item label="纵梁数" :label-width="formLabelWidth">
                    {{ zxcproduct.CarlingNumber }}
                  </el-form-item>
                  
                </el-form>
              </el-col>
            </el-row>
          </section>
        </div>
        <div slot="footer" class="dialog-footer">
          <el-button @click="printDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="zxcPrintOrder()">打印</el-button>
          <el-button type="primary" @click="CreateQRCode()"
            >生成二维码</el-button
          >
        </div>
      </template>
    </el-dialog>
  </el-container>
</template>

<style>
.line-left-right {
  padding: 0 0px 0px;
  margin: 20px 0px;
  line-height: 1px;
  width: 1500px;
  border-left: 750px solid rgb(221, 221, 221);
  border-right: 750px solid rgb(221, 221, 221);
  text-align: center;
  height: 2px;
}
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
.p {
  text-align: left;
  min-width: 300px;
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
}
.qrcode1 {
  display: inline-block;
}
</style>

<script>
import qs from "qs";
import https from "../../https.js";
import QRCode from "qrcodejs2";
import axios from "axios";
import print from "print-js";

export function startUpload(data) {
  return axios({
    method: "post",
    url: "http://192.168.1.105:8090/Upload",
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
      dialogDrawingVisible: false,
      printDialogVisible: false,
      zxcPrintDialogVisible: false,
      dialogFormVisible: false,
      zxcDialogVisible: false,
      dialogReadonly: false,
      operationType: "1", // 操作类型,添加、编辑、查看
      activeIndex: "1",
      iconVal: "",
      activeName: "first",
      activeCollapseItem: "1",
      imageList: [],
      imagenames: [],
      imageUrl: "",
      imgSrc: require("../../assets/images/wxjz.jpg"),
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
      zxcTableData: [],
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
      qrcode: {},
      qrcode1: {},
      searchProduct: "",
      durationTime: 1500,
    };
  },
  methods: {
    handleSelect() {},
    beforeUpload() {
      if (this.activeName == "first") {
        let fd = new FormData();
        let params = { vin: this.product.VIN };
        fd.append("vin", this.product.VIN);

        https
          .fetchGet("Upload/setvin", params)
          .then((data) => {
            this.$notify({
              title: "提示",
              message: data.data,
              duration: this.durationTime,
            });
          })
          .catch((err) => {
            console.log(err);
          });

        startUpload(fd).then((res) => {
          console.log(res);
        });
      } else if (this.activeName == "second") {
        console.log("vin:" + this.zxcproduct.FloorNumber);
        let fd = new FormData();
        let params = { vin: this.zxcproduct.FloorNumber };
        fd.append("vin", this.zxcproduct.FloorNumber);
        https
          .fetchGet("Upload/setvin", params)
          .then((data) => {
            this.$notify({
              title: "提示",
              message: data.data,
              duration: this.durationTime,
            });
          })
          .catch((err) => {
            console.log(err);
          });

        startUpload(fd).then((res) => {
          console.log(res);
        });
      }

      return true;
    },
    newSubmitForm() {
      this.$refs.newupload.submit();
    },
    //上传工艺图
    uploadDrawing2() {
      this.dialogPictureVisible = true;
    },
    uploadDrawing1(product) {
      console.log("product:" + product);
      this.dialogPictureVisible = true;
      this.zxcproduct = product;
    },
    uploadDrawing(product) {
      console.log("product:" + product);
      this.dialogPictureVisible = true;
      this.product = product;
    },
    //查看工艺图
    showDrawing2() {
      this.dialogDrawingVisible = true;
      let params = {};
      if (this.activeName == "first") {
        console.log(this.zxcproduct.VIN);
        params = { vin: this.product.VIN };
      } else if (this.activeName == "second") {
        console.log(this.zxcproduct.FloorNumber);
        params = { vin: this.zxcproduct.FloorNumber };
      }
      https
        .fetchGet("Download/getfilenames", params)
        .then((data) => {
          this.imagenames = data.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    showDrawing1(product) {
      this.dialogDrawingVisible = true;
      this.zxcproduct = product;
      let params = { vin: this.zxcproduct.FloorNumber };
      https
        .fetchGet("Download/getfilenames", params)
        .then((data) => {
          this.imagenames = data.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    showDrawing(product) {
      this.dialogDrawingVisible = true;
      this.product = product;
      let params = { vin: product.VIN };
      https
        .fetchGet("Download/getfilenames", params)
        .then((data) => {
          this.imagenames = data.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    //预览工艺图
    previewDrawing(filename) {
      if (this.activeName == "first") {
        this.imageUrl =
          "http://192.168.1.105:8090/Download/getimage?vin=" +
          this.product.VIN +
          "&fileName=" +
          filename;
      } else if (this.activeName == "second") {
        this.imageUrl =
          "http://192.168.1.105:8090/Download/getimage?vin=" +
          this.zxcproduct.FloorNumber +
          "&fileName=" +
          filename;
      }
    },
    //查看生产信息
    showProduct(product) {
      if (this.activeName == "first") {
        this.dialogFormVisible = true;
        this.zxcDialogVisible = false;
        this.product = product;
      } else if (this.activeName == "second") {
        this.dialogFormVisible = false;
        this.zxcDialogVisible = true;
        this.zxcproduct = product;
      }
      this.dialogReadonly = true;
      this.operationType = "1";
    },
    //添加生产信息
    addProduct() {
      if (this.activeName == "first") {
        this.dialogFormVisible = true;
        this.zxcDialogVisible = false;
      } else if (this.activeName == "second") {
        this.dialogFormVisible = false;
        this.zxcDialogVisible = true;
      }
      this.dialogReadonly = false;
      this.product = {};

      var nowDate = new Date();
      let date = {
        year: nowDate.getFullYear(),
        month: nowDate.getMonth() + 1,
        date: nowDate.getDate(),
      };
      console.log(date);
      let systemDate = date.year + "-" + date.month + "-" + date.date;
      this.product.OrderDate = systemDate;
      this.zxcproduct.ProductDate = systemDate;

      this.operationType = "2";
    },
    //编辑生产信息
    editProduct(product) {
      if (this.activeName == "first") {
        this.dialogFormVisible = true;
        this.zxcDialogVisible = false;
        this.product = product;
      } else if (this.activeName == "second") {
        this.dialogFormVisible = false;
        this.zxcDialogVisible = true;
        this.zxcproduct = product;
      }
      this.dialogReadonly = false;
      this.operationType = "3";
    },
    //删除生产信息
    deleteProduct(product) {
      this.$confirm("是否确认删除该条数据?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
        center: true,
      })
        .then(() => {
          if (this.activeName == "first") {
            let params = { orderJson: product };
            https
              .fetchGet("Order/delete", params)
              .then((data) => {
                this.$notify({
                  title: "提示",
                  message: data.data,
                  duration: this.durationTime,
                });
                if (data.data == "删除成功") {
                  this.tableData.splice(this.tableData.indexOf(product), 1); //删除表格信息
                }
              })
              .catch((err) => {
                console.log(err);
              });
          } else if (this.activeName == "second") {
            let params = { orderJson: product };
            https
              .fetchGet("ZxcOrder/delete", params)
              .then((data) => {
                this.$notify({
                  title: "提示",
                  message: data.data,
                  duration: this.durationTime,
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
    //保存生产信息
    SaveProductInfo() {
      // this.dialogFormVisible = true;

      if (this.operationType == "2") {
        let params = { orderJson: JSON.stringify(this.product) };
        console.log(this.activeName);
        if (this.activeName == "first") {
          https
            .fetchGet("Order/add", params)
            .then((data) => {
              this.$notify({
                title: "提示",
                message: data.data,
                duration: this.durationTime,
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
          let params = { orderJson: JSON.stringify(this.zxcproduct) };
          https
            .fetchGet("ZxcOrder/add", params)
            .then((data) => {
              this.$notify({
                title: "提示",
                message: data.data,
                duration: this.durationTime,
              });
              if (data.data == "添加成功") {
                this.zxcTableData.push(this.zxcproduct);
                this.dialogFormVisible = false;
              }
            })
            .catch((err) => {
              console.log(err);
            });
        }
      } else if (this.operationType == "3") {
        if (this.activeName == "first") {
          let params = { orderJson: this.product };
          https
            .fetchGet("Order/update", params)
            .then((data) => {
              this.$notify({
                title: "提示",
                message: data.data,
                duration: this.durationTime,
              });
            })
            .catch((err) => {
              console.log(err);
            });
        } else if (this.activeName == "second") {
          let params = { orderJson: JSON.stringify(this.zxcproduct) };
          https
            .fetchGet("ZxcOrder/update", params)
            .then((data) => {
              this.$notify({
                title: "提示",
                message: data.data,
                duration: this.durationTime,
              });
            })
            .catch((err) => {
              console.log(err);
            });
        }
      }
    },

    //生成二维码
    CreateQRCode() {
      if (this.activeName == "first") {
        document.getElementById("qrcode").innerHTML = "";
        let qrInfo = {
          text: this.product.VIN, // 需要转换为二维码的内容
          // text:qs.stringify({vin:this.product.VIN,type:1}),
          width: 100,
          height: 100,
          colorDark: "#000000",
          colorLight: "#ffffff",
          correctLevel: QRCode.CorrectLevel.H,
        };
        this.qrcode = new QRCode(this.$refs.qrCodeUrl, qrInfo);

        document.getElementById("qrcode2").innerHTML = "";
        // qrInfo = {
        //   text: this.product.VIN, // 需要转换为二维码的内容
        //   //  text:qs.stringify({vin:this.zxcproduct.FloorNumber,type:2}),
        //   width: 100,
        //   height: 100,
        //   colorDark: "#000000",
        //   colorLight: "#ffffff",
        //   correctLevel: QRCode.CorrectLevel.H,
        // };
        this.qrcode2 = new QRCode(this.$refs.qrCodeUrl2, qrInfo);
      } else if (this.activeName == "second") {
        document.getElementById("qrcode1").innerHTML = "";
        let qrInfo = {
          text: this.zxcproduct.FloorNumber, // 需要转换为二维码的内容
          //  text:qs.stringify({vin:this.zxcproduct.FloorNumber,type:2}),
          width: 100,
          height: 100,
          colorDark: "#000000",
          colorLight: "#ffffff",
          correctLevel: QRCode.CorrectLevel.H,
        };
        this.qrcode1 = new QRCode(this.$refs.qrCodeUrl1, qrInfo);

        document.getElementById("qrcode3").innerHTML = "";
        // qrInfo = {
        //   text: this.zxcproduct.FloorNumber, // 需要转换为二维码的内容
        //   //  text:qs.stringify({vin:this.zxcproduct.FloorNumber,type:2}),
        //   width: 100,
        //   height: 100,
        //   colorDark: "#000000",
        //   colorLight: "#ffffff",
        //   correctLevel: QRCode.CorrectLevel.H,
        // };
        this.qrcode3 = new QRCode(this.$refs.qrCodeUrl3, qrInfo);
      }
    },
    //打印预览
    printPreview() {
      this.printDialogVisible = true;
    },
    zxcPrintPreview() {
      this.zxcPrintDialogVisible = true;
    },
    //打印订单
    printOrder(index, row) {
      // this.$print(this.$refs.print); // 使用
      printJS({
        printable: "print", // 标签元素id
        type: "html",
        header: "半挂车技术配置规范确认书",
        targetStyles: ["*"],
        style: "white-space:nowrap;font-size:10px",
      });
    },
    zxcPrintOrder(index, row) {
      printJS({
        printable: "zxcprint", // 标签元素id
        type: "html",
        header: "自卸车生产加工合同",
        targetStyles: ["*"],
        style: "white-space:nowrap;font-size:10px",
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
          duration: this.durationTime,
        });
      }
      if (!isLt5M) {
        this.$notify({
          title: "提示",
          message: "请上传5MB以内的图片",
          duration: this.durationTime,
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
              duration: this.durationTime,
            });
          } else {
            this.$notify({
              title: "提示",
              message: "上传失败",
              duration: this.durationTime,
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
      .fetchGet("Order/getall")
      .then((data) => {
        this.tableData = data.data;
      })
      .catch((err) => {
        console.log(err);
      });

    https
      .fetchGet("ZxcOrder/getall")
      .then((data) => {
        this.zxcTableData = data.data;
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
        let params = { vin: this.code };
        if (this.code.indexOf("CWX") >= 0) {
          console.log("11111");
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
              this.zxcDialogVisible = false;
            })
            .catch((err) => {
              console.log(err);
            });
        } else {
          console.log("22222");
          https
            .fetchGet("ZxcOrder/getsingle", params)
            .then((data) => {
              // this.$notify({
              //   title: "提示",
              //   message: data.data,
              //   duration: 3000,
              // });
              this.zxcproduct = data.data;
              this.dialogFormVisible = false;
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