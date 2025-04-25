<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="充电桩名称" prop="chargerName">
        <el-input
          v-model="queryParams.chargerName"
          placeholder="请输入充电桩名称"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="资产编号" prop="assetNo">
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
      <el-form-item label="充电桩类型" prop="chargerType">
        <el-select v-model="queryParams.chargerType" placeholder="请选择充电桩类型" clearable>
          <el-option
            v-for="dict in dict.type.generation_type"
            :key="dict.value"
            :label="dict.label"
            :value="dict.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="供电电压(KV)" prop="supplyVoltage">
        <el-select v-model="queryParams.supplyVoltage" placeholder="请选择供电电压(KV)" clearable>
          <el-option
            v-for="dict in dict.type.supply_voltage"
            :key="dict.value"
            :label="dict.label"
            :value="dict.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="充电桩功率(KW)" prop="power">
        <el-input
          v-model="queryParams.power"
          placeholder="请输入充电桩功率(KW)"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="所属用户ID" prop="userId">
        <el-input
          v-model="queryParams.userId"
          placeholder="请输入所属用户ID"
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
      <el-form-item label="主设备品牌" prop="deviceBrand">
        <el-input
          v-model="queryParams.deviceBrand"
          placeholder="请输入主设备品牌"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="主设备型号" prop="deviceModel">
        <el-input
          v-model="queryParams.deviceModel"
          placeholder="请输入主设备型号"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="调节时段" prop="adjustPeriod">
        <el-select v-model="queryParams.adjustPeriod" placeholder="请选择调节时段" clearable>
          <el-option
            v-for="dict in dict.type.adjustment_period"
            :key="dict.value"
            :label="dict.label"
            :value="dict.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="提前通知执行时间" prop="noticeTime">
        <el-select v-model="queryParams.noticeTime" placeholder="请选择提前通知执行时间" clearable>
          <el-option
            v-for="dict in dict.type.advance_notice_time"
            :key="dict.value"
            :label="dict.label"
            :value="dict.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="预留字段1" prop="reserved1">
        <el-input
          v-model="queryParams.reserved1"
          placeholder="请输入预留字段1"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="预留字段2" prop="reserved2">
        <el-input
          v-model="queryParams.reserved2"
          placeholder="请输入预留字段2"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="是否可调节" prop="isAdjust">
        <el-select v-model="queryParams.isAdjust" placeholder="请选择是否可调节" clearable>
          <el-option
            v-for="dict in dict.type.sys_yes_no"
            :key="dict.value"
            :label="dict.label"
            :value="dict.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="是否可控制" prop="isControl">
        <el-select v-model="queryParams.isControl" placeholder="请选择是否可控制" clearable>
          <el-option
            v-for="dict in dict.type.sys_yes_no"
            :key="dict.value"
            :label="dict.label"
            :value="dict.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
      </el-form-item>
    </el-form>

    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button
          type="primary"
          plain
          icon="el-icon-plus"
          size="mini"
          @click="handleAdd"
          v-hasPermi="['sc:chargingPile:add']"
        >新增</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="success"
          plain
          icon="el-icon-edit"
          size="mini"
          :disabled="single"
          @click="handleUpdate"
          v-hasPermi="['sc:chargingPile:edit']"
        >修改</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="danger"
          plain
          icon="el-icon-delete"
          size="mini"
          :disabled="multiple"
          @click="handleDelete"
          v-hasPermi="['sc:chargingPile:remove']"
        >删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['sc:chargingPile:export']"
        >导出</el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="chargingPileList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="主键ID" align="center" prop="id" />
      <el-table-column label="充电桩名称" align="center" prop="chargerName" />
      <el-table-column label="资产编号" align="center" prop="assetNo" />
      <el-table-column label="所属区域" align="center" prop="area" />
      <el-table-column label="充电桩类型" align="center" prop="chargerType">
        <template slot-scope="scope">
          <dict-tag :options="dict.type.generation_type" :value="scope.row.chargerType"/>
        </template>
      </el-table-column>
      <el-table-column label="供电电压(KV)" align="center" prop="supplyVoltage">
        <template slot-scope="scope">
          <dict-tag :options="dict.type.supply_voltage" :value="scope.row.supplyVoltage"/>
        </template>
      </el-table-column>
      <el-table-column label="充电桩功率(KW)" align="center" prop="power" />
      <el-table-column label="所属用户ID" align="center" prop="userId" />
      <el-table-column label="所属回路ID" align="center" prop="circuitId" />
      <el-table-column label="主设备品牌" align="center" prop="deviceBrand" />
      <el-table-column label="主设备型号" align="center" prop="deviceModel" />
      <el-table-column label="调节时段" align="center" prop="adjustPeriod">
        <template slot-scope="scope">
          <dict-tag :options="dict.type.adjustment_period" :value="scope.row.adjustPeriod"/>
        </template>
      </el-table-column>
      <el-table-column label="提前通知执行时间" align="center" prop="noticeTime">
        <template slot-scope="scope">
          <dict-tag :options="dict.type.advance_notice_time" :value="scope.row.noticeTime"/>
        </template>
      </el-table-column>
      <el-table-column label="预留字段1" align="center" prop="reserved1" />
      <el-table-column label="预留字段2" align="center" prop="reserved2" />
      <el-table-column label="备注信息" align="center" prop="remark" />
      <el-table-column label="是否可调节" align="center" prop="isAdjust">
        <template slot-scope="scope">
          <dict-tag :options="dict.type.sys_yes_no" :value="scope.row.isAdjust"/>
        </template>
      </el-table-column>
      <el-table-column label="是否可控制" align="center" prop="isControl">
        <template slot-scope="scope">
          <dict-tag :options="dict.type.sys_yes_no" :value="scope.row.isControl"/>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['sc:chargingPile:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['sc:chargingPile:remove']"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
      @pagination="getList"
    />

    <!-- 添加或修改充电桩对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="充电桩名称" prop="chargerName">
          <el-input v-model="form.chargerName" placeholder="请输入充电桩名称" />
        </el-form-item>
        <el-form-item label="资产编号" prop="assetNo">
          <el-input v-model="form.assetNo" placeholder="请输入资产编号" />
        </el-form-item>
        <el-form-item label="所属区域" prop="area">
          <el-input v-model="form.area" placeholder="请输入所属区域" />
        </el-form-item>
        <el-form-item label="充电桩类型" prop="chargerType">
          <el-select v-model="form.chargerType" placeholder="请选择充电桩类型">
            <el-option
              v-for="dict in dict.type.generation_type"
              :key="dict.value"
              :label="dict.label"
              :value="dict.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="供电电压(KV)" prop="supplyVoltage">
          <el-select v-model="form.supplyVoltage" placeholder="请选择供电电压(KV)">
            <el-option
              v-for="dict in dict.type.supply_voltage"
              :key="dict.value"
              :label="dict.label"
              :value="dict.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="充电桩功率(KW)" prop="power">
          <el-input v-model="form.power" placeholder="请输入充电桩功率(KW)" />
        </el-form-item>
        <el-form-item label="所属用户ID" prop="userId">
          <el-input v-model="form.userId" placeholder="请输入所属用户ID" />
        </el-form-item>
        <el-form-item label="所属回路ID" prop="circuitId">
          <el-input v-model="form.circuitId" placeholder="请输入所属回路ID" />
        </el-form-item>
        <el-form-item label="主设备品牌" prop="deviceBrand">
          <el-input v-model="form.deviceBrand" placeholder="请输入主设备品牌" />
        </el-form-item>
        <el-form-item label="主设备型号" prop="deviceModel">
          <el-input v-model="form.deviceModel" placeholder="请输入主设备型号" />
        </el-form-item>
        <el-form-item label="调节时段" prop="adjustPeriod">
          <el-select v-model="form.adjustPeriod" placeholder="请选择调节时段">
            <el-option
              v-for="dict in dict.type.adjustment_period"
              :key="dict.value"
              :label="dict.label"
              :value="dict.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="提前通知执行时间" prop="noticeTime">
          <el-select v-model="form.noticeTime" placeholder="请选择提前通知执行时间">
            <el-option
              v-for="dict in dict.type.advance_notice_time"
              :key="dict.value"
              :label="dict.label"
              :value="dict.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="预留字段1" prop="reserved1">
          <el-input v-model="form.reserved1" placeholder="请输入预留字段1" />
        </el-form-item>
        <el-form-item label="预留字段2" prop="reserved2">
          <el-input v-model="form.reserved2" placeholder="请输入预留字段2" />
        </el-form-item>
        <el-form-item label="备注信息" prop="remark">
          <el-input v-model="form.remark" type="textarea" placeholder="请输入内容" />
        </el-form-item>
        <el-form-item label="是否可调节" prop="isAdjust">
          <el-select v-model="form.isAdjust" placeholder="请选择是否可调节">
            <el-option
              v-for="dict in dict.type.sys_yes_no"
              :key="dict.value"
              :label="dict.label"
              :value="dict.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="是否可控制" prop="isControl">
          <el-select v-model="form.isControl" placeholder="请选择是否可控制">
            <el-option
              v-for="dict in dict.type.sys_yes_no"
              :key="dict.value"
              :label="dict.label"
              :value="dict.value"
            ></el-option>
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
import { listChargingPile, getChargingPile, delChargingPile, addChargingPile, updateChargingPile } from "@/api/sc/chargingPile";

export default {
  name: "ChargingPile",
  dicts: ['supply_voltage', 'advance_notice_time', 'adjustment_period', 'sys_yes_no', 'generation_type'],
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
      // 充电桩表格数据
      chargingPileList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        chargerName: null,
        assetNo: null,
        area: null,
        chargerType: null,
        supplyVoltage: null,
        power: null,
        userId: null,
        circuitId: null,
        deviceBrand: null,
        deviceModel: null,
        adjustPeriod: null,
        noticeTime: null,
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
    /** 查询充电桩列表 */
    getList() {
      this.loading = true;
      listChargingPile(this.queryParams).then(response => {
        this.chargingPileList = response.rows;
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
        chargerName: null,
        assetNo: null,
        area: null,
        chargerType: null,
        supplyVoltage: null,
        power: null,
        userId: null,
        circuitId: null,
        deviceBrand: null,
        deviceModel: null,
        adjustPeriod: null,
        noticeTime: null,
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
      this.single = selection.length!==1
      this.multiple = !selection.length
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
      this.open = true;
      this.title = "添加充电桩";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids
      getChargingPile(id).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改充电桩";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id != null) {
            updateChargingPile(this.form).then(response => {
              this.$modal.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addChargingPile(this.form).then(response => {
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
      this.$modal.confirm('是否确认删除充电桩编号为"' + ids + '"的数据项？').then(function() {
        return delChargingPile(ids);
      }).then(() => {
        this.getList();
        this.$modal.msgSuccess("删除成功");
      }).catch(() => {});
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download('sc/chargingPile/export', {
        ...this.queryParams
      }, `chargingPile_${new Date().getTime()}.xlsx`)
    }
  }
};
</script>
