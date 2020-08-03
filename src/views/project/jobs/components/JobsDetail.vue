<template>
  <el-dialog
    title="详情"
    :visible.sync="dialogFormVisible"
    width="50%"
    @close="close"
  >
    <el-collapse v-model="activeNames" @change="handleChange">
      <el-collapse-item
        v-for="(keys, index) in list"
        :key="index"
        :title="index"
      >
        <!-- {{ keys }} -->
        <el-table :data="keys" border>
          <el-table-column
            v-for="(item, j) in keys[0]"
            :key="j"
            show-overflow-tooltip
            :prop="j"
            :label="labelObj[j]"
          >
          </el-table-column>
        </el-table>
      </el-collapse-item>
    </el-collapse>
  </el-dialog>
</template>
<script>
import { getDetail } from "@/api/jobs";
export default {
  data() {
    return {
      list: [],
      keys: [],
      dialogFormVisible: false,
      activeNames: [],
      labelObj: {
        id: "ID",
        project_id: "项目名",
        queue: "绑定队列名",
        sensitivity: "敏感度",
        service_outcome_id: "输出类型",
        spider: "绑定爬虫名",
        update_at: "修改时间",
        object_id: "对象ID",
        template_id: "模板ID",
        user_id: "用户ID",
        file_name: "原始文件名",
        file_size: "文件大小",
        full_path: "文件路径",
        line_count: "文件行数",
        expressions: "表达",
        next_task_id: "下一个任务ID",
        task_id: "任务ID",
        service_id: "服务ID",
        status: "状态",
        template_name: "模板名称",
        name: "名称",
      },
    };
  },
  methods: {
    async showDetail(row) {
      this.dialogFormVisible = true;
      const { data } = await getDetail(row);
      //具体看返回值是数组还是对象
      const res = data[0];
      //将对象每一项都转换为数组
      for (var i in res) {
        if (!Array.isArray(res[i])) {
          var arr = [];
          arr.push(res[i]);
          res[i] = arr;
        }
      }
      this.list = res;
    },
    handleChange(val) {
      // console.log(val);
    },
    close() {
      this.list = [];
    },
  },
};
</script>
