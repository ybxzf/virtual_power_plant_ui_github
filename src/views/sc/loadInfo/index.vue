<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="所属用户ID" prop="userId">
        <el-input
          v-model="queryParams.userId"
          placeholder="请输入所属用户ID"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="年用电量(KWH)" prop="annualElectricity">
        <el-input
          v-model="queryParams.annualElectricity"
          placeholder="请输入年用电量(KWH)"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="合同容量(KVA)" prop="contractCapacity">
        <el-input
          v-model="queryParams.contractCapacity"
          placeholder="请输入合同容量(KVA)"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="运行容量" prop="runningCapacity">
        <el-input
          v-model="queryParams.runningCapacity"
          placeholder="请输入运行容量"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="近三年夏季最大负荷(kw)" prop="summerMaxLoad">
        <el-input
          v-model="queryParams.summerMaxLoad"
          placeholder="请输入近三年夏季最大负荷(kw)"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="近三年冬季最大负荷(kW)" prop="winterMaxLoad">
        <el-input
          v-model="queryParams.winterMaxLoad"
          placeholder="请输入近三年冬季最大负荷(kW)"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="近三年夏季最大负荷日平均负荷(kW)" prop="summerAvgLoad">
        <el-input
          v-model="queryParams.summerAvgLoad"
          placeholder="请输入近三年夏季最大负荷日平均负荷(kW)"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="近三年冬季最大负荷日平均负荷(kW)" prop="winterAvgLoad">
        <el-input
          v-model="queryParams.winterAvgLoad"
          placeholder="请输入近三年冬季最大负荷日平均负荷(kW)"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="需求响应任务量(kW)" prop="demandResponse">
        <el-input
          v-model="queryParams.demandResponse"
          placeholder="请输入需求响应任务量(kW)"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="实际响应量(kW)" prop="actualResponse">
        <el-input
          v-model="queryParams.actualResponse"
          placeholder="请输入实际响应量(kW)"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="每年生产时段" prop="productionPeriod">
        <el-input
          v-model="queryParams.productionPeriod"
          placeholder="请输入每年生产时段"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="保安负荷容量(kWV)" prop="securityLoad">
        <el-input
          v-model="queryParams.securityLoad"
          placeholder="请输入保安负荷容量(kWV)"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="总配数量(个)" prop="totalDistribution">
        <el-input
          v-model="queryParams.totalDistribution"
          placeholder="请输入总配数量(个)"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="总配出线数量(个)" prop="totalOutlet">
        <el-input
          v-model="queryParams.totalOutlet"
          placeholder="请输入总配出线数量(个)"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="分配电压等级(KV)" prop="distributionVoltage">
        <el-input
          v-model="queryParams.distributionVoltage"
          placeholder="请输入分配电压等级(KV)"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="高压馈线数量(个)" prop="highVoltageLines">
        <el-input
          v-model="queryParams.highVoltageLines"
          placeholder="请输入高压馈线数量(个)"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="可调节高压馈线数量(个)" prop="adjustableHighLines">
        <el-input
          v-model="queryParams.adjustableHighLines"
          placeholder="请输入可调节高压馈线数量(个)"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="可调节低压馈线数量(个)" prop="adjustableLowLines">
        <el-input
          v-model="queryParams.adjustableLowLines"
          placeholder="请输入可调节低压馈线数量(个)"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="保安负荷设备名称" prop="securityDevice">
        <el-input
          v-model="queryParams.securityDevice"
          placeholder="请输入保安负荷设备名称"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="总配电压等级(KV)" prop="totalVoltage">
        <el-input
          v-model="queryParams.totalVoltage"
          placeholder="请输入总配电压等级(KV)"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="分配数量(个)" prop="subDistribution">
        <el-input
          v-model="queryParams.subDistribution"
          placeholder="请输入分配数量(个)"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="分配出线数量(个)" prop="subOutlet">
        <el-input
          v-model="queryParams.subOutlet"
          placeholder="请输入分配出线数量(个)"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="高压馈线电压等级(KV)" prop="hvFeederVoltage">
        <el-input
          v-model="queryParams.hvFeederVoltage"
          placeholder="请输入高压馈线电压等级(KV)"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="低压馈线数量(个)" prop="lvFeederCount">
        <el-input
          v-model="queryParams.lvFeederCount"
          placeholder="请输入低压馈线数量(个)"
          clearable
          @keyup.enter.native="handleQuery"
        />
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
          v-hasPermi="['sc:loadInfo:add']"
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
          v-hasPermi="['sc:loadInfo:edit']"
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
          v-hasPermi="['sc:loadInfo:remove']"
        >删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['sc:loadInfo:export']"
        >导出</el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="loadInfoList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="主键ID" align="center" prop="id" />
      <el-table-column label="所属用户ID" align="center" prop="userId" />
      <el-table-column label="年用电量(KWH)" align="center" prop="annualElectricity" />
      <el-table-column label="合同容量(KVA)" align="center" prop="contractCapacity" />
      <el-table-column label="运行容量" align="center" prop="runningCapacity" />
      <el-table-column label="近三年夏季最大负荷(kw)" align="center" prop="summerMaxLoad" />
      <el-table-column label="近三年冬季最大负荷(kW)" align="center" prop="winterMaxLoad" />
      <el-table-column label="近三年夏季最大负荷日平均负荷(kW)" align="center" prop="summerAvgLoad" />
      <el-table-column label="近三年冬季最大负荷日平均负荷(kW)" align="center" prop="winterAvgLoad" />
      <el-table-column label="需求响应任务量(kW)" align="center" prop="demandResponse" />
      <el-table-column label="实际响应量(kW)" align="center" prop="actualResponse" />
      <el-table-column label="每年生产时段" align="center" prop="productionPeriod" />
      <el-table-column label="保安负荷容量(kWV)" align="center" prop="securityLoad" />
      <el-table-column label="总配数量(个)" align="center" prop="totalDistribution" />
      <el-table-column label="总配出线数量(个)" align="center" prop="totalOutlet" />
      <el-table-column label="分配电压等级(KV)" align="center" prop="distributionVoltage" />
      <el-table-column label="高压馈线数量(个)" align="center" prop="highVoltageLines" />
      <el-table-column label="可调节高压馈线数量(个)" align="center" prop="adjustableHighLines" />
      <el-table-column label="可调节低压馈线数量(个)" align="center" prop="adjustableLowLines" />
      <el-table-column label="保安负荷设备名称" align="center" prop="securityDevice" />
      <el-table-column label="总配电压等级(KV)" align="center" prop="totalVoltage" />
      <el-table-column label="分配数量(个)" align="center" prop="subDistribution" />
      <el-table-column label="分配出线数量(个)" align="center" prop="subOutlet" />
      <el-table-column label="高压馈线电压等级(KV)" align="center" prop="hvFeederVoltage" />
      <el-table-column label="低压馈线数量(个)" align="center" prop="lvFeederCount" />
      <el-table-column label="备注信息" align="center" prop="remark" />
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['sc:loadInfo:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['sc:loadInfo:remove']"
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

    <!-- 添加或修改负荷信息对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="所属用户ID" prop="userId">
          <el-input v-model="form.userId" placeholder="请输入所属用户ID" />
        </el-form-item>
        <el-form-item label="年用电量(KWH)" prop="annualElectricity">
          <el-input v-model="form.annualElectricity" placeholder="请输入年用电量(KWH)" />
        </el-form-item>
        <el-form-item label="合同容量(KVA)" prop="contractCapacity">
          <el-input v-model="form.contractCapacity" placeholder="请输入合同容量(KVA)" />
        </el-form-item>
        <el-form-item label="运行容量" prop="runningCapacity">
          <el-input v-model="form.runningCapacity" placeholder="请输入运行容量" />
        </el-form-item>
        <el-form-item label="近三年夏季最大负荷(kw)" prop="summerMaxLoad">
          <el-input v-model="form.summerMaxLoad" placeholder="请输入近三年夏季最大负荷(kw)" />
        </el-form-item>
        <el-form-item label="近三年冬季最大负荷(kW)" prop="winterMaxLoad">
          <el-input v-model="form.winterMaxLoad" placeholder="请输入近三年冬季最大负荷(kW)" />
        </el-form-item>
        <el-form-item label="近三年夏季最大负荷日平均负荷(kW)" prop="summerAvgLoad">
          <el-input v-model="form.summerAvgLoad" placeholder="请输入近三年夏季最大负荷日平均负荷(kW)" />
        </el-form-item>
        <el-form-item label="近三年冬季最大负荷日平均负荷(kW)" prop="winterAvgLoad">
          <el-input v-model="form.winterAvgLoad" placeholder="请输入近三年冬季最大负荷日平均负荷(kW)" />
        </el-form-item>
        <el-form-item label="需求响应任务量(kW)" prop="demandResponse">
          <el-input v-model="form.demandResponse" placeholder="请输入需求响应任务量(kW)" />
        </el-form-item>
        <el-form-item label="实际响应量(kW)" prop="actualResponse">
          <el-input v-model="form.actualResponse" placeholder="请输入实际响应量(kW)" />
        </el-form-item>
        <el-form-item label="每年生产时段" prop="productionPeriod">
          <el-input v-model="form.productionPeriod" placeholder="请输入每年生产时段" />
        </el-form-item>
        <el-form-item label="保安负荷容量(kWV)" prop="securityLoad">
          <el-input v-model="form.securityLoad" placeholder="请输入保安负荷容量(kWV)" />
        </el-form-item>
        <el-form-item label="总配数量(个)" prop="totalDistribution">
          <el-input v-model="form.totalDistribution" placeholder="请输入总配数量(个)" />
        </el-form-item>
        <el-form-item label="总配出线数量(个)" prop="totalOutlet">
          <el-input v-model="form.totalOutlet" placeholder="请输入总配出线数量(个)" />
        </el-form-item>
        <el-form-item label="分配电压等级(KV)" prop="distributionVoltage">
          <el-input v-model="form.distributionVoltage" placeholder="请输入分配电压等级(KV)" />
        </el-form-item>
        <el-form-item label="高压馈线数量(个)" prop="highVoltageLines">
          <el-input v-model="form.highVoltageLines" placeholder="请输入高压馈线数量(个)" />
        </el-form-item>
        <el-form-item label="可调节高压馈线数量(个)" prop="adjustableHighLines">
          <el-input v-model="form.adjustableHighLines" placeholder="请输入可调节高压馈线数量(个)" />
        </el-form-item>
        <el-form-item label="可调节低压馈线数量(个)" prop="adjustableLowLines">
          <el-input v-model="form.adjustableLowLines" placeholder="请输入可调节低压馈线数量(个)" />
        </el-form-item>
        <el-form-item label="保安负荷设备名称" prop="securityDevice">
          <el-input v-model="form.securityDevice" placeholder="请输入保安负荷设备名称" />
        </el-form-item>
        <el-form-item label="总配电压等级(KV)" prop="totalVoltage">
          <el-input v-model="form.totalVoltage" placeholder="请输入总配电压等级(KV)" />
        </el-form-item>
        <el-form-item label="分配数量(个)" prop="subDistribution">
          <el-input v-model="form.subDistribution" placeholder="请输入分配数量(个)" />
        </el-form-item>
        <el-form-item label="分配出线数量(个)" prop="subOutlet">
          <el-input v-model="form.subOutlet" placeholder="请输入分配出线数量(个)" />
        </el-form-item>
        <el-form-item label="高压馈线电压等级(KV)" prop="hvFeederVoltage">
          <el-input v-model="form.hvFeederVoltage" placeholder="请输入高压馈线电压等级(KV)" />
        </el-form-item>
        <el-form-item label="低压馈线数量(个)" prop="lvFeederCount">
          <el-input v-model="form.lvFeederCount" placeholder="请输入低压馈线数量(个)" />
        </el-form-item>
        <el-form-item label="备注信息" prop="remark">
          <el-input v-model="form.remark" type="textarea" placeholder="请输入内容" />
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
import { listLoadInfo, getLoadInfo, delLoadInfo, addLoadInfo, updateLoadInfo } from "@/api/sc/loadInfo";

export default {
  name: "LoadInfo",
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
      // 负荷信息表格数据
      loadInfoList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        userId: null,
        annualElectricity: null,
        contractCapacity: null,
        runningCapacity: null,
        summerMaxLoad: null,
        winterMaxLoad: null,
        summerAvgLoad: null,
        winterAvgLoad: null,
        demandResponse: null,
        actualResponse: null,
        productionPeriod: null,
        securityLoad: null,
        totalDistribution: null,
        totalOutlet: null,
        distributionVoltage: null,
        highVoltageLines: null,
        adjustableHighLines: null,
        adjustableLowLines: null,
        securityDevice: null,
        totalVoltage: null,
        subDistribution: null,
        subOutlet: null,
        hvFeederVoltage: null,
        lvFeederCount: null,
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
    /** 查询负荷信息列表 */
    getList() {
      this.loading = true;
      listLoadInfo(this.queryParams).then(response => {
        this.loadInfoList = response.rows;
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
        annualElectricity: null,
        contractCapacity: null,
        runningCapacity: null,
        summerMaxLoad: null,
        winterMaxLoad: null,
        summerAvgLoad: null,
        winterAvgLoad: null,
        demandResponse: null,
        actualResponse: null,
        productionPeriod: null,
        securityLoad: null,
        totalDistribution: null,
        totalOutlet: null,
        distributionVoltage: null,
        highVoltageLines: null,
        adjustableHighLines: null,
        adjustableLowLines: null,
        securityDevice: null,
        totalVoltage: null,
        subDistribution: null,
        subOutlet: null,
        hvFeederVoltage: null,
        lvFeederCount: null,
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
      this.single = selection.length!==1
      this.multiple = !selection.length
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
      this.open = true;
      this.title = "添加负荷信息";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids
      getLoadInfo(id).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改负荷信息";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id != null) {
            updateLoadInfo(this.form).then(response => {
              this.$modal.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addLoadInfo(this.form).then(response => {
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
      this.$modal.confirm('是否确认删除负荷信息编号为"' + ids + '"的数据项？').then(function() {
        return delLoadInfo(ids);
      }).then(() => {
        this.getList();
        this.$modal.msgSuccess("删除成功");
      }).catch(() => {});
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download('sc/loadInfo/export', {
        ...this.queryParams
      }, `loadInfo_${new Date().getTime()}.xlsx`)
    }
  }
};
</script>
