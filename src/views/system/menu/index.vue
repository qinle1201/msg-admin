<template>
  <div>
    <!-- 头部表单 -->
    <el-form
      :inline="true"
      :model="SearchMenuForm"
      ref="SearchMenuFormRef"
      label-width="90px"
    >
      <el-form-item label="菜单名称">
        <el-input size="mini" v-model="SearchMenuForm.menuName"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button size="mini" type="primary" icon="el-icon-search"
        @click="searchMenu"
          >查询</el-button
        >
        <el-button
          size="mini"
          icon="el-icon-refresh"
          @click="resetEditSearchForm"
          >重置</el-button
        >
        <el-button size="mini" type="primary" icon="el-icon-circle-plus-outline"
          >新增</el-button
        >
      </el-form-item>
    </el-form>
    <!-- 菜单列表 -->
    <el-table border :data="menuList" style="width: 100%">
      <el-table-column align="center" type="index" label="序号" width="55">
      </el-table-column>
      <el-table-column align="center" type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item label="name">
              <span>{{ props.row.name }}</span>
            </el-form-item>
             <el-form-item label="商品名称">
              <span>{{ props.row.name }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="name" label="名称">
      </el-table-column>
      <el-table-column align="center" prop="url" label="请求地址">
      </el-table-column>
      <el-table-column align="center" prop="code" label="权限标识">
      </el-table-column>
      <el-table-column align="center" prop="type" label="类型">
        <template slot-scope="scope">
          <span v-if="scope.row.type == 1">目录</span>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="icon" label="图标">
        <template slot-scope="scope">
          <i :class="scope.row.icon"></i>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="sort" label="排序">
      </el-table-column>
      <el-table-column align="center" label="操作" width="210px">
        <template slot-scope="scope">
          <el-button size="mini" type="primary">新增</el-button
          ><el-button
            size="mini"
            type="success"
            @click="showEditRoleDialog(scope.row.id)"
            >编辑</el-button
          ><el-button
            size="mini"
            type="danger"
            @click="deleteMenu(scope.row.id)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页 -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="current"
      :page-sizes="[3, 5, 10, 20]"
      :page-size="size"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    >
    </el-pagination>
  </div>
</template>
<script>
import { getMenuListApi, deleteMenuApi } from "../../../api/system/menu";
export default {
  data() {
    return {
      // 角色列表
      menuList: [],
      //   总条数
      total: 0,
      //   当前页数
      current: 1,
      // 每页条数
      size: 20,
      // 搜索表单
      SearchMenuForm: {
        menuName: "",
      },
      //   监听添加对话框打开关闭
      addRoleDialog: false,
      //   添加表单
      addRoleForm: {},
      //   添加表单校验
      addRoleFormRules: {
        name: [
          { required: true, message: "请输入角色名称", trigger: "blur" },
          {
            min: 1,
            max: 10,
            message: "长度在 1 到 10 个字符",
            trigger: "blur",
          },
        ],
      },
      // 监听修改对话框的显示与隐藏
      editRoleDialog: false,
      // 修改表单
      editRoleForm: {},
      // 修改表单验证
      editRoleFormRules: {
        name: [
          { required: true, message: "请输入角色名称", trigger: "blur" },
          {
            min: 1,
            max: 10,
            message: "长度在 1 到 10 个字符",
            trigger: "blur",
          },
        ],
      },
    };
  },
  created() {
    //   获取角色列表
    this.getMenuList();
  },
  computed: {},
  methods: {
    //   获取角色列表
    async getMenuList() {
      const { data: res } = await getMenuListApi(this.current, this.size);
      console.log(res);
      if (res.code !== 20000) {
        return this.$message.error("获取菜单列表失败");
      } else {
        this.$message.success("获取菜单列表成功");
        this.menuList = res.data;
        this.total = res.data.total;
      }
    },
    // 条数
    handleSizeChange(newSize) {
      this.size = newSize;
      this.getMenuList();
    },
    // 当前页数
    handleCurrentChange(newCurrent) {
      this.current = newCurrent;
      this.getMenuList();
    },
    // 删除用户
    async deleteMenu(id) {
      console.log(id);
      const resconfirm = await this.$confirm(
        "此操作将永久删除该文件, 是否继续?",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      ).catch((err) => err);
      console.log(resconfirm);
      if (resconfirm !== "confirm") return this.$message.info("取消了删除");
      const { data: res } = await deleteMenuApi(id);
      console.log(res);
      if (res.code !== 20000) {
        this.$message.error("删除用户失败");
      } else {
        this.$message.success("删除用户成功");
        this.getMenuList();
      }
    },
    // 搜索菜单
    async searchMenu() {
      const { data: res } = await getMenuListApi(this.SearchMenuForm);
      console.log(res);
      if (res.code !== 20000) {
        this.$message.error("查询失败");
      } else {
        this.$message.success("查询成功");
        this.getMenuList();
      }
    },
    // 重置搜索表单
    resetEditSearchForm() {
      this.$refs.SearchMenuFormRef.resetFields();
    },
    // // 重置新增表单
    // addRoleDialogClose() {
    //   this.$refs.addRoleFormRef.resetFields();
    // },
    // // 点击确定添加角色
    // addRole() {
    //   this.$refs.addRoleFormRef.validate(async (valid) => {
    //     console.log(valid);
    //     if (!valid) return;
    //     const { data: res } = await addRoleApi(this.addRoleForm);
    //     console.log(res);
    //     if (res.code !== 20000) {
    //       return this.$message.error("新增失败");
    //     } else {
    //       this.$message.success("新增成功");
    //       this.addRoleDialog = false;
    //       this.getRoleList();
    //     }
    //   });
    // },
    // // 显示编辑弹框并根据id查询数据
    // async showEditRoleDialog(id) {
    //   this.editRoleDialog = true;
    //   const { data: res } = await getRoleIdApi(id);
    //   console.log(res);
    //   if (res.code !== 20000) {
    //     this.$message.error("查询角色失败");
    //   } else {
    //     this.$message.success("查询角色成功");
    //     this.editRoleForm = res.data;
    //   }
    // },
    // // 重置编辑表单
    // editRoleDialogClose() {
    //   this.$refs.editRoleFormRef.resetFields();
    // },
    // // 点击确定，修改角色
    // editRole() {
    //   this.$refs.editRoleFormRef.validate(async (valid) => {
    //     if (!valid) return;
    //     const { data: res } = await editUserApi(this.editRoleForm);
    //     console.log(res);
    //     if (res.code !== 20000) {
    //       return this.$message.error("修改角色失败");
    //     } else {
    //       this.$message.success("修改角色成功");
    //       this.getRoleList();
    //     }
    //   });
    //   this.editRoleDialog = false;
    // },
  },
};
</script>
<style lang="scss" scoped>
</style>
