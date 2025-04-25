<template>
  <div v-loading="loading">
    <template v-if="isForm">
      <el-form
        ref="form"
        :model="form"
        :rules="rules"
        label-width="300px"
        :inline="true"
        style="max-height: 65vh; overflow: auto; margin-bottom: 10px"
      >
        <el-form-item label="所属用户ID" prop="userId">
          <el-input v-model="form.userId" disabled placeholder="请输入所属用户ID" />
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
          <el-input
            v-model="form.summerAvgLoad"
            placeholder="请输入近三年夏季最大负荷日平均负荷(kW)"
          />
        </el-form-item>
        <el-form-item label="近三年冬季最大负荷日平均负荷(kW)" prop="winterAvgLoad">
          <el-input
            v-model="form.winterAvgLoad"
            placeholder="请输入近三年冬季最大负荷日平均负荷(kW)"
          />
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
    </template>
    <template v-else>
      <el-descriptions title="" :column="5" border>
        <el-descriptions-item label="所属用户ID">{{ form.userId }}</el-descriptions-item>
        <el-descriptions-item label="年用电量(KWH)">{{ form.annualElectricity }}</el-descriptions-item>
        <el-descriptions-item label="合同容量(KVA)">{{ form.contractCapacity }}</el-descriptions-item>
        <el-descriptions-item label="运行容量">{{ form.runningCapacity }}</el-descriptions-item>
        <el-descriptions-item label="近三年夏季最大负荷(kw)">{{ form.summerMaxLoad }}</el-descriptions-item>
        <el-descriptions-item label="近三年冬季最大负荷(kW)">{{ form.winterMaxLoad }}</el-descriptions-item>
        <el-descriptions-item label="近三年夏季最大负荷日平均负荷(kW)">{{ form.summerAvgLoad }}</el-descriptions-item>
        <el-descriptions-item label="近三年冬季最大负荷日平均负荷(kW)">{{ form.winterAvgLoad }}</el-descriptions-item>
        <el-descriptions-item label="需求响应任务量(kW)">{{ form.demandResponse }}</el-descriptions-item>
        <el-descriptions-item label="实际响应量(kW)">{{ form.actualResponse }}</el-descriptions-item>
        <el-descriptions-item label="每年生产时段">{{ form.productionPeriod }}</el-descriptions-item>
        <el-descriptions-item label="保安负荷容量(kWV)">{{ form.securityLoad }}</el-descriptions-item>
        <el-descriptions-item label="总配数量(个)">{{ form.totalDistribution }}</el-descriptions-item>
        <el-descriptions-item label="总配出线数量(个)">{{ form.totalOutlet }}</el-descriptions-item>
        <el-descriptions-item label="分配电压等级(KV)">{{ form.distributionVoltage }}</el-descriptions-item>
        <el-descriptions-item label="高压馈线数量(个)">{{ form.highVoltageLines }}</el-descriptions-item>
        <el-descriptions-item label="可调节高压馈线数量(个)">{{ form.adjustableHighLines }}</el-descriptions-item>
        <el-descriptions-item label="可调节低压馈线数量(个)">{{ form.adjustableLowLines }}</el-descriptions-item>
        <el-descriptions-item label="保安负荷设备名称">{{ form.securityDevice }}</el-descriptions-item>
        <el-descriptions-item label="总配电压等级(KV)">{{ form.totalVoltage }}</el-descriptions-item>
        <el-descriptions-item label="分配数量(个)">{{ form.subDistribution }}</el-descriptions-item>
        <el-descriptions-item label="分配出线数量(个)">{{ form.subOutlet }}</el-descriptions-item>
        <el-descriptions-item label="高压馈线电压等级(KV)">{{ form.hvFeederVoltage }}</el-descriptions-item>
        <el-descriptions-item label="低压馈线数量(个)">{{ form.lvFeederCount }}</el-descriptions-item>
        <el-descriptions-item label="备注信息">{{ form.remark }}</el-descriptions-item>
      </el-descriptions>
    </template>
  </div>
</template>
<script>
import {
  listLoadInfo,
  getLoadByUserId,
  getLoadInfo,
  delLoadInfo,
  addLoadInfo,
  updateLoadInfo,
} from "@/api/sc/loadInfo";

const default_form = {
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
  remark: null,
};
export default {
  name: "LoadInfo",
  props: {
    formData: {
      type: Object,
      default: () => {
        return {};
      },
    },
    formType: {
      type: String,
      default: "form",
    },
  },
  data() {
    return {
      loading: false,
      // 表单校验
      rules: {
        userName: [{ required: true, message: "用户名称不能为空", trigger: "blur" }],
        creditCode: [{ required: true, message: "统一社会信用代码不能为空", trigger: "blur" }],
        isDemandResponse: [
          { required: true, message: "是否需求响应签约用户不能为空", trigger: "change" },
        ],
      },
      form: JSON.parse(JSON.stringify(default_form)),
    };
  },
  computed: {
    isForm() {
      return this.formType === "form";
    },
  },
  watch: {},
  created() {
    // this.form.userId = this.formData.id;
  },
  mounted() {
    this.getLoadInfo();
  },
  methods: {
    /** 查询负荷信息列表 */
    getLoadInfo() {
      this.loading = true;
      const params = {
        userId: this.formData.id,
      };
      getLoadByUserId(params)
        .then((res) => {
          if (res.code == 200) {
            this.form = {
              ...JSON.parse(JSON.stringify(res.data)),
              userId: this.formData.id,
            };
          }
        })
        .finally(() => {
          this.loading = false;
        });
    },
    /** 提交按钮 */
    submitForm() {
      console.log("this.form", this.form);
      this.$refs["form"].validate((valid) => {
        if (valid) {
          if (this.form.id != null) {
            updateLoadInfo(this.form).then((response) => {
              this.$modal.msgSuccess("修改成功");
              this.$emit("close");
            });
          } else {
            addLoadInfo(this.form).then((response) => {
              this.$modal.msgSuccess("新增成功");
              this.$emit("close");
            });
          }
        }
      });
    },
    //取消按钮
    cancel() {
      this.$emit("close");
    },
    handleChange(val) {},
  },
};
</script>
<style lang="scss" scoped>
.dialog-footer {
  text-align: right;
}
</style>
