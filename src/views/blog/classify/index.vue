<template>
  <div class="classify">
    <!-- 头部表单 -->
    <el-form
      :inline="true"
      :model="searchForm"
      ref="searchFormRef"
      label-width="90px"
    >
      <el-form-item label="活动名称：">
        <el-input v-model="searchForm.name"></el-input>
      </el-form-item>
      <el-form-item label="状态：">
        <el-select v-model="searchForm.status" placeholder="请选择">
          <el-option label="正常" value="normal"></el-option>
          <el-option label="禁用" value="forbidden"></el-option>
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
          @click="addClassifyDialogVisible = true"
          >新增</el-button
        >
      </el-form-item>
    </el-form>

    <!-- 分类表格列表 -->
    <el-table :data="classifyList" border>
      <el-table-column align="center" type="index" width="50" label="序号"> </el-table-column>
      <el-table-column align="center" prop="name" label="分类名称"> </el-table-column>
      <el-table-column align="center" prop="sort" label="序号"> </el-table-column>
      <el-table-column align="center" prop="remark" label="备注"> </el-table-column>
      <el-table-column align="center" prop="status" label="状态">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.status == 0" type="danger">禁用</el-tag>
          <el-tag v-else type="success">正常</el-tag>
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作">
        <template slot-scope="scope">
          <el-button
            type="success"
            size="mini"
            @click="showEditClassify(scope.row.id)"
            >编辑</el-button
          >
          <el-button
            type="danger"
            size="mini"
            @click="deleteClassify(scope.row.id)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination
      @size-change="classifyCurrent"
      @current-change="classifySize"
      :current-page="current"
      :page-sizes="[1, 3, 5, 10]"
      :page-size="size"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    >
    </el-pagination>

    <!-- 添加对话框 -->
    <el-dialog
      title="编辑"
      :visible.sync="addClassifyDialogVisible"
      width="40%"
      @close="addClassifyDialogClose"
    >
      <el-form
        :model="addClassifyForm"
        :rules="addClassifyFormRules"
        ref="addClassifyFormRef"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="分类名称：" prop="name">
          <el-input v-model="addClassifyForm.name"></el-input>
        </el-form-item>
        <el-form-item label="状态：" prop="status">
          <el-radio v-model="status" label="1">正常</el-radio>
          <el-radio v-model="status" label="2">禁用</el-radio>
        </el-form-item>
        <el-form-item label="排序：" prop="sort">
          <el-input-number
            v-model="sort"
            @change="addClassifyChange"
            :min="0"
            :max="1000"
            label="描述文字"
          ></el-input-number>
        </el-form-item>
        <el-form-item label="备注：" prop="remark">
          <el-input type="textarea" v-model="addClassifyForm.remark"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addClassifyDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addClassify">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 编辑对话框 -->
    <el-dialog
      title="新增分类"
      :visible.sync="editClassifyDialogVisible"
      width="40%"
      @close="editClassifyDialogClose"
    >
      <el-form
        :model="editClassifyForm"
        :rules="editClassifyFormRules"
        ref="editClassifyFormRef"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="分类名称：" prop="name">
          <el-input v-model="editClassifyForm.name"></el-input>
        </el-form-item>
        <el-form-item label="状态：" prop="status">
          <el-radio v-model="editClassifyForm.status" label="1">正常</el-radio>
          <el-radio v-model="editClassifyForm.status" label="2">禁用</el-radio>
        </el-form-item>
        <el-form-item label="排序：" prop="sort">
          <el-input-number
            v-model="editClassifyForm.sort"
            @change="editClassifyChange"
            :min="0"
            :max="1000"
            label="描述文字"
          ></el-input-number>
        </el-form-item>
        <el-form-item label="备注：" prop="remark">
          <el-input
            type="textarea"
            v-model="editClassifyForm.remark"
          ></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editClassifyDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="editClassify">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import {
  getClassifyListApi,
  deleteClassifyApi,
  addClassifyApi,
  searchClassifyApi,
  editClassifyApi
} from "../../../api/blog/classify";
export default {
  data() {
    return {
      // 分类列表数据
      classifyList: [],
      // 当前页数
      current: 1,
      // 当天条数
      size: 10,
      // 总条数
      total: 0,
      // 搜索表单
      searchForm: {
        name: "",
        status: "",
      },
      // 添加对话框关闭
      addClassifyDialogVisible: false,
      // 添加分类表单
      addClassifyForm: {
        name: "",
        status: 1,
        sort: "",
        remark: "",
      },
      // 添加分类表单验证
      addClassifyFormRules: {
        // 验证添加分类名称
        name: [
          { required: true, message: "请输入分类名称", trigger: "blur" },
          { min: 3, max: 10, message: "长度在 3 到 10 个字符", trigger: "blur" },
        ],
        // 验证添加分类状态
        status: [
          { required: true, message: "请输入分类状态", trigger: "blur" },
        ],
        // 验证添加分类排序
        sort: [{ required: true, message: "请输入分类排序/", trigger: "blur" }],
      },
      // 添加分类排序值
      sort: "",
      // 添加分类状态
      status: "",
      // 编辑对话框
      editClassifyDialogVisible: false,
      // 编辑分类表单
      editClassifyForm: {
        // name: "",
        // status: 1,
        // sort: "",
        // remark: "",
      },
      // 编辑分类表单验证
      editClassifyFormRules: {
        // 验证添加分类名称
        name: [
          { required: true, message: "请输入分类名称", trigger: "blur" },
          { min: 3, max: 10, message: "长度在 3 到 10 个字符", trigger: "blur" },
        ],
        // 验证添加分类状态
        status: [
          { required: true, message: "请输入分类状态", trigger: "blur" },
        ],
        // 验证添加分类排序
        sort: [{ required: true, message: "请输入分类排序/", trigger: "blur" }],
      },
    };
  },
  created() {
    // 获取分类列表
    this.gitClassifyList();
  },
  computed: {},
  methods: {
    // 获取分类列表
    async gitClassifyList() {
      const res = await getClassifyListApi(this.current, this.size);
      console.log(res);
      if (res.status !== 200) {
        this.$message.error(res.statusText);
      } else {
        this.classifyList = res.data.data.records;
        this.total = res.data.data.total;
        console.log(this.classifyList);
      }
    },
    // 显示第几页
    classifyCurrent(newCurrent) {
      this.current = newCurrent;
      this.gitClassifyList();
    },
    // 显示多少条
    classifySize(newSize) {
      this.size = newSize;
      this.gitClassifyList();
    },
    // 重置搜索表单
    resetSearchForm(searchFormRef) {
      console.log("asd");
      this.$refs.searchFormRef.resetFields();
    },
    // 监听添加对话框关闭事件
    addClassifyDialogClose() {
      this.$refs.addClassifyFormRef.resetFields();
    },
    // 点击确定添加分类
    addClassify() {
      this.$refs.addClassifyFormRef.validate(async (valid) => {
        console.log(valid);
        if (!valid) return;
        const res = await addClassifyApi(this.addClassifyForm);
        console.log(res);
        if (res.status !== 200) {
          this.$message.error(res.data.message);
        } else {
          this.$message.success("新增分类成功");
          this.gitClassifyList();
          this.addClassifyDialogVisible = false;
        }
      });
    },
    // 监听添加对话框排序
    addClassifyChange(newSort) {
      this.addClassifyForm.sort = newSort;
      console.log(newSort);
    },
    // 显示修改分类对话框
    async showEditClassify(id) {
      console.log(id);
      const res = await searchClassifyApi(id);
      console.log(res);
      if (res.status !== 200) return;
      this.editClassifyForm = res.data.data;
      this.editClassifyDialogVisible = true;
    },
    // 监听编辑对话框关闭事件
    editClassifyDialogClose() {
      this.$refs.editClassifyFormRef.resetFields();
    },
    // 监听添加对话框排序
    editClassifyChange(newSort) {
      this.editClassifyForm.sort = newSort;
      console.log(newSort);
    },
    // 点击确定提交编辑分类
    editClassify() {
      this.$refs.editClassifyFormRef.validate(async (valid) => {
        console.log(valid);
        if (!valid) return;
        const res = await editClassifyApi(this.editClassifyForm);
        console.log(res);
        if (res.status !== 200) {
          this.$message.error(res.data.message);
          this.editClassifyDialogVisible = false;
        } else {
          this.$message.success("编辑分类成功");
          this.gitClassifyList();
          this.editClassifyDialogVisible = false;
        }
      });
    },
    // 删除分类
    async deleteClassify(id) {
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
      const res = await deleteClassifyApi(id);
      console.log(res);
      if (res.data.message == "删除成功") {
        this.$message.success("删除成功");
        this.gitClassifyList();
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
