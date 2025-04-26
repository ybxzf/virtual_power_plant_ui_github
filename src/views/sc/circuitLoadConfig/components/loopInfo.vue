<template>
  <div class="circuit-load-config">
    <div class="circuit-load-config_item">
      <LabelTitle title="负荷信息"></LabelTitle>
      <LoadInfo formType="description" :form-data="formData"></LoadInfo>
    </div>
    <div class="circuit-load-config_item">
      <LabelTitle title="回路负荷配置"></LabelTitle>
      <el-form
        :model="form"
        ref="form"
        size="small"
        class="add-form"
        :inline="true"
        v-show="showSearch"
        label-width="150px"
      >
        <el-form-item label="所属用户ID" prop="userId">
          <el-input
            disabled
            v-model="form.userId"
            placeholder="请输入所属用户ID"
            clearable
          />
        </el-form-item>
        <el-form-item label="所属回路" prop="circuitId">
          <el-select v-model="form.circuitId" placeholder="请选择所属回路" clearable @change="handleCircuit">
            <el-option
              v-for="dict in circuitOptions"
              :key="dict.value"
              :label="dict.label"
              :value="dict.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="最大负荷(KW)" prop="maxLoad">
          <el-input
            v-model="form.maxLoad"
            placeholder="请输入最大负荷(KW)"
            clearable
          />
        </el-form-item>
        <el-form-item label="早峰负荷(KW)" prop="morningPeak">
          <el-input
            v-model="form.morningPeak"
            placeholder="请输入早峰负荷(KW)"
            clearable
          />
        </el-form-item>
        <el-form-item label="腰峰负荷(KW)" prop="middayPeak">
          <el-input
            v-model="form.middayPeak"
            placeholder="请输入腰峰负荷(KW)"
            clearable
          />
        </el-form-item>
        <el-form-item label="晚峰负荷(KW)" prop="eveningPeak">
          <el-input
            v-model="form.eveningPeak"
            placeholder="请输入晚峰负荷(KW)"
            clearable
          />
        </el-form-item>
        <el-form-item label="调节方式" prop="adjustMethod">
          <el-select v-model="form.adjustMethod" placeholder="请选择调节方式" clearable>
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
            v-model="form.maxAdjustableLoad"
            placeholder="请输入最大可调节负荷(KW)"
            clearable
          />
        </el-form-item>
        <el-form-item label="可调节时段" prop="adjustablePeriod">
          <el-select
            v-model="form.adjustablePeriod"
            placeholder="请选择可调节时段"
            clearable
          >
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
            v-model="form.adjustableRatio"
            placeholder="请输入可调节比例(%)"
            clearable
          />
        </el-form-item>
        <el-form-item label="是否保安负荷" prop="isSecurityLoad">
          <el-select
            v-model="form.isSecurityLoad"
            placeholder="请选择是否保安负荷"
            clearable
          >
            <el-option
              v-for="dict in dict.type.sys_yes_no"
              :key="dict.value"
              :label="dict.label"
              :value="dict.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="提前通知执行时间" prop="noticeTime">
          <el-select
            v-model="form.noticeTime"
            placeholder="请选择提前通知执行时间"
            clearable
          >
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
            v-model="form.maxAdjustHours"
            placeholder="请输入最长连续调节时间"
            clearable
          />
        </el-form-item>
        <el-form-item label="恢复生产时间" prop="recoveryHours">
          <el-input
            v-model="form.recoveryHours"
            placeholder="请输入恢复生产时间"
            clearable
          />
        </el-form-item>
        <el-form-item label="是否可调节" prop="isAdjustable">
          <el-select v-model="form.isAdjustable" placeholder="请选择是否可调节" clearable>
            <el-option
              v-for="dict in dict.type.sys_yes_no"
              :key="dict.value"
              :label="dict.label"
              :value="dict.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="是否可控制" prop="isControllable">
          <el-select v-model="form.isControllable" placeholder="请选择是否可控制" clearable>
            <el-option
              v-for="dict in dict.type.sys_yes_no"
              :key="dict.value"
              :label="dict.label"
              :value="dict.value"
            />
          </el-select>
        </el-form-item>
<!--        <el-form-item label="预留字段1" prop="reserved1">
          <el-input
            v-model="form.reserved1"
            placeholder="请输入预留字段1"
            clearable
          />
        </el-form-item>
        <el-form-item label="预留字段2" prop="reserved2">
          <el-input
            v-model="form.reserved2"
            placeholder="请输入预留字段2"
            clearable
          />
        </el-form-item>-->
        <el-form-item label="备注信息" prop="remark">
          <el-input v-model="form.remark" type="textarea" placeholder="请输入内容" />
        </el-form-item>
      </el-form>

      <el-row :gutter="10" class="mb8">
        <el-col :span="1.5">
          <el-button
            v-if="!isEdit"
            type="primary"
            plain
            icon="el-icon-plus"
            size="mini"
            @click="submitForm"
            v-hasPermi="['sc:circuitInfo:add']"
            >新增</el-button
          >
          <el-button
            v-else
            type="primary"
            plain
            icon="el-icon-check"
            size="mini"
            @click="submitForm"
            v-hasPermi="['sc:circuitInfo:add']"
            >确认</el-button
          >
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
            >修改</el-button
          >
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
            >删除</el-button
          >
        </el-col>
<!--        <el-col :span="1.5">
          <el-button
            type="warning"
            plain
            icon="el-icon-download"
            size="mini"
            @click="handleExport"
            v-hasPermi="['sc:circuitLoadConfig:export']"
            >导出</el-button
          >
        </el-col>-->
      </el-row>

      <el-table
        v-loading="loading"
        :data="circuitLoadConfigList"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55" align="center" />
<!--        <el-table-column label="主键ID" align="center" prop="id" />-->
<!--        <el-table-column label="所属用户ID" align="center" prop="userId" />-->
        <el-table-column label="所属回路ID" align="center" prop="circuitId" />
        <el-table-column label="最大负荷(KW)" align="center" prop="maxLoad" />
        <el-table-column label="早峰负荷(KW)" align="center" prop="morningPeak" />
        <el-table-column label="腰峰负荷(KW)" align="center" prop="middayPeak" />
        <el-table-column label="晚峰负荷(KW)" align="center" prop="eveningPeak" />
        <el-table-column label="调节方式" align="center" prop="adjustMethod">
          <template slot-scope="scope">
            <dict-tag :options="dict.type.adjustment_method" :value="scope.row.adjustMethod" />
          </template>
        </el-table-column>
        <el-table-column label="最大可调节负荷(KW)" align="center" prop="maxAdjustableLoad" />
        <el-table-column label="可调节时段" align="center" prop="adjustablePeriod">
          <template slot-scope="scope">
            <dict-tag :options="dict.type.adjustment_period" :value="scope.row.adjustablePeriod" />
          </template>
        </el-table-column>
        <el-table-column label="可调节比例(%)" align="center" prop="adjustableRatio" />
        <el-table-column label="是否保安负荷" align="center" prop="isSecurityLoad">
          <template slot-scope="scope">
            <dict-tag :options="dict.type.sys_yes_no" :value="scope.row.isSecurityLoad" />
          </template>
        </el-table-column>
        <el-table-column label="提前通知执行时间" align="center" prop="noticeTime">
          <template slot-scope="scope">
            <dict-tag :options="dict.type.advance_notice_time" :value="scope.row.noticeTime" />
          </template>
        </el-table-column>
        <el-table-column label="最长连续调节时间" align="center" prop="maxAdjustHours" />
        <el-table-column label="恢复生产时间" align="center" prop="recoveryHours" />
        <el-table-column label="是否可调节" align="center" prop="isAdjustable">
          <template slot-scope="scope">
            <dict-tag :options="dict.type.sys_yes_no" :value="scope.row.isAdjustable" />
          </template>
        </el-table-column>
        <el-table-column label="是否可控制" align="center" prop="isControllable">
          <template slot-scope="scope">
            <dict-tag :options="dict.type.sys_yes_no" :value="scope.row.isControllable" />
          </template>
        </el-table-column>
<!--        <el-table-column label="预留字段1" align="center" prop="reserved1" />
        <el-table-column label="预留字段2" align="center" prop="reserved2" />
        <el-table-column label="备注信息" align="center" prop="remark" />-->
      </el-table>

      <pagination
        v-show="total > 0"
        :total="total"
        :page.sync="queryParams.pageNum"
        :limit.sync="queryParams.pageSize"
        @pagination="getList"
      />
    </div>
  </div>
</template>

<script>
import {
  listCircuitLoadConfig,
  getCircuitLoadConfig,
  delCircuitLoadConfig,
  addCircuitLoadConfig,
  updateCircuitLoadConfig,
  getCircuitOption,
} from "@/api/sc/circuitLoadConfig";
import LabelTitle from "./LabelTitle.vue";
import LoadInfo from "./loadInfo.vue";

const default_form = {
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
}
export default {
  name: "CircuitLoadConfig",
  components: { LoadInfo, LabelTitle },
  dicts: ["advance_notice_time", "adjustment_period", "sys_yes_no", "adjustment_method"],
  props: {
    formData: {
      type: Object,
      default: () => {
        return {};
      },
    },
  },
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
      form: JSON.parse(JSON.stringify(default_form)),
      // 表单校验
      rules: {},
      isEdit: false,
      circuitOptions: [],
    };
  },
  created() {
    this.form.userId = this.formData.id;
  },
  mounted() {
    this.getList();
    getCircuitOption(this.formData.id).then((response) => {
      this.circuitOptions = response.data;
    });
  },
  methods: {
    // 回路选择
    handleCircuit(val) {
      const filter = this.circuitOptions.filter((item) => item.value === val);
      if (filter.length > 0) {
        this.form.reserved1 = filter[0].label;
      }
    },
    /** 查询回路负荷配置列表 */
    getList() {
      this.loading = true;
      listCircuitLoadConfig({...this.queryParams, userId: this.formData.id}).then((response) => {
        this.circuitLoadConfigList = response.rows;
        this.total = response.total;
        this.loading = false;
      });
    },
    // 表单重置
    reset() {
      this.form = {
        ...JSON.parse(JSON.stringify(default_form)),
        userId: this.formData.id,
      };
      this.resetForm("form");
      this.isEdit = false;
    },
    // 多选框选中数据
    handleSelectionChange(selection) {
      this.ids = selection.map((item) => item.id);
      this.single = selection.length !== 1;
      this.multiple = !selection.length;
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids;
      getCircuitLoadConfig(id).then((response) => {
        this.form = response.data;
      });
      this.isEdit = true;
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate((valid) => {
        if (valid) {
          if (this.form.id != null) {
            updateCircuitLoadConfig(this.form).then((response) => {
              this.$modal.msgSuccess("修改成功");
              this.getList();
              this.reset();
            });
          } else {
            addCircuitLoadConfig(this.form).then((response) => {
              this.$modal.msgSuccess("新增成功");
              this.getList();
              this.reset();
            });
          }
        }
      });
    },
    /** 删除按钮操作 */
    handleDelete(row) {
      const ids = row.id || this.ids;
      this.$modal
        .confirm('是否确认删除回路负荷配置编号为"' + ids + '"的数据项？')
        .then(function () {
          return delCircuitLoadConfig(ids);
        })
        .then(() => {
          this.getList();
          this.$modal.msgSuccess("删除成功");
        })
        .catch(() => {});
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download(
        "sc/circuitLoadConfig/export",
        {
          ...this.queryParams,
        },
        `circuitLoadConfig_${new Date().getTime()}.xlsx`
      );
    },
  },
};
</script>

<style lang="scss" scoped>
.circuit-load-config {
  max-height: 65vh;
  overflow-y: auto;
  overflow-x: hidden;
  .circuit-load-config_item {
    margin-bottom: 20px;
    .add-form {
      margin-top: 16px;
    }
  }
}
</style>
