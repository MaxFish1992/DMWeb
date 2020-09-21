<template>
  <div>
    <div class="login_container">
      <!-- <img :src="imgSrc" width="100%" height="100%" alt /> -->
      <div class="login_box">
        <!-- 登录表单区域 -->
        <el-form size="mini">
          <el-form-item>
            <h3 style="color:white">欢迎登录</h3>
          </el-form-item>
          <!-- 用户名 -->
          <el-form-item>
            <el-input placeholder="用户名" v-model="user.userName"></el-input>
          </el-form-item>
          <!-- 密码 -->
          <el-form-item>
            <el-input placeholder="密码" v-model="user.password" show-password></el-input>
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
          <!-- 登录按钮 -->
          <el-form-item>
            <el-button type="primary" @click="login()">登录</el-button>
            <!-- <el-button type="primary" @click="registered()">注册</el-button> -->
          </el-form-item>
        </el-form>
      </div>
      <!-- <vue-particles
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
      ></vue-particles>-->
    </div>
  </div>
</template>
<script>
import https from "../https.js"; // 注意用自己的路径
import store from "../store/index.js";
export default {
  name: "login_container",
  data() {
    return {
      imgSrc: require("../assets/images/wxjz.jpg"),
      user: {
        userName: "",
        password: "",
        Authority: "",
      },
    };
  },
  methods: {
    login: function () {
      // this.$router.push("/home");
      let params = {
        userName: this.user.userName,
        password: this.user.password,
      };
      https
        .fetchGet("User/login", params)
        .then((res) => {
          this.$root.user = this.user;
          this.$root.user.Authority = res.data.Authority;
          console.log(this.$root.user);
          if (res.data.Mark == 1 && res.data.Token != "") {
            //保存token到状态
            store.commit("changeToken", res.data); ///////提交状态
            localStorage.setItem("token", res.data.token); //////token保存到localStorage
            this.$axios.defaults.headers.common["Authority"] =
              "Bearer " + res.data.token;

            // alert("登录成功");
            //跳转到首页
            this.$router.push({
              path: "/home",
            });
          } else {
            //错误提示
            alert("登录失败");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    registered: function () {
      this.$router.push("/registered");
    },
  },
};
</script>
<style scoped>
.login_container {
  /* background-image: linear-gradient(-180deg, #1a1454 0%, #0e81a5 100%); */
  background-image: url("../assets/images/wxjz.jpg");
  background-repeat: no-repeat;
  background-size: cover;
  height: 100%;
  width: 100%;
  z-index: 1;
  position: absolute;
}
.login_box {
  width: 350px;
  height: 250px;
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