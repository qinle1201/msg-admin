<template>
  <div class="login_box">
    <div class="login">
      <h1>梦雪谷后台管理系统</h1>
      <el-form
        :model="LoginForm"
        :rules="LoginFormRules"
        ref="LoginFormRef"
        label-width="70px"
      >
        <el-form-item label="用户名" prop="username">
          <el-input v-model="LoginForm.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="LoginForm.password"></el-input>
        </el-form-item>
         <el-form-item>
              <el-button type="primary" @click="login">点击登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      LoginForm: {},
      LoginFormRules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          {
            min: 3,
            max: 10,
            message: "长度在 3 到 10 个字符",
            trigger: "blur",
          },
        ],
        password: [
          { required: true, message: "请输入用户密码", trigger: "blur" },
          {
            min: 3,
            max: 10,
            message: "长度在 3 到 10 个字符",
            trigger: "blur",
          },
        ],
      },
    };
  },
  created() {},
  computed: {},
  methods: {
      login(){
          this.$router.push('/home')
      }
  },
};
</script>
<style lang="scss" scoped>
.login_box {
  width: 100%;
  height: 100%;
  background-color: #ccc;
  .login {
      box-sizing: border-box;
    width: 400px;
    height: 250px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    border: 1px solid #000;
    h1 {
      color: #fff;
      border-bottom: 1px solid #000;
      text-align: center;line-height: 50px;
      font-size: 25px;
    }
    .el-form{
        margin-top: 15px;
        padding: 15px;
    }
  }
}
</style>
