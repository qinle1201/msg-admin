<template>
  <div class="classify">
    <!-- 头部表单 -->
    <el-form
      :inline="true"
      :model="searchForm"
      ref="searchFormRef"
      label-width="90px"
    >
      <el-form-item label="文章标题">
        <el-input v-model="searchForm.name"></el-input>
      </el-form-item>
      <el-form-item label="状态：">
        <el-select v-model="searchForm.status" placeholder="请选择">
          <el-option label="0" value="ysc">已删除</el-option>
          <el-option label="1" value="wsh">未审核</el-option>
          <el-option label="2" value="shwtg">审核未通过</el-option>
          <el-option label="3" value="shtg">审核通过</el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search">查询</el-button>
        <el-button icon="el-icon-refresh" @click="resetSearchForm"
          >重置</el-button
        >
      </el-form-item>
    </el-form>

    <!-- 分类表格列表 -->
    <el-table :data="articleList" border>
      <el-table-column align="center" type="index" width="50" label="序号">
      </el-table-column>
      <el-table-column align="center" prop="title" label="文章标题">
      </el-table-column>
      <el-table-column align="center" prop="viewCount" label="浏览数">
      </el-table-column>
      <el-table-column align="center" prop="thumhup" label="点赞数">
      </el-table-column>
      <el-table-column align="center" prop="ispublic" label="是否公开">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.status == 0" type="danger">不公开</el-tag>
          <el-tag v-else type="warning">公开</el-tag>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="status" label="状态">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.status == 0" type="danger">已删除</el-tag>
          <el-tag v-else-if="scope.row.status == 1">未审核</el-tag>
          <el-tag v-else-if="scope.row.status == 2" type="warning"
            >审核未通过</el-tag
          >
          <el-tag v-else type="success">审核通过</el-tag>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="updateDate" label="最后更新时间">
      </el-table-column>
      <el-table-column label="操作" width="210px">
        <template slot-scope="scope">
          <el-button type="primary" size="mini">查看</el-button>
          <el-button v-if="scope.row.status == 1" type="success" size="mini"
            >审核</el-button
          >
          <el-button
            v-if="scope.row.status !== 0"
            type="danger"
            size="mini"
            @click="deleteArticle(scope.row.id)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination
      @size-change="articleCurrent"
      @current-change="articleSize"
      :current-page="current"
      :page-sizes="[1, 3, 5, 10]"
      :page-size="size"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    >
    </el-pagination>
  </div>
</template>
<script>
import {
  getArticleListApi,
  deleteArticleApi,
  addClassifyApi,
  searchClassifyApi,
  editClassifyApi,
} from "../../../api/blog/article";
export default {
  data() {
    return {
      // 分类列表数据
      articleList: [],
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
    };
  },
  created() {
    // 获取分类列表
    this.gitArticleList();
  },
  computed: {},
  methods: {
    // 获取分类列表
    async gitArticleList() {
      const res = await getArticleListApi(this.current, this.size);
      console.log(res);
      if (res.status !== 200) {
        this.$message.error(res.statusText);
      } else {
        this.articleList = res.data.data.records;
        this.total = res.data.data.total;
        console.log(this.articleList);
      }
    },
    // 显示第几页
    articleCurrent(newCurrent) {
      this.current = newCurrent;
      this.gitArticleList();
    },
    // 显示多少条
    articleSize(newSize) {
      this.size = newSize;
      this.gitArticleList();
    },
    // 重置搜索表单
    resetSearchForm(searchFormRef) {
      console.log("asd");
      this.$refs.searchFormRef.resetFields();
    },
    // 删除分类
    async deleteArticle(id) {
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
      const res = await deleteArticleApi(id);
      console.log(res);
      if (res.data.message == "删除成功") {
        this.$message.success("删除成功");
        this.gitArticleList();
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
