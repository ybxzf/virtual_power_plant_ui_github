<template>
  <div>
    <el-form ref="form" :model="form" :rules="rules" label-width="180px" :inline="true">
      <el-form-item label="用户名称" prop="userName">
        <el-input v-model="form.userName" placeholder="请输入用户名称" />
      </el-form-item>
      <el-form-item label="用户编号" prop="userCode">
        <el-input v-model="form.userCode" placeholder="请输入用户编号" />
      </el-form-item>
      <el-form-item label="统一社会信用代码" prop="creditCode">
        <el-input v-model="form.creditCode" placeholder="请输入统一社会信用代码" />
      </el-form-item>
      <el-form-item label="所属区域" prop="areaCodePath">
        <el-cascader v-model="areaCodePath" :options="areaOptions" clearable @change="handleChange"
          placeholder="请选择所属区域" :props="{
            checkStrictly: false,
            // emitPath: false,
            // expandTrigger: 'hover'
          }"></el-cascader>
      </el-form-item>
      <el-form-item label="注册资金(万元)" prop="registeredCapital">
        <el-input v-model="form.registeredCapital" type="number" :precision="2" placeholder="请输入注册资金(万元)" />
      </el-form-item>
      <el-form-item label="用电类别" prop="powerCategory">
        <el-select v-model="form.powerCategory" placeholder="请选择用电类别">
          <el-option v-for="dict in dict.type.electricity_state" :key="dict.value" :label="dict.label"
            :value="dict.value"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="供电电压" prop="supplyVoltage">
        <el-select v-model="form.supplyVoltage" placeholder="请选择供电电压">
          <el-option v-for="dict in dict.type.supply_voltage" :key="dict.value" :label="dict.label"
            :value="dict.value"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="行业分类" prop="industryCategory">
        <el-select v-model="form.industryCategory" placeholder="请选择行业分类">
          <el-option v-for="dict in dict.type.industry_type" :key="dict.value" :label="dict.label"
            :value="dict.value"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="行业小类" prop="industrySubclass">
        <el-input v-model="form.industrySubclass" placeholder="请输入行业小类" />
      </el-form-item>
      <el-form-item label="是否需求响应签约" prop="isDemandResponse">
        <el-radio-group v-model="form.isDemandResponse">
          <el-radio v-for="dict in dict.type.sys_yes_no" :key="dict.value" :label="dict.value">{{ dict.label
          }}</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="合约生效日期" prop="contractStart">
        <el-date-picker clearable v-model="form.contractStart" type="date" value-format="yyyy-MM-dd"
          placeholder="请选择合约生效日期">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="合约有效期(年)" prop="contractPeriod">
        <el-input v-model="form.contractPeriod" placeholder="请输入合约有效期(年)" />
      </el-form-item>
      <el-form-item label="联系人" prop="contactPerson">
        <el-input v-model="form.contactPerson" placeholder="请输入联系人" />
      </el-form-item>
      <el-form-item label="联系电话" prop="contactPhone">
        <el-input v-model="form.contactPhone" placeholder="请输入联系电话" />
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="form.email" placeholder="请输入邮箱" />
      </el-form-item>
      <!-- <el-form-item label="所属虚拟电厂ID" prop="virtualPlant">
        <el-select v-model="form.virtualPlant">
          <el-option v-for="item in companyOptions" :key="item.value" :label="item.label"
            :value="item.value"></el-option>
        </el-select>
        <el-input v-model="form.virtualPlant" placeholder="请输入所属虚拟电厂id" />
      </el-form-item> -->
      <el-form-item label="所属虚拟电厂" prop="virtualPlant">
        <el-select v-model="form.virtualPlant" placeholder="请选择所属虚拟电厂" @change="handleExtend1">
          <el-option v-for="item in companyOptions" :key="item.value" :label="item.label"
            :value="item.value"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="所属变电站" prop="substation">
        <el-input v-model="form.substation" placeholder="请输入所属变电站" />
      </el-form-item>
      <el-form-item label="所属线路" prop="circuit">
        <el-input v-model="form.circuit" placeholder="请输入所属线路" />
      </el-form-item>
      <el-form-item label="用户采集分类" prop="collectCategory">
        <el-select v-model="form.collectCategory" placeholder="请选择用户采集分类">
          <el-option v-for="dict in dict.type.collection_state" :key="dict.value" :label="dict.label"
            :value="dict.value"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="用电地址" prop="powerAddress">
        <el-input v-model="form.powerAddress" placeholder="请输入用电地址" />
      </el-form-item>
      <el-form-item label="用户状态" prop="userStatus">
        <el-select v-model="form.userStatus" placeholder="请选择用户状态">
          <el-option v-for="dict in dict.type.corporation_state" :key="dict.value" :label="dict.label"
            :value="dict.value"></el-option>
        </el-select>
      </el-form-item>
      <!--        <el-form-item label="所属虚拟电厂" prop="extend1">
          <el-input v-model="form.extend1" placeholder="请输入所属虚拟电厂" />
        </el-form-item>
        <el-form-item label="扩展2" prop="extend2">
          <el-input v-model="form.extend2" placeholder="请输入扩展2" />
        </el-form-item>-->
      <el-form-item label="备注" prop="remark">
        <el-input v-model="form.remark" type="textarea" placeholder="请输入内容" />
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="primary" @click="submitForm">确 定</el-button>
      <el-button @click="cancel">取 消</el-button>
    </div>
  </div>
</template>
<script>
import { listCorporation, getCorporation, delCorporation, addCorporation, updateCorporation, getAreaTree, getCompanyOption } from "@/api/sc/corporation";
import { chinaCity } from './chinaCity.js'

export default {
  name: 'AddDialog',
  dicts: ['supply_voltage', 'industry_type', 'sys_yes_no', 'collection_state', 'electricity_state', 'corporation_state'],
  props: {
    formData: {
      type: Object,
      default: () => {
        return {}
      }
    },
  },
  data() {
    return {
      // 表单校验
      rules: {
        userName: [
          { required: true, message: "用户名称不能为空", trigger: "blur" }
        ],
        creditCode: [
          { required: true, message: "统一社会信用代码不能为空", trigger: "blur" }
        ],
        isDemandResponse: [
          { required: true, message: "是否需求响应签约用户不能为空", trigger: "change" }
        ],
      },
      areaOptions: [],//省市区列表
      areaCodePath: [],//省市区存储的所有值
      form: {},
      companyOptions: [],//虚拟电厂列表
    }
  },
  computed: {

  },
  watch: {
    form: {
      handler(newVal, oldVal) {
        if (newVal.areaCode !== oldVal.areaCode) {
          if (this.areaOptions.length == 0) {
            //获取区域信息
            getAreaTree().then(response => {
              this.areaOptions = response.data;
              this.areaCodePath = this.findFullPath(newVal.areaCode, this.areaOptions) || [];
            });
          } else {
            this.areaCodePath = this.findFullPath(newVal.areaCode, this.areaOptions) || [];
          }
        }
      },
      deep: true,
      immidiate: true,
    },
  },
  created() {
    this.form = JSON.parse(JSON.stringify(this.formData));
  },
  mounted() {
    getCompanyOption().then(response => {
      this.companyOptions = response.data;
    })
  },

  methods: {
    //虚拟电厂选择
    handleExtend1(val) {
      const filter = this.companyOptions.filter(item => item.value == val) || [];
      if (filter.length > 0) {
        this.form.extend1 = filter[0].label;
      }
    },
    /** 提交按钮 */
    submitForm() {
      console.log('this.form', this.form);
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id != null) {
            updateCorporation(this.form).then(response => {
              this.$modal.msgSuccess("修改成功");
              this.$emit('close');
            });
          } else {
            addCorporation(this.form).then(response => {
              this.$modal.msgSuccess("新增成功");
              this.$emit('close');
            });
          }
        }
      });
    },
    //取消按钮
    cancel() {
      this.$emit('close');
    },
    // 级联选择器值改变时触发
    handleChange(val) {
      console.log('val', val);
      this.form.areaCode = val[val.length - 1]; // 获取最后一级的值
      // this.form.areaCode = val;
    },
    // 根据最后一级的值查找完整路径
    findFullPath(targetValue, options) {
      // 递归查找函数
      function findPath(nodes, path = []) {
        for (const node of nodes) {
          // 如果当前节点值匹配，返回当前路径
          if (node.value == targetValue) {
            return [...path, node.value];
          }
          // 如果有子节点，递归查找
          if (node.children && node.children.length > 0) {
            const foundPath = findPath(node.children, [...path, node.value]);
            if (foundPath) return foundPath;
          }
        }
        return null; // 未找到返回null
      }

      return findPath(options) || []; // 返回找到的路径或空数组
    },
  }
}
</script>
<style lang="scss" scoped>
.dialog-footer {
  text-align: right;
}
</style>
