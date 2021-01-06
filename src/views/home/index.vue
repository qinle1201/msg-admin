<template>
  <div class="home">
    <el-container>
      <el-aside width="210px">
        <div class="logo">
          <img src="../../assets/logo.png" alt="" />
          <p>积云博客后台管理</p>
        </div>
        <el-menu
          router
          default-active="/home"
          class="el-menu-vertical-demo"
          background-color="#304156"
          text-color="#fff"
          active-text-color="#ffd04b"
        >
          <el-menu-item index="/home/welcome">
            <i class="el-icon-menu"></i>
            <span slot="title">首页</span>
          </el-menu-item>
          <el-submenu index="/blog">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>博客管理</span>
            </template>
            <el-menu-item index="/blog/article">
              <template>
                <i class="el-icon-location"></i>
                <span>文章管理</span>
              </template>
            </el-menu-item>
            <el-menu-item index="/blog/classify">
              <template>
                <i class="el-icon-location"></i>
                <span>分类管理</span>
              </template>
            </el-menu-item>
            <el-menu-item index="/blog/label">
              <template>
                <i class="el-icon-location"></i>
                <span>标签管理</span>
              </template>
            </el-menu-item>
          </el-submenu>
          <el-menu-item index="/home/advertising">
            <i class="el-icon-menu"></i>
            <span slot="title">广告管理</span>
          </el-menu-item>
          <el-submenu index="/system">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>系统管理</span>
            </template>
            <el-menu-item index="/system/user">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>用户管理</span>
              </template>
            </el-menu-item>
             <el-menu-item index="/system/role">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>角色管理</span>
              </template>
            </el-menu-item>
             <el-menu-item index="/system/menu">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>菜单管理</span>
              </template>
            </el-menu-item>
          </el-submenu>
          <el-menu-item index="">
            <i class="el-icon-setting"></i>
            <span slot="title">梦雪谷官网</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-container>
        <el-header>Header</el-header>
        <el-main><router-view></router-view></el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  created() {},
  computed: {},
  methods: {},
};
</script>
<style lang="scss" scoped>
.home,
.el-container {
  height: 100%;
}
.el-aside {
  background-color: #304156;
  .logo {
    background-color: #2b2f3a;
    padding: 10px;
    display: flex;
    box-sizing: border-box;
    align-items: center;
    height: 50px;
    img {
      width: 30px;
      height: 30px;
      margin-right: 5px;
    }
    p {
      font-size: 16px;
      color: #fff;
    }
  }
  .el-menu{
      border-right: none;
  }
}
.el-header {
  background-color: #ccc;
}
</style>
