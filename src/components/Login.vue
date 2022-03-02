<template>
  <!--登陆页面-->   
  <div class="login_container">
    <!--登陆盒子-->
    <div class="login_box">
      <!--头像盒子区域-->
      <div class="avatar_box">
        <img src="../assets/logo.png" alt="">
      </div>
      <!--登陆表单区域-->
      <!--ref="loginFormRef"表单的实例对象 调用resetFields方法-->
      <el-form ref="loginFormRef" :model="loginForm" :rules="loginFormRules" label-width="0px" class="login_form">
        <!--用户名-->
        <el-form-item prop="username">
          <el-input v-model="loginForm.username" prefix-icon="iconfont icon-user"></el-input>
        </el-form-item>
        <!--密码-->
        <el-form-item prop="password">
          <el-input v-model="loginForm.password" type="password" prefix-icon="iconfont icon-3702mima"></el-input>
        </el-form-item>
        <!--        按钮区域-->
        <el-form-item class="btns">
          <el-button type="primary" @click="login">登陆</el-button>
          <el-button type="info" @click="resetLoginForm">重置</el-button>

        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      //这是登陆表单的数据绑定对象
      loginForm: {
        username: 'admin',
        password: '123456'
      },
      //这是表单的验证规则对象
      loginFormRules: {
        // 验证用户是否合法
        username: [
          // trigger触发的时机，当失去焦点的时候触发
          {required: true, message: '请输入登陆名称', trigger: 'blur'},
          {min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur'}
        ],
        // 验证密码是否合法
        password: [
          {required: true, message: '请输入登陆密码', trigger: 'blur'},
          {min: 6, max: 15, message: '长度在 5 到 15 个字符', trigger: 'blur'}
        ]
      }
    }
  },
  // 点击重置按钮，重置登陆表单
  methods: {
    resetLoginForm() {
      // console.log(this);
      this.$refs.loginFormRef.resetFields();
    },
    login() {
      // validate的预调验
      this.$refs.loginFormRef.validate(async (valid) => {
        if (!valid) return;
       // 某个返回是一个Promise方法，就用await简化这个操作
       const {data:res} = await this.$http.post('login',this.loginForm);
        // console.log(res);
        // 进行if判断是否登陆成功
        if (res.meta.status !== 200) return this.$message.error('登陆失败')
        this.$message.success('登陆成功')
        // 1.将登陆成功之后的token,保存客户端的sessionStorage中
        //   1.1 将项目中除了登陆之外的其他API接口，必须再登陆之后才能访问
        //   1.2 token直营在当前网站打开期间生效，所以将token保存在sessionStorage中
        window.sessionStorage.setItem("token",res.data.token);
        // 2.通过编程式导航跳转到后台主页，路由地址是：/home
        this.$router.push("/home")
      })
    }
  }
}
</script>

<style lang="less" scoped>
.login_container {
  background-color: #2b4b6b;
  background-image: url('../assets/3.jpg');
  height: 100%;
}

.login_box {
  width: 450px;
  height: 300px;
  background-color: #fff;
  border-radius: 5px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  background-color: rgba(0,0,0,.5);
}

.avatar_box {
  height: 130px;
  width: 130px;
  border: .5px solid #000;
  border-radius: 50%;
  padding: 7px;
  box-shadow: 0 0 10px;
  position: absolute;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;

  img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background-color: #eee;
  }
}

.login_form {
  position: absolute;
  bottom: 0;
  width: 100%;
  /*让左右有个边距*/
  padding: 0 20px;
  /*复习box-sizing: border-box;*/
  box-sizing: border-box;
}

.btns {
  display: flex;
  justify-content: flex-end;
}
</style>
