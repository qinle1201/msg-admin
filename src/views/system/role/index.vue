<template>
  <div>
    <!-- 头部表单 -->
    <el-form
      :inline="true"
      :model="SearchRoleForm"
      ref="SearchRoleFormRef"
      label-width="90px"
    >
      <el-form-item label="角色名称">
        <el-input size="mini" v-model="SearchRoleForm.roleName"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button
          size="mini"
          type="primary"
          icon="el-icon-search"
          @click="searchRole"
          >查询</el-button
        >
        <el-button
          size="mini"
          icon="el-icon-refresh"
          @click="resetEditSearchForm"
          >重置</el-button
        >
        <el-button
          size="mini"
          type="primary"
          icon="el-icon-circle-plus-outline"
          @click="addRoleDialog = true"
          >新增</el-button
        >
      </el-form-item>
    </el-form>
    <!-- 角色列表 -->
    <el-table border :data="roleList" style="width: 100%">
      <el-table-column type="selection" width="55"> </el-table-column>
      <el-table-column type="index" label="序号" width="55"> </el-table-column>
      <el-table-column prop="name" label="角色名称"> </el-table-column>
      <el-table-column prop="remark" label="备注"> </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" type="primary">分配权限</el-button
          ><el-button
            size="mini"
            type="success"
            @click="showEditRoleDialog(scope.row.id)"
            >编辑</el-button
          ><el-button
            size="mini"
            type="danger"
            @click="deleteRole(scope.row.id)"
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

    <!-- 新增角色对话框 -->
    <el-dialog
      title="新增"
      :visible.sync="addRoleDialog"
      width="30%"
      @close="addRoleDialogClose"
    >
      <el-form
        :model="addRoleForm"
        :rules="addRoleFormRules"
        ref="addRoleFormRef"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="角色名称：" prop="name">
          <el-input v-model="addRoleForm.name"></el-input>
        </el-form-item>
        <el-form-item label="备注：" prop="remark">
          <el-input v-model="addRoleForm.remark"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addRoleDialog = false">取 消</el-button>
        <el-button type="primary" @click="addRole">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 编辑角色对话框 -->
    <el-dialog
      title="编辑"
      :visible.sync="editRoleDialog"
      width="30%"
      @close="editRoleDialogClose"
    >
      <el-form
        :model="editRoleForm"
        :rules="editRoleFormRules"
        ref="editRoleFormRef"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="角色名称：" prop="name">
          <el-input v-model="editRoleForm.name"></el-input>
        </el-form-item>
        <el-form-item label="备注：" prop="remark">
          <el-input v-model="editRoleForm.remark"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editRoleDialog = false">取 消</el-button>
        <el-button type="primary" @click="editRole">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import {
  getRoleListApi,
  deleteRoleApi,
  addRoleApi,
  getRoleIdApi,
  editRoleApi
} from "../../../api/system/role";
export default {
  data() {
    return {
      // 角色列表
      roleList: [],
      //   总条数
      total: 0,
      //   当前页数
      current: 1,
      // 每页条数
      size: 20,
      // 搜索表单
      SearchRoleForm: {
        roleName: "",
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
    this.getRoleList();
  },
  computed: {},
  methods: {
    //   获取角色列表
    async getRoleList() {
      const { data: res } = await getRoleListApi(this.current, this.size);
      console.log(res);
      if (res.code !== 20000) {
        return this.$message.error("获取角色列表失败");
      } else {
        this.roleList = res.data.records;
        this.total = res.data.total;
      }
    },
    // 条数
    handleSizeChange(newSize) {
      this.size = newSize;
      this.getRoleList();
    },
    // 当前页数
    handleCurrentChange(newCurrent) {
      this.current = newCurrent;
      this.getRoleList();
    },
    // 删除用户
    async deleteRole(id) {
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
      const { data: res } = await deleteRoleApi(id);
      console.log(res);
      if (res.code !== 20000) {
        this.$message.error("删除用户失败");
      } else {
        this.$message.success("删除用户成功");
        this.getRoleList();
      }
    },
    async searchRole() {
      const { data: res } = await getRoleListApi(this.SearchRoleForm);
      console.log(res);
      if (res.code !== 20000) {
        this.$message.error("查询失败");
      } else {
        this.$message.success("查询成功");
        this.getRoleList();
      }
    },
    // 重置搜索表单
    resetEditSearchForm() {
      this.$refs.SearchRoleFormRef.resetFields();
    },
    // 重置新增表单
    addRoleDialogClose() {
      this.$refs.addRoleFormRef.resetFields();
    },
    // 点击确定添加角色
    addRole() {
      this.$refs.addRoleFormRef.validate(async (valid) => {
        console.log(valid);
        if (!valid) return;
        const { data: res } = await addRoleApi(this.addRoleForm);
        console.log(res);
        if (res.code !== 20000) {
          return this.$message.error("新增失败");
        } else {
          this.$message.success("新增成功");
          this.addRoleDialog = false;
          this.getRoleList();
        }
      });
    },
    // 显示编辑弹框并根据id查询数据
    async showEditRoleDialog(id) {
      this.editRoleDialog = true;
      const { data: res } = await getRoleIdApi(id);
      console.log(res);
      if (res.code !== 20000) {
        this.$message.error("查询角色失败");
      } else {
        this.$message.success("查询角色成功");
        this.editRoleForm = res.data;
      }
    },
    // 重置编辑表单
    editRoleDialogClose() {
      this.$refs.editRoleFormRef.resetFields();
    },
    // 点击确定，修改角色
    editRole() {
      this.$refs.editRoleFormRef.validate(async (valid) => {
        if (!valid) return;
        const { data: res } = await editRoleApi(this.editRoleForm);
        console.log(res);
      if(res.code!==20000){return this.$message.error('修改角色失败')}else{
        this.$message.success('修改角色成功')
        this.getRoleList()
      }
      });
      this.editRoleDialog = false;
    },
  },
};
</script>
<style lang="scss" scoped>
</style>
