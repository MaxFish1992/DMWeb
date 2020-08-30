<template>
  <div class="login_container">
    <!-- <img :src="imgSrc" width="100%" height="100%" alt /> -->
    <div class="login_box">
      <!-- 登录表单区域 -->
      <el-form size="mini">
        <el-form-item>
          <h3>用户注册</h3>
        </el-form-item>
        <!-- 用户名 -->
        <el-form-item>
          <el-input placeholder="用户名" v-model="userName"></el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item>
          <el-input placeholder="密码" v-model="password" show-password></el-input>
        </el-form-item>
        <!-- 确认密码 -->
        <el-form-item>
          <el-input placeholder="确认密码" v-model="valPassword" show-password></el-input>
        </el-form-item>
        <!-- 验证码 -->
        <!-- <el-form-item>
          <el-input class="code" placeholder="验证码"></el-input>
          <a>
            <img />
          </a>
        </el-form-item>-->
        <!-- 记住我 -->
        <!-- <el-form-item>
          <el-checkbox label="记住我" class="rememberMe"></el-checkbox>
        </el-form-item>-->
        <!-- 注册按钮 -->
        <el-form-item>
          <el-button type="primary" @click="registered()">注册</el-button>
          <el-button type="primary" @click="exit()">退出</el-button>
        </el-form-item>
      </el-form>
    </div>
    <vue-particles
      color="#fff"
      :particleOpacity="0.7"
      :particlesNumber="60"
      shapeType="circle"
      :particleSize="4"
      linesColor="#fff"
      :linesWidth="1"
      :lineLinked="true"
      :lineOpacity="0.4"
      :linesDistance="150"
      :moveSpeed="2"
      :hoverEffect="true"
      hoverMode="grab"
      :clickEffect="true"
      clickMode="push"
      class="lizi"
      style="height:100%"
    ></vue-particles>
  </div>
</template>
<script>
import https from "../https.js"; // 注意用自己的路径
// import axios from "axios";
export default {
  name: "login_container",
  data() {
    return {
      imgSrc: require("../assets/images/wxjz.jpg"),
      userName: "",
      password: "",
      valPassword: "",
    };
  },
  methods: {
    registered: function () {
      var _this = this;
      if (_this.password != _this.valPassword) {
        alert("密码不一致，请重新输入");
        return;
      }
      let params = {
        userName: _this.userName,
        password: _this.password,
        authority: 3,
      };
      console.log(_this.userName + "," + _this.password);
      console.log(params);
      https
        .fetchPost("User/AddUser", params)
        .then((data) => {
          alert(data.data);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    exit: function () {
      this.$router.push("/login");
    },
  },
};
</script>
<style scoped>
.login_container {
  background-image: linear-gradient(-180deg, #1a1454 0%, #0e81a5 100%);
  /*background-image: url("../images/bg_login.png");*/
  background-repeat: no-repeat;
  background-size: cover;
  height: 100%;
  width: 100%;
}
.login_box {
  width: 350px;
  height: 300px;
  /* background-color: #fff; */
  background-color: #2e527bb3;
  border-radius: 5px;

  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
.el-form {
  padding: 32px;
  position: absolute;
  bottom: 0;
  width: 100%;
  box-sizing: border-box;
}
.el-button {
  width: 120px;
}
.code {
  width: 45%;
}
img {
  /* style="width: 100px; height: 30px; margin-left:5px;vertical-align: middle;" */
  display: line-inline;
  width: 45%;
  height: 28px;
  margin-left: 10px;
  vertical-align: middle;
  border-radius: 3px;
}
.rememberMe {
  color: #fff;
}
</style>