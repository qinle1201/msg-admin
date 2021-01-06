<template>
  <div>
    <el-form
      :inline="true"
      :model="searchForm"
      ref="searchFormRef"
      label-width="90px"
    >
      <el-form-item label="标签名称：">
        <el-input v-model="searchForm.name"></el-input>
      </el-form-item>
      <el-form-item label="分类名称">
        <el-select v-model="searchForm.categoryName" placeholder="请选择">
          <el-option label="马超" value="machao"></el-option>
          <el-option label="张飞" value="zhangfei"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search">查询</el-button>
        <el-button icon="el-icon-refresh" @click="resetSearchForm"
          >重置</el-button
        >
        <el-button
          type="primary"
          icon="el-icon-circle-plus-outline"
          @click="addLabelDialogVisible = true"
          >新增</el-button
        >
      </el-form-item>
    </el-form>

    <!-- 标签表格列表 -->
    <el-table :data="labelList" border>
      <el-table-column align="center" type="index" width="50" label="序号"> </el-table-column>
      <el-table-column align="center" prop="name" label="标签名称"> </el-table-column>
      <el-table-column align="center" prop="categoryName" label="分类名称"> </el-table-column>
      <el-table-column align="center" label="操作">
        <template slot-scope="scope">
          <el-button
            type="success"
            size="mini"
            @click="showEditLabel(scope.row.id)"
            >编辑</el-button
          >
          <el-button
            type="danger"
            size="mini"
            @click="deleteLabel(scope.row.id)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination
      @size-change="labelCurrent"
      @current-change="labelSize"
      :current-page="current"
      :page-sizes="[1, 3, 5, 10]"
      :page-size="size"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    >
    </el-pagination>

    <!-- 添加对话框 -->
    <el-dialog
      title="添加 "
      :visible.sync="addLabelDialogVisible"
      width="40%"
      @close="addLabelDialogClose"
    >
      <el-form
        :model="addLabelForm"
        :rules="addLabelFormRules"
        ref="addLabelFormRef"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="标签名称：" prop="name">
          <el-input v-model="addLabelForm.name"></el-input>
        </el-form-item>
        <el-form-item label="分类名称" prop="categoryName">
          <el-select v-model="addLabelForm.categoryName" placeholder="请选择">
            <el-option label="马超" value="machao"></el-option>
            <el-option label="张飞" value="zhangfei"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addLabelDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addLabel">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 编辑对话框 -->
    <el-dialog
      title="编辑标签"
      :visible.sync="editLabelDialogVisible"
      width="40%"
      @close="editLabelDialogClose"
    >
      <el-form
        :model="editLabelForm"
        :rules="editLabelFormRules"
        ref="editLabelFormRef"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="标签名称" prop="name">
          <el-input v-model="editLabelForm.name"></el-input>
        </el-form-item>
        <el-form-item label="分类名称：" prop="categoryName">
          <el-select v-model="editLabelForm.categoryName" placeholder="请选择">
            <el-option label="马超" value="machao"></el-option>
            <el-option label="张飞" value="zhangfei"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editLabelDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="editLabel">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import {
  getLabelListApi,
  deleteLabelApi,
  addLabelApi,
  searchLabelApi,
  editLabelApi,
}from "../../../api/blog/label";
export default {
  data() {
    return {
      // 标签列表数据
      labelList: [],
      // 当前页数
      current: 1,
      // 当天条数
      size: 10,
      // 总条数
      total: 0,
      // 搜索表单
      searchForm: {
        name: "",
        categoryName: "",
      },
      // 添加对话框关闭
      addLabelDialogVisible: false,
      // 添加标签表单
      addLabelForm: {
        name: "",
        categoryName: "",
      },
      // 添加标签表单验证
      addLabelFormRules: {
        // 验证添加标签名称
        name: [
          { required: true, message: "请输入标签名称", trigger: "blur" },
          {
            min: 3,
            max: 10,
            message: "长度在 3 到 10 个字符",
            trigger: "blur",
          },
        ],
        // 验证添加分类名称
        categoryName: [
          { required: true, message: "请选择分类名称", trigger: "blur" },
        ],
      },
      // 编辑对话框
      editLabelDialogVisible: false,
      // 编辑标签表单
      editLabelForm: {},
      // 编辑标签表单验证
      editLabelFormRules: {
        // 验证编辑标签名称
        name: [
          { required: true, message: "请输入标签名称", trigger: "blur" },
          {
            min: 3,
            max: 10,
            message: "长度在 3 到 10 个字符",
            trigger: "blur",
          },
        ],
        // 验证编辑分类名称
        status: [
          { required: true, message: "请输入分类名称", trigger: "blur" },
        ],
      },
    };
  },
  created() {
    // 获取标签列表
    this.gitLabelList();
  },
  computed: {},
  methods: {
    // 获取标签列表
    async gitLabelList() {
      const res = await getLabelListApi(this.current, this.size);
      console.log(res);
      if (res.status !== 200) {
        this.$message.error(res.statusText);
      } else {
        this.labelList = res.data.data.records;
        this.total = res.data.data.total;
        console.log(this.labelList);
      }
    },
    // 显示第几页
    labelCurrent(newCurrent) {
      this.current = newCurrent;
      this.gitLabelList();
    },
    // 显示多少条
    labelSize(newSize) {
      this.size = newSize;
      this.gitLabelList();
    },
    // 重置搜索表单
    resetSearchForm(searchFormRef) {
      console.log("asd");
      this.$refs.searchFormRef.resetFields();
    },
    // 监听添加对话框关闭事件
    addLabelDialogClose() {
      this.$refs.addLabelFormRef.resetFields();
    },
    // 点击确定添加标签
    addLabel() {
      this.$refs.addLabelFormRef.validate(async (valid) => {
        console.log(valid);
        if (!valid) return;
        const res = await addLabelApi(this.addLabelForm);
        console.log(res);
        if (res.status !== 200) {
          this.$message.error(res.data.message);
        } else {
          this.$message.success("新增标签成功");
          this.gitLabelList();
          this.addLabelDialogVisible = false;
        }
      });
    },
    // 显示修改标签对话框
    async showEditLabel(id) {
      console.log(id);
      const res = await searchLabelApi(id);
      console.log(res);
      if (res.status !== 200) return;
      this.editLabelForm = res.data.data;
      this.editLabelDialogVisible = true;
    },
    // 监听编辑对话框关闭事件
    editLabelDialogClose() {
      this.$refs.editLabelFormRef.resetFields();
    },
    // 点击确定提交编辑标签
    editLabel() {
      this.$refs.editLabelFormRef.validate(async (valid) => {
        console.log(valid);
        if (!valid) return;
        const res = await editLabelApi(this.editLabelForm);
        console.log(res);
        if (res.status !== 200) {
          this.$message.error(res.data.message);
          this.editLabelDialogVisible = false;
        } else {
          this.$message.success("编辑标签成功");
          this.gitLabelList();
          this.editLabelDialogVisible = false;
        }
      });
    },
    // 删除标签
    async deleteLabel(id) {
      const resConfirm = await this.$confirm(
        "此操作将永久删除该商品, 是否继续?",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      ).catch((err) => err);
      console.log(resConfirm);
      if (resConfirm !== "confirm") {
        return this.$message.info("已取消了删除");
      }
      const res = await deleteLabelApi(id);
      console.log(res);
      if (res.data.message == "删除成功") {
        this.$message.success("删除成功");
        this.gitLabelList();
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.el-table {
  margin: 15px;
  margin-bottom: 15px;
}
</style>
