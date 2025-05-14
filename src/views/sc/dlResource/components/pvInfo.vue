<template>
  <div class="app-container">
    <el-table v-loading="loading" :data="pvList" @selection-change="handleSelectionChange">
      <el-table-column type="index" label="序号" width="55" align="center" />
      <el-table-column label="主键ID" min-width="100" align="center" prop="id" />
      <el-table-column label="所属用户ID" min-width="100" align="center" prop="userId" />
      <el-table-column label="分布式光伏名称" min-width="120" align="center" prop="pvName" />
      <el-table-column label="所属区域" min-width="80" align="center" prop="area" />
      <el-table-column label="电源类型" min-width="80" align="center" prop="powerType">
        <template slot-scope="scope">
          <dict-tag :options="dict.type.power_source_type" :value="scope.row.powerType" />
        </template>
      </el-table-column>
      <el-table-column label="资产编号" min-width="80" align="center" prop="assetNo" />
      <el-table-column label="峰值总功率(KWP)" min-width="130" align="center" prop="peakPower" />
      <el-table-column label="最大可出力(KW)" min-width="120" align="center" prop="maxOutput" />
      <el-table-column label="发电效率" min-width="80" align="center" prop="efficiency" />
      <el-table-column label="调节方式" min-width="80" align="center" prop="adjustMode">
        <template slot-scope="scope">
          <dict-tag :options="dict.type.regulation_mode" :value="scope.row.adjustMode" />
        </template>
      </el-table-column>
      <el-table-column label="提前通知执行时间" min-width="130" align="center" prop="noticeTime">
        <template slot-scope="scope">
          <dict-tag :options="dict.type.advance_notice_time" :value="scope.row.noticeTime" />
        </template>
      </el-table-column>
      <el-table-column label="调节时段" min-width="80" align="center" prop="adjustPeriod">
        <template slot-scope="scope">
          <dict-tag :options="dict.type.adjustment_period" :value="scope.row.adjustPeriod" />
        </template>
      </el-table-column>
      <el-table-column label="所属回路ID" min-width="90" align="center" prop="circuitId" />
      <el-table-column label="主设备品牌和型号" min-width="130" align="center" prop="deviceModel" />
      <el-table-column label="备注信息" min-width="80" align="center" prop="remark" />
      <el-table-column label="是否可调节" min-width="90" align="center" prop="isAdjust">
        <template slot-scope="scope">
          <dict-tag :options="dict.type.sys_yes_no" :value="scope.row.isAdjust" />
        </template>
      </el-table-column>
      <el-table-column label="是否可控制" min-width="90" align="center" prop="isControl">
        <template slot-scope="scope">
          <dict-tag :options="dict.type.sys_yes_no" :value="scope.row.isControl" />
        </template>
      </el-table-column>
      <!-- <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button size="mini" type="text" icon="el-icon-edit" @click="handleUpdate(scope.row)"
            v-hasPermi="['sc:pv:edit']">修改</el-button>
          <el-button size="mini" type="text" icon="el-icon-delete" @click="handleDelete(scope.row)"
            v-hasPermi="['sc:pv:remove']">删除</el-button>
        </template>
      </el-table-column> -->
    </el-table>

    <pagination v-show="total > 0" :total="total" :page.sync="queryParams.pageNum" :limit.sync="queryParams.pageSize"
      @pagination="getList" />
  </div>
</template>
<script>
import { listPv, getPv, delPv, addPv, updatePv } from "@/api/sc/pv";

export default {
  name: "Pv",
  dicts: ['regulation_mode', 'advance_notice_time', 'adjustment_period', 'sys_yes_no', 'power_source_type'],
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
      // 分布式光伏表格数据
      pvList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        userId: null,
        pvName: null,
        area: null,
        powerType: null,
        assetNo: null,
        peakPower: null,
        maxOutput: null,
        efficiency: null,
        adjustMode: null,
        noticeTime: null,
        adjustPeriod: null,
        circuitId: null,
        deviceModel: null,
        reserved1: null,
        reserved2: null,
        isAdjust: null,
        isControl: null
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
    /** 查询分布式光伏列表 */
    getList() {
      this.loading = true;
      listPv(this.queryParams).then(response => {
        this.pvList = response.rows;
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
        pvName: null,
        area: null,
        powerType: null,
        assetNo: null,
        peakPower: null,
        maxOutput: null,
        efficiency: null,
        adjustMode: null,
        noticeTime: null,
        adjustPeriod: null,
        circuitId: null,
        deviceModel: null,
        reserved1: null,
        reserved2: null,
        remark: null,
        updateBy: null,
        updateTime: null,
        isAdjust: null,
        isControl: null
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
      this.title = "添加分布式光伏";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids
      getPv(id).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改分布式光伏";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id != null) {
            updatePv(this.form).then(response => {
              this.$modal.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addPv(this.form).then(response => {
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
      this.$modal.confirm('是否确认删除分布式光伏编号为"' + ids + '"的数据项？').then(function () {
        return delPv(ids);
      }).then(() => {
        this.getList();
        this.$modal.msgSuccess("删除成功");
      }).catch(() => { });
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download('sc/pv/export', {
        ...this.queryParams
      }, `pv_${new Date().getTime()}.xlsx`)
    }
  }
};
</script>