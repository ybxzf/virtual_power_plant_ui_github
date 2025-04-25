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
      <el-form-item label="所属回路ID" prop="circuitId">
        <el-input
          v-model="queryParams.circuitId"
          placeholder="请输入所属回路ID"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="最大负荷(KW)" prop="maxLoad">
        <el-input
          v-model="queryParams.maxLoad"
          placeholder="请输入最大负荷(KW)"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="早峰负荷(KW)" prop="morningPeak">
        <el-input
          v-model="queryParams.morningPeak"
          placeholder="请输入早峰负荷(KW)"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="腰峰负荷(KW)" prop="middayPeak">
        <el-input
          v-model="queryParams.middayPeak"
          placeholder="请输入腰峰负荷(KW)"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="晚峰负荷(KW)" prop="eveningPeak">
        <el-input
          v-model="queryParams.eveningPeak"
          placeholder="请输入晚峰负荷(KW)"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="调节方式" prop="adjustMethod">
        <el-select v-model="queryParams.adjustMethod" placeholder="请选择调节方式" clearable>
          <el-option
            v-for="dict in dict.type.adjustment_method"
            :key="dict.value"
            :label="dict.label"
            :value="dict.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="最大可调节负荷(KW)" prop="maxAdjustableLoad">
        <el-input
          v-model="queryParams.maxAdjustableLoad"
          placeholder="请输入最大可调节负荷(KW)"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="可调节时段" prop="adjustablePeriod">
        <el-select v-model="queryParams.adjustablePeriod" placeholder="请选择可调节时段" clearable>
          <el-option
            v-for="dict in dict.type.adjustment_period"
            :key="dict.value"
            :label="dict.label"
            :value="dict.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="可调节比例(%)" prop="adjustableRatio">
        <el-input
          v-model="queryParams.adjustableRatio"
          placeholder="请输入可调节比例(%)"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="是否保安负荷" prop="isSecurityLoad">
        <el-select v-model="queryParams.isSecurityLoad" placeholder="请选择是否保安负荷" clearable>
          <el-option
            v-for="dict in dict.type.sys_yes_no"
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
      <el-form-item label="最长连续调节时间" prop="maxAdjustHours">
        <el-input
          v-model="queryParams.maxAdjustHours"
          placeholder="请输入最长连续调节时间"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="恢复生产时间" prop="recoveryHours">
        <el-input
          v-model="queryParams.recoveryHours"
          placeholder="请输入恢复生产时间"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="是否可调节" prop="isAdjustable">
        <el-select v-model="queryParams.isAdjustable" placeholder="请选择是否可调节" clearable>
          <el-option
            v-for="dict in dict.type.sys_yes_no"
            :key="dict.value"
            :label="dict.label"
            :value="dict.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="是否可控制" prop="isControllable">
        <el-select v-model="queryParams.isControllable" placeholder="请选择是否可控制" clearable>
          <el-option
            v-for="dict in dict.type.sys_yes_no"
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
          v-hasPermi="['sc:circuitLoadConfig:add']"
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
          v-hasPermi="['sc:circuitLoadConfig:edit']"
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
          v-hasPermi="['sc:circuitLoadConfig:remove']"
        >删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['sc:circuitLoadConfig:export']"
        >导出</el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="circuitLoadConfigList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="主键ID" align="center" prop="id" />
      <el-table-column label="所属用户ID" align="center" prop="userId" />
      <el-table-column label="所属回路ID" align="center" prop="circuitId" />
      <el-table-column label="最大负荷(KW)" align="center" prop="maxLoad" />
      <el-table-column label="早峰负荷(KW)" align="center" prop="morningPeak" />
      <el-table-column label="腰峰负荷(KW)" align="center" prop="middayPeak" />
      <el-table-column label="晚峰负荷(KW)" align="center" prop="eveningPeak" />
      <el-table-column label="调节方式" align="center" prop="adjustMethod">
        <template slot-scope="scope">
          <dict-tag :options="dict.type.adjustment_method" :value="scope.row.adjustMethod"/>
        </template>
      </el-table-column>
      <el-table-column label="最大可调节负荷(KW)" align="center" prop="maxAdjustableLoad" />
      <el-table-column label="可调节时段" align="center" prop="adjustablePeriod">
        <template slot-scope="scope">
          <dict-tag :options="dict.type.adjustment_period" :value="scope.row.adjustablePeriod"/>
        </template>
      </el-table-column>
      <el-table-column label="可调节比例(%)" align="center" prop="adjustableRatio" />
      <el-table-column label="是否保安负荷" align="center" prop="isSecurityLoad">
        <template slot-scope="scope">
          <dict-tag :options="dict.type.sys_yes_no" :value="scope.row.isSecurityLoad"/>
        </template>
      </el-table-column>
      <el-table-column label="提前通知执行时间" align="center" prop="noticeTime">
        <template slot-scope="scope">
          <dict-tag :options="dict.type.advance_notice_time" :value="scope.row.noticeTime"/>
        </template>
      </el-table-column>
      <el-table-column label="最长连续调节时间" align="center" prop="maxAdjustHours" />
      <el-table-column label="恢复生产时间" align="center" prop="recoveryHours" />
      <el-table-column label="是否可调节" align="center" prop="isAdjustable">
        <template slot-scope="scope">
          <dict-tag :options="dict.type.sys_yes_no" :value="scope.row.isAdjustable"/>
        </template>
      </el-table-column>
      <el-table-column label="是否可控制" align="center" prop="isControllable">
        <template slot-scope="scope">
          <dict-tag :options="dict.type.sys_yes_no" :value="scope.row.isControllable"/>
        </template>
      </el-table-column>
      <el-table-column label="预留字段1" align="center" prop="reserved1" />
      <el-table-column label="预留字段2" align="center" prop="reserved2" />
      <el-table-column label="备注信息" align="center" prop="remark" />
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['sc:circuitLoadConfig:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['sc:circuitLoadConfig:remove']"
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

    <!-- 添加或修改回路负荷配置对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="所属用户ID" prop="userId">
          <el-input v-model="form.userId" placeholder="请输入所属用户ID" />
        </el-form-item>
        <el-form-item label="所属回路ID" prop="circuitId">
          <el-input v-model="form.circuitId" placeholder="请输入所属回路ID" />
        </el-form-item>
        <el-form-item label="最大负荷(KW)" prop="maxLoad">
          <el-input v-model="form.maxLoad" placeholder="请输入最大负荷(KW)" />
        </el-form-item>
        <el-form-item label="早峰负荷(KW)" prop="morningPeak">
          <el-input v-model="form.morningPeak" placeholder="请输入早峰负荷(KW)" />
        </el-form-item>
        <el-form-item label="腰峰负荷(KW)" prop="middayPeak">
          <el-input v-model="form.middayPeak" placeholder="请输入腰峰负荷(KW)" />
        </el-form-item>
        <el-form-item label="晚峰负荷(KW)" prop="eveningPeak">
          <el-input v-model="form.eveningPeak" placeholder="请输入晚峰负荷(KW)" />
        </el-form-item>
        <el-form-item label="调节方式" prop="adjustMethod">
          <el-select v-model="form.adjustMethod" placeholder="请选择调节方式">
            <el-option
              v-for="dict in dict.type.adjustment_method"
              :key="dict.value"
              :label="dict.label"
              :value="dict.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="最大可调节负荷(KW)" prop="maxAdjustableLoad">
          <el-input v-model="form.maxAdjustableLoad" placeholder="请输入最大可调节负荷(KW)" />
        </el-form-item>
        <el-form-item label="可调节时段" prop="adjustablePeriod">
          <el-select v-model="form.adjustablePeriod" placeholder="请选择可调节时段">
            <el-option
              v-for="dict in dict.type.adjustment_period"
              :key="dict.value"
              :label="dict.label"
              :value="dict.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="可调节比例(%)" prop="adjustableRatio">
          <el-input v-model="form.adjustableRatio" placeholder="请输入可调节比例(%)" />
        </el-form-item>
        <el-form-item label="是否保安负荷" prop="isSecurityLoad">
          <el-select v-model="form.isSecurityLoad" placeholder="请选择是否保安负荷">
            <el-option
              v-for="dict in dict.type.sys_yes_no"
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
        <el-form-item label="最长连续调节时间" prop="maxAdjustHours">
          <el-input v-model="form.maxAdjustHours" placeholder="请输入最长连续调节时间" />
        </el-form-item>
        <el-form-item label="恢复生产时间" prop="recoveryHours">
          <el-input v-model="form.recoveryHours" placeholder="请输入恢复生产时间" />
        </el-form-item>
        <el-form-item label="是否可调节" prop="isAdjustable">
          <el-select v-model="form.isAdjustable" placeholder="请选择是否可调节">
            <el-option
              v-for="dict in dict.type.sys_yes_no"
              :key="dict.value"
              :label="dict.label"
              :value="dict.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="是否可控制" prop="isControllable">
          <el-select v-model="form.isControllable" placeholder="请选择是否可控制">
            <el-option
              v-for="dict in dict.type.sys_yes_no"
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
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { listCircuitLoadConfig, getCircuitLoadConfig, delCircuitLoadConfig, addCircuitLoadConfig, updateCircuitLoadConfig } from "@/api/sc/circuitLoadConfig";

export default {
  name: "CircuitLoadConfig",
  dicts: ['advance_notice_time', 'adjustment_period', 'sys_yes_no', 'adjustment_method'],
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
      // 回路负荷配置表格数据
      circuitLoadConfigList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        userId: null,
        circuitId: null,
        maxLoad: null,
        morningPeak: null,
        middayPeak: null,
        eveningPeak: null,
        adjustMethod: null,
        maxAdjustableLoad: null,
        adjustablePeriod: null,
        adjustableRatio: null,
        isSecurityLoad: null,
        noticeTime: null,
        maxAdjustHours: null,
        recoveryHours: null,
        isAdjustable: null,
        isControllable: null,
        reserved1: null,
        reserved2: null,
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
    /** 查询回路负荷配置列表 */
    getList() {
      this.loading = true;
      listCircuitLoadConfig(this.queryParams).then(response => {
        this.circuitLoadConfigList = response.rows;
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
        circuitId: null,
        maxLoad: null,
        morningPeak: null,
        middayPeak: null,
        eveningPeak: null,
        adjustMethod: null,
        maxAdjustableLoad: null,
        adjustablePeriod: null,
        adjustableRatio: null,
        isSecurityLoad: null,
        noticeTime: null,
        maxAdjustHours: null,
        recoveryHours: null,
        isAdjustable: null,
        isControllable: null,
        updateBy: null,
        updateTime: null,
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
      this.title = "添加回路负荷配置";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids
      getCircuitLoadConfig(id).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改回路负荷配置";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id != null) {
            updateCircuitLoadConfig(this.form).then(response => {
              this.$modal.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addCircuitLoadConfig(this.form).then(response => {
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
      this.$modal.confirm('是否确认删除回路负荷配置编号为"' + ids + '"的数据项？').then(function() {
        return delCircuitLoadConfig(ids);
      }).then(() => {
        this.getList();
        this.$modal.msgSuccess("删除成功");
      }).catch(() => {});
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download('sc/circuitLoadConfig/export', {
        ...this.queryParams
      }, `circuitLoadConfig_${new Date().getTime()}.xlsx`)
    }
  }
};
</script>
