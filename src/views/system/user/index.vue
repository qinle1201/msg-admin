<template>
  <div>
    <!-- 头部表单 -->
    <el-form
      :inline="true"
      :model="userSearchForm"
      ref="userSearchFormRef"
      label-width="90px"
    >
      <el-form-item label="用户管理：">
        <el-input size="mini" v-model="userSearchForm.username"></el-input>
      </el-form-item>
      <el-form-item label="手机号：">
        <el-input size="mini" v-model="userSearchForm.mobile"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" @click="searchUser"
          >查询</el-button
        >
        <el-button icon="el-icon-refresh" @click="resetUserSearchForm">重置</el-button>
        <el-button
          type="primary"
          icon="el-icon-circle-plus-outline"
          @click="addUserDialog = true"
          >新增</el-button
        >
      </el-form-item>
    </el-form>

    <!-- 用户列表 -->
    <el-table border stripe :data="userList" style="width: 100%">
      <el-table-column align="center" type="index" label="序号" width="50px">
      </el-table-column>
      <el-table-column align="center" prop="username" label="用户名"> </el-table-column>
      <el-table-column align="center" prop="nickName" label="昵称"> </el-table-column>
      <el-table-column align="center" prop="mobile" label="手机号"> </el-table-column>
      <el-table-column align="center" prop="email" label="邮箱"> </el-table-column>
      <el-table-column align="center" prop="isAccountNonExpired" label="账号过期">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.isAccountNonExpired == 0" type="danger">过期</el-tag>
          <el-tag v-else type="success">正常</el-tag>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="isAccountNonLocked" label="账号锁定">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.isAccountNonLocked == 0" type="danger">锁定</el-tag>
          <el-tag v-else type="success">正常</el-tag>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="isCredentialsNonExpired" label="密码过期">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.isAccountNonLocked == 0" type="danger">过期</el-tag>
          <el-tag v-else type="success">正常</el-tag>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="isEnabled" label="是否可用">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.isAccountNonLocked == 0" type="danger">已删除</el-tag>
          <el-tag v-else type="success">可用</el-tag>
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作" width="325px">
        <template slot-scope="scope">
          <el-button
            v-if="scope.row.isAccountNonLocked !== 0"
            size="mini"
            type="success"
            @click="showEditUserDialog(scope.row.id)"
            >编辑</el-button
          >
          <el-button
            v-if="scope.row.isAccountNonLocked !== 0"
            size="mini"
            type="danger"
            @click="deleteUser(scope.row.id)"
            >删除</el-button
          >
          <el-button v-if="scope.row.isAccountNonLocked !== 0" size="mini" type="primary"
            >设置角色</el-button
          >
          <el-button
            v-if="scope.row.isAccountNonLocked !== 0"
            size="mini"
            type="primary"
            @click="showEditPassDialog(scope.row.id)"
            >密码修改</el-button
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

    <!-- 添加用户对话框 -->
    <el-dialog
      title="新增——默认密码与用户密码一致"
      :visible.sync="addUserDialog"
      width="40%"
      @close="addUserDialogClose"
    >
      <el-form
        :model="addUserForm"
        :rules="addUserFormRules"
        ref="addUserFormRef"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="用户名：" prop="username">
          <el-input v-model="addUserForm.username"></el-input>
        </el-form-item>
        <el-form-item label="昵称：" prop="nickName">
          <el-input v-model="addUserForm.nickName"></el-input>
        </el-form-item>
        <el-form-item label="手机号：" prop="mobile">
          <el-input v-model="addUserForm.mobile"></el-input>
        </el-form-item>
        <el-form-item label="邮箱：" prop="email">
          <el-input v-model="addUserForm.email"></el-input>
        </el-form-item>
        <el-form-item label="账号过期：" prop="isAccountNonExpired">
          <el-radio-group v-model="addUserForm.isAccountNonExpired" size="medium">
            <el-radio border :label="0" :value="0">未过期</el-radio>
            <el-radio border :label="1" :value="1">已过期</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="密码过期：" prop="isCredentialsNonExpired">
          <el-radio-group v-model="addUserForm.isCredentialsNonExpired" size="medium">
            <el-radio border :label="0">未过期</el-radio>
            <el-radio border :label="1">已过期</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="账号锁定：" prop="isAccountNonLocked">
          <el-radio-group v-model="addUserForm.isAccountNonLocked" size="medium">
            <el-radio border :label="0">未锁定</el-radio>
            <el-radio border :label="1">已锁定</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addUserDialog = false">取 消</el-button>
        <el-button type="primary" @click="addUser">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 编辑用户对话框 -->
    <el-dialog
      title="编辑"
      :visible.sync="editUserDialog"
      width="50%"
      @close="editUserDialogClose"
    >
      <el-form
        :model="editUserForm"
        :rules="editUserFormRules"
        ref="editUserFormRef"
        label-width="80px"
        class="demo-ruleForm"
      >
        <el-form-item label="用户名：" prop="username">
          <el-input v-model="editUserForm.username"></el-input>
        </el-form-item>
        <el-form-item label="昵称：" prop="nickName">
          <el-input v-model="editUserForm.nickName"></el-input>
        </el-form-item>
        <el-form-item label="手机号：" prop="mobile">
          <el-input v-model="editUserForm.mobile"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="editUserForm.email"></el-input>
        </el-form-item>
        <el-form-item label="账号过期" prop="isAccountNonExpired">
          <el-radio-group v-model="editUserForm.isAccountNonExpired" size="medium">
            <el-radio border :label="0">未过期</el-radio>
            <el-radio border :label="1">已过期</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="密码过期" prop="isCredentialsNonExpired">
          <el-radio-group v-model="editUserForm.isCredentialsNonExpired" size="medium">
            <el-radio border :label="0">未过期</el-radio>
            <el-radio border :label="1">已过期</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="账号锁定" prop="isAccountNonLocked">
          <el-radio-group v-model="editUserForm.isAccountNonLocked" size="medium">
            <el-radio border :label="0">未锁定</el-radio>
            <el-radio border :label="1">已锁定</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editUserDialog = false">取 消</el-button>
        <el-button type="primary" @click="editUser">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 修改密码对话框 -->
    <el-dialog
      title="提示"
      :visible.sync="editPassDialog"
      width="30%"
      @close="editPassDialogClose"
    >
      <el-form
        :model="editPassForm"
        :rules="editPassFormRules"
        ref="editPassFormRef"
        label-width="80px"
      >
        <el-form-item label="密码" prop="pass">
          <el-input
            type="password"
            v-model="editPassForm.pass"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="pass">
          <el-input
            type="password"
            v-model="editPassForm.pass"
            autocomplete="off"
          ></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer">
        <el-button @click="editPassDialog = false">取 消</el-button>
        <el-button type="primary" @click="editPass">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import {
  getUserListApi,
  deleteUserApi,
  addUserApi,
  getUserIdApi,
  editUserApi,
} from "../../../api/system/user";
export default {
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.ruleForm.checkPass !== "") {
          this.$refs.ruleForm.validateField("checkPass");
        }
        callback();
      }
    };
    return {
      userList: [],
      total: 0,
      current: 1,
      size: 20,

      //  用户搜索表单
      userSearchForm: {
        username: "",
        mobile: "",
      },
      // 控制添加用户对话框显示于隐藏
      addUserDialog: false,
      // 添加用户表单
      addUserForm: {
        username: "",
        nickName: "",
        mobile: "",
        email: "",
        isAccountNonExpired: "",
        isCredentialsNonExpired: "",
        isAccountNonLocked: "",
      },
      // 添加用户表单验证
      addUserFormRules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          {
            min: 3,
            max: 15,
            message: "长度在 3 到 15 个字符",
            trigger: "blur",
          },
        ],
        nickName: [
          { required: true, message: "请输入昵称", trigger: "blur" },
          {
            min: 3,
            max: 15,
            message: "长度在 3 到 15 个字符",
            trigger: "blur",
          },
        ],
        mobile: [
          { required: true, message: "请输入手机号", trigger: "blur" },
          {
            min: 11,
            max: 11,
            message: "长度在 11 到 11 个字符",
            trigger: "blur",
          },
        ],
        isAccountNonExpired: [
          { required: true, message: "请选择账号是否过期", trigger: "change" },
        ],
        isCredentialsNonExpired: [
          { required: true, message: "请选择密码是否过期", trigger: "change" },
        ],
        isAccountNonLocked: [
          { required: true, message: "请选择账号是否锁定", trigger: "change" },
        ],
      },

      // 控制编辑用户对话框显示于隐藏
      editUserDialog: false,
      // 编辑用户表单
      editUserForm: {},
      // 编辑用户表单验证
      editUserFormRules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          {
            min: 3,
            max: 15,
            message: "长度在 3 到 15 个字符",
            trigger: "blur",
          },
        ],
        nickName: [
          { required: true, message: "请输入昵称", trigger: "blur" },
          {
            min: 3,
            max: 15,
            message: "长度在 3 到 15 个字符",
            trigger: "blur",
          },
        ],
        mobile: [
          { required: true, message: "请输入手机号", trigger: "blur" },
          {
            min: 11,
            max: 11,
            message: "长度在 11 到 11 个字符",
            trigger: "blur",
          },
        ],
        isAccountNonExpired: [
          { required: true, message: "请选择账号是否过期", trigger: "change" },
        ],
        isCredentialsNonExpired: [
          { required: true, message: "请选择密码是否过期", trigger: "change" },
        ],
        isAccountNonLocked: [
          { required: true, message: "请选择账号是否锁定", trigger: "change" },
        ],
      },
      // 修改密码表单
      editPassForm: {},
      // 修改密码表单验证
      editPassFormRules: {
        pass: [{ validator: validatePass, trigger: "blur" }],
      },
      // 监听修改密码对话框打开与关闭
      editPassDialog: false,
    };
  },
  created() {
    this.getUserList();
  },
  computed: {},
  methods: {
    async getUserList() {
      const { data: res } = await getUserListApi(this.current, this.size);
      console.log(res);
      if (res.code !== 20000) {
        return this.$message.error("获取用户列表失败");
      } else {
        this.userList = res.data.records;
        this.total = res.data.total;
      }
    },
    // 条数
    handleSizeChange(newSize) {
      this.size = newSize;
      this.getUserList();
    },
    // 当前页数
    handleCurrentChange(newCurrent) {
      this.current = newCurrent;
      this.getUserList();
    },
    //   点击重置，重置用户搜索表单
    resetUserSearchForm() {
      this.$refs.userSearchFormRef.resetFields();
    },
    // 搜索用户
    async searchUser() {
      const res = await getUserListApi(this.userSearchForm);
      console.log(res);
      this.getUserList();
    },

    // 删除用户
    async deleteUser(id) {
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
      if (resconfirm !== "confirm") return;
      const { data: res } = await deleteUserApi(id);
      console.log(res);
      if (res.code !== 20000) {
        this.$message.error("删除用户失败");
      } else {
        this.$message.success("删除用户成功");
        this.getUserList();
      }
    },
    // 监听添加用户表单重置
    addUserDialogClose() {
      this.$refs.addUserFormRef.resetFields();
    },
    // 添加用户
    addUser() {
      this.$refs.addUserFormRef.validate(async (valid) => {
        console.log(valid);
        if (!valid) return;
        console.log(this.addUserForm);
        const { data: res } = await addUserApi(this.addUserForm);
        console.log(res);
        if (res.code !== 20000) {
          this.$message.error("新增失败");
        } else {
          this.$message.success("新增成功");
          this.getUserList();
          this.addUserDialog = false;
        }
      });
    },
    // 监听添加用户表单重置
    editUserDialogClose() {
      this.$refs.editUserFormRef.resetFields();
    },
    // 显示编辑对话框
    async showEditUserDialog(id) {
      console.log(id);
      const { data: res } = await getUserIdApi(id);
      console.log(res);
      if (res.code !== 20000) {
        this.$message.error("查询用户信息失败");
      } else {
        this.$message.success("查询用户信息成功");
        this.editUserForm = res.data;
        console.log(this.editUserForm);
      }
      this.editUserDialog = true;
    },
    // 点击确定修改用户信息
    editUser() {
      this.$refs.editUserFormRef.validate(async (valid) => {
        console.log(valid);
        if (!valid) return;
        console.log(this.editUserForm);
        const { data: res } = await editUserApi(this.addUserForm);
        console.log(res);
        if (res.code !== 20000) {
          this.$message.error("修改失败失败");
        } else {
          this.$message.success("修改成功");
          this.getUserList();
          this.editUserDialog = false;
        }
      });
    },
    // 显示修改密码对话框
    showEditPassDialog(id) {
      console.log(id);
      this.editPassDialog = true;
    },
    // 点击确定修改密码
    editPass() {
      this.editPassDialog = false;
    },
    // 监听修改密码表单重置
    editPassDialogClose() {
      this.$refs.editPassFormRef.resetFields();
    },
  },
};
</script>
<style lang="scss" scoped></style>
