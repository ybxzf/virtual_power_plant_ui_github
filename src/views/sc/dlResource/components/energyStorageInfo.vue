<template>
  <div class="app-container">
    <el-table v-loading="loading" :data="energyStorageList" @selection-change="handleSelectionChange">
      <el-table-column label="序号" type="index" width="55" align="center" />
      <el-table-column label="主键ID" min-width="80" align="center" prop="id" />
      <el-table-column label="所属用户ID" min-width="100" align="center" prop="userId" />
      <el-table-column label="储能名称" align="center" min-width="80" prop="storageName" />
      <el-table-column label="资产编号" align="center" min-width="80" prop="assetNo" />
      <el-table-column label="所属区域" align="center" min-width="80" prop="area" />
      <el-table-column label="电源类型" align="center" min-width="80" prop="powerType">
        <template slot-scope="scope">
          <dict-tag :options="dict.type.power_source_type" :value="scope.row.powerType" />
        </template>
      </el-table-column>
      <el-table-column label="装机容量" min-width="80" align="center" prop="capacity" />
      <el-table-column label="最大充电能力" min-width="100" align="center" prop="maxCharge" />
      <el-table-column label="最大放电能力" min-width="100" align="center" prop="maxDischarge" />
      <el-table-column label="所属回路ID" min-width="100" align="center" prop="circuitId" />
      <el-table-column label="主设备品牌和型号" min-width="130" align="center" prop="deviceModel" />
      <el-table-column label="充电提前通知时间" min-width="130" align="center" prop="chargeNotice" />
      <el-table-column label="日常放电时段" min-width="120" align="center" prop="dailyDischarge" />
      <el-table-column label="放电提前通知时间" min-width="130" align="center" prop="dischargeNotice" />
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
            v-hasPermi="['sc:energyStorage:edit']">修改</el-button>
          <el-button size="mini" type="text" icon="el-icon-delete" @click="handleDelete(scope.row)"
            v-hasPermi="['sc:energyStorage:remove']">删除</el-button>
        </template>
      </el-table-column> -->
    </el-table>

    <pagination v-show="total > 0" :total="total" :page.sync="queryParams.pageNum" :limit.sync="queryParams.pageSize"
      @pagination="getList" />
  </div>
</template>

<script>
import { listEnergyStorage, getEnergyStorage, delEnergyStorage, addEnergyStorage, updateEnergyStorage } from "@/api/sc/energyStorage";

export default {
  name: "EnergyStorage",
  dicts: ['sys_yes_no', 'power_source_type'],
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
      // 储能表格数据
      energyStorageList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        userId: null,
        storageName: null,
        assetNo: null,
        area: null,
        powerType: null,
        capacity: null,
        maxCharge: null,
        maxDischarge: null,
        circuitId: null,
        deviceModel: null,
        chargeNotice: null,
        dailyDischarge: null,
        dischargeNotice: null,
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
    /** 查询储能列表 */
    getList() {
      this.loading = true;
      listEnergyStorage(this.queryParams).then(response => {
        this.energyStorageList = response.rows;
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
        storageName: null,
        assetNo: null,
        area: null,
        powerType: null,
        capacity: null,
        maxCharge: null,
        maxDischarge: null,
        circuitId: null,
        deviceModel: null,
        chargeNotice: null,
        dailyDischarge: null,
        dischargeNotice: null,
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
      this.title = "添加储能";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids
      getEnergyStorage(id).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改储能";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id != null) {
            updateEnergyStorage(this.form).then(response => {
              this.$modal.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addEnergyStorage(this.form).then(response => {
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
      this.$modal.confirm('是否确认删除储能编号为"' + ids + '"的数据项？').then(function () {
        return delEnergyStorage(ids);
      }).then(() => {
        this.getList();
        this.$modal.msgSuccess("删除成功");
      }).catch(() => { });
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download('sc/energyStorage/export', {
        ...this.queryParams
      }, `energyStorage_${new Date().getTime()}.xlsx`)
    }
  }
};
</script>
