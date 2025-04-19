<template>
  <div class="login">
    <div class="login-container">
      <div class="left">
        <div class="ch-title">虚拟电厂运营商平台</div>
        <div class="en-title">Virtual power plant</div>
      </div>
      <div class="right">
        <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form">
          <h3 class="login-title">欢迎登录</h3>
          <el-form-item prop="username">
            <el-input v-model="loginForm.username" type="text" auto-complete="off" placeholder="账号"
              @focus="(e) => handleFocus(e, 0)" @blur="(e) => handleBlur(e, 0)">
              <!--            <svg-icon slot="prefix" icon-class="login-user" class="el-input__icon input-icon" />-->
              <img v-if="focusConf[0].isFocus" slot="prefix" width="21" height="24"
                src="../assets/images/login-user-focus.png" class="el-input__icon input-icon" alt="" />
              <img v-else slot="prefix" width="21" height="24" src="../assets/images/login-user.png"
                class="el-input__icon input-icon" alt="" />
            </el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input v-model="loginForm.password" type="password" auto-complete="off" placeholder="密码"
              @keyup.enter.native="handleLogin" @focus="(e) => handleFocus(e, 1)" @blur="(e) => handleBlur(e, 1)">
              <!--            <svg-icon slot="prefix" icon-class="password" class="el-input__icon input-icon" />-->
              <img v-if="focusConf[1].isFocus" slot="prefix" width="21" height="24"
                src="../assets/images/login-pwd-focus.png" class="el-input__icon input-icon" alt="" />
              <img v-else slot="prefix" width="21" height="24" src="../assets/images/login-pwd.png"
                class="el-input__icon input-icon" alt="" />
            </el-input>
          </el-form-item>
          <!--        <el-form-item prop="code" v-if="captchaEnabled">-->
          <!--          <el-input-->
          <!--            v-model="loginForm.code"-->
          <!--            auto-complete="off"-->
          <!--            placeholder="验证码"-->
          <!--            style="width: 63%"-->
          <!--            @keyup.enter.native="handleLogin"-->
          <!--          >-->
          <!--            <svg-icon slot="prefix" icon-class="validCode" class="el-input__icon input-icon" />-->
          <!--          </el-input>-->
          <!--          <div class="login-code">-->
          <!--            <img :src="codeUrl" @click="getCode" class="login-code-img"/>-->
          <!--          </div>-->
          <!--        </el-form-item>-->
          <p class="login-unaccount"><span>没有账户？</span><span class="register">免费注册</span></p>
          <el-checkbox v-model="loginForm.rememberMe">我已阅读并同意<span class="link">《虚拟电厂服务条款》</span><span
              class="link">《隐私条款》</span></el-checkbox>
          <el-form-item style="width:100%;">
            <el-button :loading="loading" size="medium" type="primary" class="button-style" style="width:100%;"
              @click.native.prevent="handleLogin">
              <span v-if="!loading">登 录</span>
              <span v-else>登 录 中...</span>
            </el-button>
            <div style="float: right;" v-if="register">
              <router-link class="link-type" :to="'/register'">立即注册</router-link>
            </div>
          </el-form-item>
        </el-form>
      </div>
    </div>

    <!--    &lt;!&ndash;  底部  &ndash;&gt;-->
    <!--    <div class="el-login-footer">-->
    <!--      <span></span>-->
    <!--    </div>-->
  </div>
</template>

<script>
import { getCodeImg } from "@/api/login";
import Cookies from "js-cookie";
import { encrypt, decrypt } from '@/utils/jsencrypt'

export default {
  name: "Login",
  data() {
    return {
      codeUrl: "",
      loginForm: {
        username: "",
        password: "",
        rememberMe: false,
        code: "",
        uuid: ""
      },
      loginRules: {
        username: [
          { required: true, trigger: "blur", message: "请输入您的账号" }
        ],
        password: [
          { required: true, trigger: "blur", message: "请输入您的密码" }
        ],
        code: [{ required: true, trigger: "change", message: "请输入验证码" }]
      },
      loading: false,
      // 验证码开关
      captchaEnabled: false,
      // 注册开关
      register: false,
      redirect: undefined,
      focusConf: {
        0: {
          isFocus: false
        },
        1: {
          isFocus: false
        }
      }
    };
  },
  watch: {
    $route: {
      handler: function (route) {
        this.redirect = route.query && route.query.redirect;
      },
      immediate: true
    }
  },
  created() {
    this.getCode();
    this.getCookie();
  },
  methods: {
    handleFocus(event, type) {
      event.preventDefault();
      this.focusConf[type].isFocus = true;
    },
    handleBlur(event, type) {
      event.preventDefault();
      this.focusConf[type].isFocus = false;
    },
    getCode() {
      getCodeImg().then(res => {
        this.captchaEnabled = res.captchaEnabled === undefined ? true : res.captchaEnabled;
        if (this.captchaEnabled) {
          this.codeUrl = "data:image/gif;base64," + res.img;
          this.loginForm.uuid = res.uuid;
        }
      });
    },
    getCookie() {
      const username = Cookies.get("username");
      const password = Cookies.get("password");
      const rememberMe = Cookies.get('rememberMe')
      this.loginForm = {
        username: username === undefined ? this.loginForm.username : username,
        password: password === undefined ? this.loginForm.password : decrypt(password),
        rememberMe: rememberMe === undefined ? false : Boolean(rememberMe)
      };
    },
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true;
          if (this.loginForm.rememberMe) {
            Cookies.set("username", this.loginForm.username, { expires: 30 });
            Cookies.set("password", encrypt(this.loginForm.password), { expires: 30 });
            Cookies.set('rememberMe', this.loginForm.rememberMe, { expires: 30 });
          } else {
            Cookies.remove("username");
            Cookies.remove("password");
            Cookies.remove('rememberMe');
          }
          this.$store.dispatch("Login", this.loginForm).then(() => {
            this.$router.push({ path: this.redirect || "/" }).catch(() => { });
          }).catch(() => {
            this.loading = false;
            if (this.captchaEnabled) {
              this.getCode();
            }
          });
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
$login-input-height: 52px;

.login {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  background-image: url("../assets/images/bg.png");
  background-size: cover;

  .login-container {
    display: flex;
    align-items: stretch;
    height: 710px;
    padding: 40px;

    .left {
      height: 100%;
      width: 604px;
      background-image: url("../assets/images/login-left.png");
      background-size: cover;
      padding: 64px 54px;
      font-weight: bold;
      color: #FFFFFF;
      line-height: 60px;
      text-align: left;

      .ch-title {
        height: 36px;
        font-size: 36px;
      }

      .en-title {
        height: 30px;
        font-size: 30px;
        margin-top: 18px;
      }
    }

    .right {
      width: 644px;
      height: 100%;

      .login-form {
        background: #ffffff;
        width: 100%;
        height: 100%;
        padding: 105px 90px;
        box-shadow: 0 0 40px 0 #B7B7B7;
        border-radius: 0 16px 16px 0;

        .login-title {
          font-size: 36px;
          font-weight: bold;
          color: #404040;
          text-align: center;
          margin: 0 0 56px 0;
        }

        .button-style {
          height: 50px;
          border-radius: 5px;
          //background: radial-gradient( NaN% 0% at 0% 0%, #005FED 0%, #0BDED7 100%), #1FFFC2;
          background: linear-gradient(0deg, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0)), linear-gradient(90deg, #3B82F6 0%, #22D3EE 100%);

          span {
            font-size: 20px;
            color: #FFFFFF;
            text-align: center;
          }

          &.el-button--primary {
            border-color: inherit;
          }
        }

        .el-input {
          height: $login-input-height;

          ::v-deep .el-input__inner {
            height: $login-input-height;
          }

          ::v-deep .el-input__prefix {
            display: flex;
            align-items: center;
          }
        }

        .input-icon {
          height: 24px;
          width: 21px;
          margin: 0 2px;
        }

        .login-unaccount {
          font-size: 16px;
          color: #404040;
          text-align: left;
          margin-bottom: 46px;

          .register {
            cursor: pointer;
            color: #2E9CFF;
          }
        }

        ::v-deep .el-checkbox {
          margin-bottom: 20px;

          .link {
            color: #2E9CFF;
          }

          &.is-checked {
            .el-checkbox__label {
              color: inherit;
            }
          }
        }
      }
    }
  }
}

//.login-tip {
//  font-size: 13px;
//  text-align: center;
//  color: #bfbfbf;
//}
//.login-code {
//  width: 33%;
//  height: 38px;
//  float: right;
//  img {
//    cursor: pointer;
//    vertical-align: middle;
//  }
//}
//.el-login-footer {
//  height: 40px;
//  line-height: 40px;
//  position: fixed;
//  bottom: 0;
//  width: 100%;
//  text-align: center;
//  color: #fff;
//  font-family: Arial;
//  font-size: 12px;
//  letter-spacing: 1px;
//}
//.login-code-img {
//  height: 38px;
//}</style>