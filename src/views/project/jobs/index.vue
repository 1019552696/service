<template>
  <div class="jobs-container">
    <vab-query-form>
      <vab-query-form-left-panel>
        <el-button icon="el-icon-plus" type="primary" @click="handleAdd">添加</el-button>
        <el-button icon="el-icon-delete" type="danger" @click="handleDelete">删除</el-button>
      </vab-query-form-left-panel>
      <vab-query-form-right-panel>
        <el-form ref="form" :model="queryForm" :inline="true" @submit.native.prevent>
          <el-form-item>
            <el-input v-model="queryForm.object_id" placeholder="对象ID" />
          </el-form-item>
          <el-form-item>
            <el-input v-model="queryForm.status" placeholder="任务状态" />
          </el-form-item>
          <el-form-item>
            <el-input v-model="queryForm.template_id" placeholder="模板ID" />
          </el-form-item>
          <el-form-item>
            <el-input v-model="queryForm.user_id" placeholder="用户ID" />
          </el-form-item>
          <el-form-item>
            <el-button icon="el-icon-search" type="primary" native-type="submit" @click="handleQuery">查询</el-button>
          </el-form-item>
        </el-form>
      </vab-query-form-right-panel>
    </vab-query-form>
    <el-table v-loading="listLoading" :data="list" :element-loading-text="elementLoadingText" @selection-change="setSelectRows">
      <el-table-column show-overflow-tooltip type="selection"></el-table-column>
      <el-table-column show-overflow-tooltip label="序号" width="95">
        <template slot-scope="scope">{{ scope.$index + 1 }}</template>
      </el-table-column>
      <el-table-column show-overflow-tooltip prop="object_id" label="对象ID" />
      <el-table-column show-overflow-tooltip prop="status" label="任务状态" />
      <el-table-column show-overflow-tooltip prop="template_id" label="模板ID" />
      <el-table-column show-overflow-tooltip prop="update_at" label="修改时间" />
      <el-table-column show-overflow-tooltip prop="user_id" label="用户ID" />
      <el-table-column fixed="right" label="操作" width="200">
        <template v-slot="scope">
          <el-button type="text" @click="handleEdit(scope.row)">编辑
          </el-button>
          <el-button type="text" @click="handleDelete(scope.row)">删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination background :current-page="queryForm.index" :page-size="queryForm.count" :layout="layout" :total="total" @size-change="handleSizeChange" @current-change="handleCurrentChange">
    </el-pagination>
    <edit ref="edit" @fetchData="fetchData"></edit>
  </div>
</template>
<script>
import { getList, doDelete } from "@/api/jobs";
import Edit from "./components/JobsEdit";

export default {
  name: "Jobs",
  components: { Edit },
  data() {
    return {
      list: [],
      listLoading: true,
      layout: "total, sizes, prev, pager, next, jumper",
      total: 0,
      selectRows: "",
      elementLoadingText: "正在加载...",
      queryForm: {
        index: 1,
        count: 20,
        id: "",
        object_id: "",
        status: "",
        template_id: "",
        user_id: ""
      },
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    setSelectRows(val) {
      this.selectRows = val;
    },
    handleEdit(row) {
      if (row.id) {
        this.$refs["edit"].showEdit(row);
      } else {
        this.$refs["edit"].showEdit();
      }
    },
    handleDelete(row) {
      if (row.id) {
        this.$baseConfirm("你确定要删除当前项吗", null, async () => {
          const { msg } = await doDelete({ ids: row.id });
          this.$baseMessage(msg, "success");
          this.fetchData();
        });
      } else {
        if (this.selectRows.length > 0) {
          const ids = this.selectRows.map((item) => item.id).join();
          this.$baseConfirm("你确定要删除选中项吗", null, async () => {
            const { msg } = await doDelete({ ids });
            this.$baseMessage(msg, "success");
            this.fetchData();
          });
        } else {
          this.$baseMessage("未选中任何行", "error");
          return false;
        }
      }
    },
    handleAdd(){
      this.$refs["edit"].showEdit();
    },
    handleSizeChange(val) {
      this.queryForm.count = val;
      this.fetchData();
    },
    handleCurrentChange(val) {
      this.queryForm.index = val;
      this.fetchData();
    },
    queryData() {
      this.queryForm.index = 1;
      this.fetchData();
    },
    handleQuery(){
      this.queryForm.index = 1;
      this.fetchData();
    },
    async fetchData() {
      this.listLoading = true;
      const { data, total } = await getList(this.queryForm);
      this.list = data;
      this.total = total;
      setTimeout(() => {
        this.listLoading = false;
      }, 300);
    },
  },
};

</script>
