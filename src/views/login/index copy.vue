<template>
  <div class="login">
    <div class="cont-wrap">
      <div class="login-info">
        <div class="box-wrap">
          <div class="login-info-title">
            <span>润才外协管理系统</span>
          </div>
          <dl>
            <dt>
              <span>帐号登录</span>
            </dt>
            <dd
              class="tl-input-account"
              :class="{
                'amt-txt-slip': isInputAccount,
                'is-error': isLoginError,
              }"
            >
              <el-input
                placeholder="请输入账户名"
                v-model="loginName"
                @focus="changeFocus('input-txt')"
                @blur="loseFocus"
                @input="animationAccound"
                @mouseover.native="mouseover('input-txt')"
                @mouseout.native="mouseout('input-txt')"
                ref="input-txt"
                class="tl-input-line"
                :class="{ 'amt-line-elastic': focusName == 'input-txt' }"
              ></el-input>
              <div
                @click="removeAccound"
                @mouseover="mouseover('input-txt')"
                @mouseout="mouseout('input-txt')"
                class="remove-current"
              ></div>
              <div class="error-msg">
                {{ errorMessage || "您输入的账户名或密码有误！" }}
              </div>
              <div class="prompt-info">账户名</div>
            </dd>
            <dd class="tl-input-pwd" :class="{ 'amt-txt-slip': isInputPwd }">
              <el-input
                type="password"
                placeholder="请输入密码"
                v-model="loginPwd"
                @focus="changeFocus('input-pwd')"
                @blur="loseFocus"
                @input="animationPwd"
                @mouseover.native="mouseover('input-pwd')"
                @mouseout.native="mouseout('input-pwd')"
                ref="input-pwd"
                class="tl-input-line"
                :class="{ 'amt-line-elastic': focusName == 'input-pwd' }"
                @keyup.native.enter="login"
              ></el-input>
              <div
                @click="removePwd"
                @mouseover="mouseover('input-pwd')"
                @mouseout="mouseout('input-pwd')"
                class="remove-current"
              ></div>
              <div class="prompt-info">密码</div>
            </dd>
            <dd>
              <el-button type="primary" @click="login" class="tl-btn amt-bg-slip">
                <em>登</em>
                <em>录</em>
              </el-button>
            </dd>
            <dd>
              <el-checkbox v-model="checked" class="tl-checkbox">记住登录账号</el-checkbox>
            </dd>
          </dl>
        </div>
      </div>
      <div class="login-inset">
        <div class="login-inset-inside"></div>
      </div>
    </div>
  </div>
</template>

<script>
// import cryptoJS from "crypto-js/crypto-js";
// import { localSave } from "@/lib/util";
// import Server from "./server";

// const server = new Server();

export default {
  name: "login",
  components: {},
  data() {
    return {
      server,
      loginName: "",
      loginPwd: "",
      checked: true,
      focusName: "",
      isInputAccount: false,
      isInputPwd: false,
      isLoginError: false,
      mouseRef: "",
      errorMessage: "",
    };
  },
  computed: {},
  mounted() {},
  methods: {
    encryptionAES(params) {
      let keys = "";
      let encryptorStr = "";
      keys = cryptoJS.enc.Utf8.parse("runliankeji20210");
      params = cryptoJS.enc.Utf8.parse(params);
      // 开始加密
      encryptorStr = cryptoJS.AES.encrypt(params, keys, {
        mode: cryptoJS.mode.ECB,
        padding: cryptoJS.pad.Pkcs7,
      });
      encryptorStr = String(encryptorStr); // 之将加密后的转换成 字符串, 解密成功
      // 返回 加密后的 字符串
      return encryptorStr;
    },
    login() {
      const self = this;
      self.focusName = "";
      if (self.loginName == "" || self.loginPwd == "") {
        self.isLoginError = true;
        self.focusName = "";
        self.errorMessage = "请输入用户名和密码";
      } else {
        self.server
          .login({
            ciphertext: "",
            loginName: this.encryptionAES(self.loginName),
            loginPwd: this.encryptionAES(self.loginPwd),
          })
          .then((res) => {
            if (res.code == 200) {
              window.location.reload();
              localSave("token", res.data);
              this.$router.push({
                name: "transfer",
                query: {
                  token: res.data,
                },
              });
            } else {
              self.isLoginError = true;
              self.focusName = "";
              self.errorMessage = res.msg;
              // self.$message.error(res.msg);
            }
            // else if (res.code == 30000) {
            //   // 存在多个租户，选择租户
            //   // localSave('token', res.data);
            //   localStorage.setItem('tag', res.data);
            //   localStorage.setItem('loginName', self.loginName);
            //   localStorage.setItem('loginPwd', self.loginPwd);
            //   self.go('transferTenant', {
            //     // query: {
            //     //   tag: res.data,
            //     //   loginName: self.loginName,
            //     //   loginPwd: self.loginPwd,
            //     // },
            //   });
            // }
          });
      }
    },
    changeFocus(ref) {
      this.focusName = ref;
    },
    loseFocus() {
      if (this.mouseRef == "") {
        this.focusName = "";
      }
      this.isInputAccount = false;
      this.isInputPwd = false;
    },
    animationAccound() {
      this.isInputAccount = true;
      this.isLoginError = false;
    },
    animationPwd() {
      this.isInputPwd = true;
      this.isLoginError = false;
    },
    removeAccound() {
      this.loginName = "";
      this.focusName = "";
    },
    removePwd() {
      this.loginPwd = "";
      this.focusName = "";
    },
    mouseover(ref) {
      this.mouseRef = ref;
    },
    mouseout() {
      this.mouseRef = "";
    },
  },
};
</script>
