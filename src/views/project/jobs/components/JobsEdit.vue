<template>
  <el-dialog :title="title" :visible.sync="dialogFormVisible" width="500px" @close="close">
    <el-form ref="form" :model="form" :rules="rules" label-width="80px">
      <el-form-item label="对象ID" prop="object_id">
        <el-input v-model.trim="form.object_id" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="任务状态" prop="status">
        <el-input v-model.trim="form.status" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="模板ID" prop="template_id">
        <el-input v-model.trim="form.template_id" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="用户ID" prop="user_id">
        <el-input v-model.trim="form.user_id" autocomplete="off"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="close">取 消 </el-button>
      <el-button type="primary" @click="save">确 定</el-button>
    </div>
  </el-dialog>
</template>
<script>
import { doEdit } from "@/api/jobs";

export default {
  name: "JobsEdit",
  data() {
    return {
      form: {
        id: "",
        object_id: "",
        status: "",
        template_id: "",
        user_id: ""
      },
      rules: {
        id: [{ required: true, trigger: "blur", message: "请输入id" }],
      },
      title: "",
      dialogFormVisible: false,
    };
  },
  created() {},
  methods: {
    showEdit(row) {
      if (!row) {
        this.title = "添加";
      } else {
        this.title = "编辑";
        this.form = Object.assign({}, row);
      }
      this.dialogFormVisible = true;
    },
    close() {
      this.$refs["form"].resetFields();
      this.form = this.$options.data().form;
      this.dialogFormVisible = false;
    },
    save() {
      this.$refs["form"].validate(async (valid) => {
        if (valid) {
          const { msg } = await doEdit(this.form);
          this.$baseMessage(msg, "success");
          this.$emit("fetchData");
          this.close();
        } else {
          return false;
        }
      });
    },
  },
};

</script>
