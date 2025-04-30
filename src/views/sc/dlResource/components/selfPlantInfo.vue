<template>
  <div class="app-container">
    <el-table v-loading="loading" :data="selfPlantList" @selection-change="handleSelectionChange">
      <el-table-column label="序号" type="index" width="55" align="center" />
      <el-table-column label="主键ID" min-width="80" align="center" prop="id" />
      <el-table-column label="所属用户ID" min-width="100" align="center" prop="userId" />
      <el-table-column label="自备电厂名称" min-width="100" align="center" prop="plantName" />
      <el-table-column label="资产编号" min-width="80" align="center" prop="assetNo" />
      <el-table-column label="所属区域" min-width="80" align="center" prop="area" />
      <el-table-column label="电源类型" min-width="80" align="center" prop="powerType">
        <template slot-scope="scope">
          <dict-tag :options="dict.type.power_source_type" :value="scope.row.powerType" />
        </template>
      </el-table-column>
      <el-table-column label="装机容量" min-width="80" align="center" prop="capacity" />
      <el-table-column label="最大可出力" min-width="90" align="center" prop="maxOutput" />
      <el-table-column label="并网电压等级" min-width="100" align="center" prop="gridVoltage" />
      <el-table-column label="发电类型" min-width="80" align="center" prop="generationType">
        <template slot-scope="scope">
          <dict-tag :options="dict.type.generation_type" :value="scope.row.generationType" />
        </template>
      </el-table-column>
      <el-table-column label="所属回路ID" min-width="100" align="center" prop="circuitId" />
      <el-table-column label="是否有控制系统" min-width="120" align="center" prop="hasControl">
        <template slot-scope="scope">
          <dict-tag :options="dict.type.sys_yes_no" :value="scope.row.hasControl" />
        </template>
      </el-table-column>
      <el-table-column label="控制系统厂家及版本号" min-width="150" align="center" prop="controlSystem" />
      <el-table-column label="调节时段" min-width="80" align="center" prop="adjustPeriod">
        <template slot-scope="scope">
          <dict-tag :options="dict.type.adjustment_period" :value="scope.row.adjustPeriod" />
        </template>
      </el-table-column>
      <el-table-column label="提前通知执行时间" min-width="130" align="center" prop="noticeTime">
        <template slot-scope="scope">
          <dict-tag :options="dict.type.advance_notice_time" :value="scope.row.noticeTime" />
        </template>
      </el-table-column>
      <el-table-column label="备注信息" min-width="80" align="center" prop="remark" />
      <!-- <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button size="mini" type="text" icon="el-icon-edit" @click="handleUpdate(scope.row)"
            v-hasPermi="['sc:selfPlant:edit']">修改</el-button>
          <el-button size="mini" type="text" icon="el-icon-delete" @click="handleDelete(scope.row)"
            v-hasPermi="['sc:selfPlant:remove']">删除</el-button>
        </template>
      </el-table-column> -->
    </el-table>

    <pagination v-show="total > 0" :total="total" :page.sync="queryParams.pageNum" :limit.sync="queryParams.pageSize"
      @pagination="getList" />
  </div>
</template>

<script>
import { listSelfPlant, getSelfPlant, delSelfPlant, addSelfPlant, updateSelfPlant } from "@/api/sc/selfPlant";

export default {
  name: "SelfPlantInfo",
  dicts: ['advance_notice_time', 'adjustment_period', 'sys_yes_no', 'power_source_type', 'generation_type'],
  data() {
    return {
      // 遮罩层
      loading: true,
      // 选中数组
      ids: [],
      // 非单个禁用
      single: true,
      // 非多个禁用
      multiple: true,
      // 显示搜索条件
      showSearch: true,
      // 总条数
      total: 0,
      // 自备电厂表格数据
      selfPlantList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        userId: null,
        plantName: null,
        assetNo: null,
        area: null,
        powerType: null,
        capacity: null,
        maxOutput: null,
        gridVoltage: null,
        generationType: null,
        circuitId: null,
        hasControl: null,
        controlSystem: null,
        adjustPeriod: null,
        noticeTime: null,
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
      }
    };
  },
  created() {
    this.getList();
  },
  methods: {
    /** 查询自备电厂列表 */
    getList() {
      this.loading = true;
      listSelfPlant(this.queryParams).then(response => {
        this.selfPlantList = response.rows;
        this.total = response.total;
        this.loading = false;
      });
    },
    // 取消按钮
    cancel() {
      this.open = false;
      this.reset();
    },
    // 表单重置
    reset() {
      this.form = {
        id: null,
        userId: null,
        plantName: null,
        assetNo: null,
        area: null,
        powerType: null,
        capacity: null,
        maxOutput: null,
        gridVoltage: null,
        generationType: null,
        circuitId: null,
        hasControl: null,
        controlSystem: null,
        adjustPeriod: null,
        noticeTime: null,
        reserved1: null,
        reserved2: null,
        remark: null
      };
      this.resetForm("form");
    },
    /** 搜索按钮操作 */
    handleQuery() {
      this.queryParams.pageNum = 1;
      this.getList();
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.resetForm("queryForm");
      this.handleQuery();
    },
    // 多选框选中数据
    handleSelectionChange(selection) {
      this.ids = selection.map(item => item.id)
      this.single = selection.length !== 1
      this.multiple = !selection.length
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
      this.open = true;
      this.title = "添加自备电厂";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids
      getSelfPlant(id).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改自备电厂";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id != null) {
            updateSelfPlant(this.form).then(response => {
              this.$modal.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addSelfPlant(this.form).then(response => {
              this.$modal.msgSuccess("新增成功");
              this.open = false;
              this.getList();
            });
          }
        }
      });
    },
    /** 删除按钮操作 */
    handleDelete(row) {
      const ids = row.id || this.ids;
      this.$modal.confirm('是否确认删除自备电厂编号为"' + ids + '"的数据项？').then(function () {
        return delSelfPlant(ids);
      }).then(() => {
        this.getList();
        this.$modal.msgSuccess("删除成功");
      }).catch(() => { });
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download('sc/selfPlant/export', {
        ...this.queryParams
      }, `selfPlant_${new Date().getTime()}.xlsx`)
    }
  }
};
</script>
