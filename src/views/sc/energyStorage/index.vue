<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch" label-width="120px">
      <el-form-item label="所属用户ID" prop="userId">
        <el-input v-model="queryParams.userId" placeholder="请输入所属用户ID" clearable @keyup.enter.native="handleQuery" />
      </el-form-item>
      <el-form-item label="储能名称" prop="storageName">
        <el-input v-model="queryParams.storageName" placeholder="请输入储能名称" clearable @keyup.enter.native="handleQuery" />
      </el-form-item>
      <!--      <el-form-item label="资产编号" prop="assetNo">
        <el-input
          v-model="queryParams.assetNo"
          placeholder="请输入资产编号"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="所属区域" prop="area">
        <el-input
          v-model="queryParams.area"
          placeholder="请输入所属区域"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="电源类型" prop="powerType">
        <el-select v-model="queryParams.powerType" placeholder="请选择电源类型" clearable>
          <el-option
            v-for="dict in dict.type.power_source_type"
            :key="dict.value"
            :label="dict.label"
            :value="dict.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="装机容量" prop="capacity">
        <el-input
          v-model="queryParams.capacity"
          placeholder="请输入装机容量"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="最大充电能力" prop="maxCharge">
        <el-input
          v-model="queryParams.maxCharge"
          placeholder="请输入最大充电能力"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="最大放电能力" prop="maxDischarge">
        <el-input
          v-model="queryParams.maxDischarge"
          placeholder="请输入最大放电能力"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="所属回路ID" prop="circuitId">
        <el-input
          v-model="queryParams.circuitId"
          placeholder="请输入所属回路ID"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="主设备品牌和型号" prop="deviceModel">
        <el-input
          v-model="queryParams.deviceModel"
          placeholder="请输入主设备品牌和型号"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="充电提前通知时间" prop="chargeNotice">
        <el-input
          v-model="queryParams.chargeNotice"
          placeholder="请输入充电提前通知时间"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="日常放电时段" prop="dailyDischarge">
        <el-input
          v-model="queryParams.dailyDischarge"
          placeholder="请输入日常放电时段"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="放电提前通知时间" prop="dischargeNotice">
        <el-input
          v-model="queryParams.dischargeNotice"
          placeholder="请输入放电提前通知时间"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>-->
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
      </el-form-item>
    </el-form>

    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button type="primary" plain icon="el-icon-plus" size="mini" @click="handleAdd"
          v-hasPermi="['sc:energyStorage:add']">新增</el-button>
      </el-col>
      <!-- <el-col :span="1.5">
        <el-button type="success" plain icon="el-icon-edit" size="mini" :disabled="single" @click="handleUpdate"
          v-hasPermi="['sc:energyStorage:edit']">修改</el-button>
      </el-col> -->
      <el-col :span="1.5">
        <el-button type="danger" plain icon="el-icon-delete" size="mini" :disabled="multiple" @click="handleDelete"
          v-hasPermi="['sc:energyStorage:remove']">删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button type="warning" plain icon="el-icon-download" size="mini" @click="handleExport"
          v-hasPermi="['sc:energyStorage:export']">导出</el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="energyStorageList" @selection-change="handleSelectionChange"
      @row-dblclick="handleUpdate">
      <el-table-column type="selection" width="55" align="center" />
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
      <el-table-column label="操作" min-width="150" fixed="right" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <!-- <el-button size="mini" type="text" icon="el-icon-edit" @click="handleUpdate(scope.row)"
            v-hasPermi="['sc:energyStorage:edit']">修改</el-button> -->
          <el-button size="mini" type="text" icon="el-icon-delete" @click="handleDelete(scope.row)"
            v-hasPermi="['sc:energyStorage:remove']">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total > 0" :total="total" :page.sync="queryParams.pageNum" :limit.sync="queryParams.pageSize"
      @pagination="getList" />

    <!-- 添加或修改储能对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="1250px" height="80%" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" :inline="true" label-width="160px">
        <el-form-item label="所属用户ID" prop="userId">
          <el-input v-model="form.userId" placeholder="请输入所属用户ID" />
        </el-form-item>
        <el-form-item label="储能名称" prop="storageName">
          <el-input v-model="form.storageName" placeholder="请输入储能名称" />
        </el-form-item>
        <el-form-item label="资产编号" prop="assetNo">
          <el-input v-model="form.assetNo" placeholder="请输入资产编号" />
        </el-form-item>
        <el-form-item label="所属区域" prop="area">
          <el-input v-model="form.area" placeholder="请输入所属区域" />
        </el-form-item>
        <el-form-item label="电源类型" prop="powerType">
          <el-select v-model="form.powerType" placeholder="请选择电源类型">
            <el-option v-for="dict in dict.type.power_source_type" :key="dict.value" :label="dict.label"
              :value="dict.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="装机容量" prop="capacity">
          <el-input v-model="form.capacity" placeholder="请输入装机容量" />
        </el-form-item>
        <el-form-item label="最大充电能力" prop="maxCharge">
          <el-input v-model="form.maxCharge" placeholder="请输入最大充电能力" />
        </el-form-item>
        <el-form-item label="最大放电能力" prop="maxDischarge">
          <el-input v-model="form.maxDischarge" placeholder="请输入最大放电能力" />
        </el-form-item>
        <el-form-item label="所属回路ID" prop="circuitId">
          <el-input v-model="form.circuitId" placeholder="请输入所属回路ID" />
        </el-form-item>
        <el-form-item label="主设备品牌和型号" prop="deviceModel">
          <el-input v-model="form.deviceModel" placeholder="请输入主设备品牌和型号" />
        </el-form-item>
        <el-form-item label="充电提前通知时间" prop="chargeNotice">
          <el-input v-model="form.chargeNotice" placeholder="请输入充电提前通知时间" />
        </el-form-item>
        <el-form-item label="日常放电时段" prop="dailyDischarge">
          <el-input v-model="form.dailyDischarge" placeholder="请输入日常放电时段" />
        </el-form-item>
        <el-form-item label="放电提前通知时间" prop="dischargeNotice">
          <el-input v-model="form.dischargeNotice" placeholder="请输入放电提前通知时间" />
        </el-form-item>
        <el-form-item label="备注信息" prop="remark">
          <el-input v-model="form.remark" type="textarea" placeholder="请输入内容" />
        </el-form-item>
        <el-form-item label="是否可调节" prop="isAdjust">
          <el-select v-model="form.isAdjust" placeholder="请选择是否可调节">
            <el-option v-for="dict in dict.type.sys_yes_no" :key="dict.value" :label="dict.label"
              :value="dict.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="是否可控制" prop="isControl">
          <el-select v-model="form.isControl" placeholder="请选择是否可控制">
            <el-option v-for="dict in dict.type.sys_yes_no" :key="dict.value" :label="dict.label"
              :value="dict.value"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>
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
