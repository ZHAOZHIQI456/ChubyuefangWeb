<template>
  <!--  背景-->
  <div class="login-box">
    <!--    登录模块-->
    <div class="login-head">
      <!--      顶部logo-->
      <div class="top">
        <div class="header">
          <img alt="logo" class="logo" src="../assets/logo.png"/>
          <span class="title">纯阅坊后台管理系统</span>
        </div>
      </div>
      <!--      登录表单-->
      <div class="login">
        <el-form class="login" ref="loginFormrel" :rules="loginFormRul" :model="loginForm" size="large">
          <el-form-item label="" prop="username">
            <el-input
                prefix-icon="el-icon-user"
                autocomplete="autocomplete"
                placeholder="admin"
                v-model="loginForm.username"></el-input>
          </el-form-item>
          <el-form-item label="" prop="password">
            <el-input
                prefix-icon="el-icon-lock"
                autocomplete="autocomplete"
                placeholder="888888"
                type="password" v-model="loginForm.password"></el-input>
          </el-form-item>
          <el-form-item class="buts">
            <el-button type="primary" @click="Login">登录</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: "Login",
  data() {
    return {
      //表单数据
      loginForm: {
        username: 'admin',
        password: '123456',
      },
      //表单验证规则
      loginFormRul: {
        username: [
          {required: true, message: '请输入用户名', trigger: 'blur'},
          {min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur'}
        ],
        password: [
          {required: true, message: '请输入密码', trigger: 'blur'},
          {min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur'}
        ],
      }
    }
  },
  methods: {
    //登录方法
    Login() {
      this.$refs.loginFormrel.validate(vaild => {
        if (!vaild) return;
        let qs = {username: this.loginForm.username, password: this.loginForm.password}
        this.$http.post("/Administratorcontroller/Login", this.$qs.stringify(qs)).then((res) => {
          console.log(res)
          if (res.data.code === 1) {
            this.$message.success("登录成功")
            this.$router.push('/main')
          } else this.$message.error("登录失败")
        })
      })
    },
  },
}

</script>
<!--样式-->
<style scoped>
.login-box {
  height: 100%;
  background-image: url('https://gw.alipayobjects.com/zos/rmsportal/TVYTbAXWheQpRcWDaDMu.svg');
}

.login-head {
  position: absolute;
  top: 20%;
  left: 40%;
}

.top {
  text-align: center;
}

.header {
  height: 44px;
  line-height: 44px;
}

a {
  text-decoration: none;
}

.logo {
  height: 44px;
  vertical-align: top;
  margin-right: 16px;
}

.title {
  font-size: 33px;
  color: #2c3e50;
  font-family: 'Myriad Pro', 'Helvetica Neue', Arial, Helvetica, sans-serif;
  font-weight: 600;
  position: relative;
  top: 2px;
}

.login {
  padding-top: 20px;
  width: 340px;
  margin: 0 auto;
}

.buts {
  display: flex;
  justify-content: center;
}
</style>
