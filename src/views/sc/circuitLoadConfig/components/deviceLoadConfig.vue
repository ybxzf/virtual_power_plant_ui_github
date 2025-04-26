<template>
  <div class="circuit-load-config">
    <div class="circuit-load-config_item">
      <LabelTitle title="负荷信息" />
      <LoadInfo formType="description" :form-data="formData"></LoadInfo>
    </div>
    <div class="circuit-load-config_item">
      <LabelTitle title="设备负荷配置" />
      <el-form
        :model="form"
        ref="form"
        class="add-form"
        size="small"
        :inline="true"
        v-show="showSearch"
        label-width="150px"
      >
        <el-form-item label="所属用户ID" prop="userId">
          <el-input disabled v-model="form.userId" placeholder="请输入所属用户ID" clearable />
        </el-form-item>
        <el-form-item label="所属设备" prop="deviceId">
          <el-select v-model="form.deviceId" placeholder="请选择所属设备" clearable @change="handleDevice">
            <el-option
              v-for="dict in deviceOptions"
              :key="dict.value"
              :label="dict.label"
              :value="dict.value"
            />
          </el-select>
        </el-form-item>
<!--        <el-form-item label="设备所属回路ID" prop="circuitId">
          <el-input v-model="form.circuitId" placeholder="请输入设备所属回路ID" clearable />
        </el-form-item>-->
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
<!--        <el-table-column label="调节方式" align="center" prop="adjustMethod">-->
<!--          <template slot-scope="scope">-->
<!--            <dict-tag :options="dict.type.adjustment_method" :value="scope.row.adjustMethod" />-->
<!--          </template>-->
<!--        </el-table-column>-->
        <el-form-item label="最大可调节负荷(KW)" prop="maxAdjustableLoad">
          <el-input
            v-model="form.maxAdjustableLoad"
            placeholder="请输入最大可调节负荷(KW)"
            clearable
          />
        </el-form-item>
        <el-form-item label="可调节时段" prop="adjustablePeriod">
          <el-select v-model="form.adjustablePeriod" placeholder="请选择可调节时段" clearable>
            <el-option
              v-for="dict in dict.type.adjustment_period"
              :key="dict.value"
              :label="dict.label"
              :value="dict.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="可调节比例(%)" prop="adjustableRatio">
          <el-input v-model="form.adjustableRatio" placeholder="请输入可调节比例(%)" clearable />
        </el-form-item>
        <el-form-item label="提前通知执行时间" prop="noticeTime">
          <el-select v-model="form.noticeTime" placeholder="请选择提前通知执行时间" clearable>
            <el-option
              v-for="dict in dict.type.advance_notice_time"
              :key="dict.value"
              :label="dict.label"
              :value="dict.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="最长连续调节时间" prop="maxAdjustHours">
          <el-input v-model="form.maxAdjustHours" placeholder="请输入最长连续调节时间" clearable />
        </el-form-item>
        <el-form-item label="恢复生产时间" prop="recoveryHours">
          <el-input v-model="form.recoveryHours" placeholder="请输入恢复生产时间" clearable />
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
          <el-input v-model="form.reserved1" placeholder="请输入预留字段1" clearable />
        </el-form-item>
        <el-form-item label="预留字段2" prop="reserved2">
          <el-input v-model="form.reserved2" placeholder="请输入预留字段2" clearable />
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
            v-hasPermi="['sc:deviceLoadConfig:edit']"
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
            v-hasPermi="['sc:deviceLoadConfig:remove']"
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
            v-hasPermi="['sc:deviceLoadConfig:export']"
            >导出</el-button
          >
        </el-col>-->
      </el-row>

      <el-table
        v-loading="loading"
        :data="deviceLoadConfigList"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55" align="center" />
<!--        <el-table-column label="主键ID" align="center" prop="id" />-->
<!--        <el-table-column label="所属用户ID" align="center" prop="userId" />-->
        <el-table-column label="所属设备ID" align="center" prop="deviceId" />
<!--        <el-table-column label="设备所属回路ID" align="center" prop="circuitId" />-->
        <el-table-column label="调节方式" align="center" prop="adjustMethod" />
<!--        <el-table-column label="调节方式" align="center" prop="adjustMethod">
          <template slot-scope="scope">
            <dict-tag :options="dict.type.adjustment_method" :value="scope.row.adjustMethod" />
          </template>
        </el-table-column>-->
        <el-table-column label="最大可调节负荷(KW)" align="center" prop="maxAdjustableLoad" />
        <el-table-column label="可调节时段" align="center" prop="adjustablePeriod">
          <template slot-scope="scope">
            <dict-tag :options="dict.type.adjustment_period" :value="scope.row.adjustablePeriod" />
          </template>
        </el-table-column>
        <el-table-column label="可调节比例(%)" align="center" prop="adjustableRatio" />
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
  listDeviceLoadConfig,
  getDeviceLoadConfig,
  delDeviceLoadConfig,
  addDeviceLoadConfig,
  updateDeviceLoadConfig,
  getDeviceOption,
} from "@/api/sc/deviceLoadConfig";
import LabelTitle from "@/views/sc/circuitLoadConfig/components/LabelTitle.vue";
import LoadInfo from "@/views/sc/circuitLoadConfig/components/loadInfo.vue";

const default_form = {
  id: null,
  userId: null,
  deviceId: null,
  circuitId: null,
  adjustMethod: null,
  maxAdjustableLoad: null,
  adjustablePeriod: null,
  adjustableRatio: null,
  noticeTime: null,
  maxAdjustHours: null,
  recoveryHours: null,
  isAdjustable: null,
  isControllable: null,
  updateBy: null,
  updateTime: null,
  reserved1: null,
  reserved2: null,
  remark: null,
};

export default {
  name: "DeviceLoadConfig",
  components: { LoadInfo, LabelTitle },
  dicts: ["advance_notice_time", "adjustment_period", "sys_yes_no","adjustment_method"],
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
      // 设备负荷配置表格数据
      deviceLoadConfigList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        userId: null,
        deviceId: null,
        circuitId: null,
        adjustMethod: null,
        maxAdjustableLoad: null,
        adjustablePeriod: null,
        adjustableRatio: null,
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
      deviceOptions: [],
    };
  },
  created() {
    this.form.userId = this.formData.id;
  },
  mounted() {
    this.getList();
    getDeviceOption(this.formData.id).then((response) => {
      this.deviceOptions = response.data;
    });
  },
  methods: {
    // 回路选择
    handleDevice(val) {
      const filter = this.deviceOptions.filter((item) => item.value === val);
      if (filter.length > 0) {
        this.form.reserved1 = filter[0].label;
      }
    },
    /** 查询设备负荷配置列表 */
    getList() {
      this.loading = true;
      listDeviceLoadConfig(this.queryParams).then((response) => {
        this.deviceLoadConfigList = response.rows;
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
      getDeviceLoadConfig(id).then((response) => {
        this.form = response.data;
      });
      this.isEdit = true;
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate((valid) => {
        if (valid) {
          if (this.form.id != null) {
            updateDeviceLoadConfig(this.form).then((response) => {
              this.$modal.msgSuccess("修改成功");
              this.getList();
              this.reset();
            });
          } else {
            addDeviceLoadConfig(this.form).then((response) => {
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
        .confirm('是否确认删除设备负荷配置编号为"' + ids + '"的数据项？')
        .then(function () {
          return delDeviceLoadConfig(ids);
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
        "sc/deviceLoadConfig/export",
        {
          ...this.queryParams,
        },
        `deviceLoadConfig_${new Date().getTime()}.xlsx`
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
