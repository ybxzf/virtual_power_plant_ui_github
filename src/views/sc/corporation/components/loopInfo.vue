<template>
  <div>
    <el-form ref="form" :model="form" :rules="rules" label-width="100px" :inline="true"
      style="max-height: 65vh;overflow: auto;margin-bottom: 10px;">
      <el-form-item label="所属用户ID" prop="userId">
        <el-input v-model="form.userId" disabled placeholder="请输入所属用户ID" />
      </el-form-item>
      <el-form-item label="配电回路名称" prop="circuitName">
        <el-input v-model="form.circuitName" placeholder="请输入配电回路名称" />
      </el-form-item>
      <el-form-item label="配电室名称" prop="distributionRoom">
        <el-input v-model="form.distributionRoom" placeholder="请输入配电室名称" />
      </el-form-item>
      <el-form-item label="供电线路" prop="powerLine">
        <el-input v-model="form.powerLine" placeholder="请输入供电线路" />
      </el-form-item>
      <el-form-item label="电压等级" prop="voltageLevel">
        <el-select v-model="form.voltageLevel" placeholder="请选择电压等级">
          <el-option v-for="dict in dict.type.supply_voltage" :key="dict.value" :label="dict.label"
            :value="dict.value"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="是否可控回路" prop="isControllable">
        <el-select v-model="form.isControllable" placeholder="请选择是否可控回路">
          <el-option v-for="dict in dict.type.sys_yes_no" :key="dict.value" :label="dict.label"
            :value="dict.value"></el-option>
        </el-select>
      </el-form-item>
<!--      <el-form-item label="所属区域" prop="area">
        <el-input v-model="form.area" placeholder="请输入所属区域" />
      </el-form-item>-->

      <el-form-item label="开关类型" prop="switchType">
        <el-input v-model="form.switchType" placeholder="请输入开关类型" />
      </el-form-item>
      <el-form-item label="开关型号" prop="switchModel">
        <el-input v-model="form.switchModel" placeholder="请输入开关型号" />
      </el-form-item>
      <el-form-item label="备注信息" prop="remark">
        <el-input v-model="form.remark" type="textarea" placeholder="请输入内容" />
      </el-form-item>
    </el-form>
    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button v-if="!isEdit" type="primary" plain icon="el-icon-plus" size="mini" @click="submitForm"
          v-hasPermi="['sc:circuitInfo:add']">新增</el-button>
        <el-button v-else type="primary" plain icon="el-icon-check" size="mini" @click="submitForm"
          v-hasPermi="['sc:circuitInfo:add']">确认</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button type="success" plain icon="el-icon-edit" size="mini" :disabled="single" @click="handleUpdate"
          v-hasPermi="['sc:circuitInfo:edit']">修改</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button type="danger" plain icon="el-icon-delete" size="mini" :disabled="multiple" @click="handleDelete"
          v-hasPermi="['sc:circuitInfo:remove']">删除</el-button>
      </el-col>
<!--      <el-col :span="1.5">
        <el-button type="warning" plain icon="el-icon-download" size="mini" @click="handleExport"
          v-hasPermi="['sc:circuitInfo:export']">导出</el-button>
      </el-col>-->
      <!-- <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar> -->
    </el-row>

    <el-table v-loading="loading" :data="circuitInfoList" @selection-change="handleSelectionChange" height="300">
      <el-table-column type="selection" width="55" align="center" />
<!--      <el-table-column label="主键ID" align="center" prop="id" />
      <el-table-column label="所属用户ID" align="center" prop="userId" />-->
      <el-table-column label="配电回路名称" align="center" prop="circuitName" />
      <el-table-column label="所属区域" align="center" prop="area" />
      <el-table-column label="配电室名称" align="center" prop="distributionRoom" />
      <el-table-column label="配电室类型" align="center" prop="roomType" />
      <el-table-column label="电压等级" align="center" prop="voltageLevel">
        <template slot-scope="scope">
          <dict-tag :options="dict.type.supply_voltage" :value="scope.row.voltageLevel" />
        </template>
      </el-table-column>
      <el-table-column label="供电线路" align="center" prop="powerLine" />
      <el-table-column label="是否可控回路" align="center" prop="isControllable">
        <template slot-scope="scope">
          <dict-tag :options="dict.type.sys_yes_no" :value="scope.row.isControllable" />
        </template>
      </el-table-column>
      <el-table-column label="开关类型" align="center" prop="switchType" />
      <el-table-column label="开关型号" align="center" prop="switchModel" />
<!--      <el-table-column label="备注信息" align="center" prop="remark" />-->
      <!-- <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
                <template slot-scope="scope">
                    <el-button size="mini" type="text" icon="el-icon-edit" @click="handleUpdate(scope.row)"
                        v-hasPermi="['sc:circuitInfo:edit']">修改</el-button>
                    <el-button size="mini" type="text" icon="el-icon-delete" @click="handleDelete(scope.row)"
                        v-hasPermi="['sc:circuitInfo:remove']">删除</el-button>
                </template>
            </el-table-column> -->
    </el-table>

    <pagination v-show="total > 0" :total="total" :page.sync="queryParams.pageNum" :limit.sync="queryParams.pageSize"
      @pagination="getList" />
    <!-- <div slot="footer" class="dialog-footer">
            <el-button type="primary" @click="submitForm">确 定</el-button>
            <el-button @click="cancel">取 消</el-button>
        </div> -->
  </div>
</template>
<script>
import { listCircuitInfo, getCircuitByUserId, getCircuitInfo, delCircuitInfo, addCircuitInfo, updateCircuitInfo } from "@/api/sc/circuitInfo";

const default_form = {
  id: null,
  userId: null,
  circuitName: null,
  distributionRoom: null,
  voltageLevel: null,
  isControllable: null,
  area: null,
  roomType: null,
  powerLine: null,
  switchType: null,
  switchModel: null,
  reserved1: null,
  reserved2: null,
  remark: null
}
export default {
  name: 'LoopInfo',
  dicts: ['supply_voltage', 'sys_yes_no'],
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
      loading: false,
      ids: [],// 选中数组
      single: true,// 非多个禁用
      multiple: true,// 非多个禁用
      showSearch: true,// 显示搜索条件
      total: 0,// 总条数
      circuitInfoList: [],//回路信息列表
      queryParams: {// 查询参数
        pageNum: 1,
        pageSize: 10,
        userId: null,
        circuitName: null,
        distributionRoom: null,
        voltageLevel: null,
        isControllable: null,
        area: null,
        roomType: null,
        powerLine: null,
        switchType: null,
        switchModel: null,
      },
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
      form: JSON.parse(JSON.stringify(default_form)),
      isEdit: false,
    }
  },
  computed: {

  },
  watch: {

  },
  created() {
    this.form.userId = this.formData.id;
  },
  mounted() {
    console.log('dict.type.sys_yes_no', this.dict.type.sys_yes_no);

    // this.getLoopInfo();
    this.getList();
  },
  methods: {
    /** 查询负荷信息列表 */
    // getLoopInfo() {
    //   this.loading = true;
    //   const params = {
    //     userId: this.form.userId,
    //   };
    //   getCircuitByUserId(params).then(response => {
    //     this.loading = false;
    //   });
    // },
    // 多选框选中数据
    handleSelectionChange(selection) {
      this.ids = selection.map(item => item.id)
      this.single = selection.length !== 1
      this.multiple = !selection.length
    },

    /** 查询回路信息列表 */
    getList() {
      this.loading = true;
      listCircuitInfo({ ...this.queryParams, userId: this.formData.id }).then(response => {
        this.circuitInfoList = response.rows;
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
      this.ids = selection.map(item => item.id)
      this.single = selection.length !== 1
      this.multiple = !selection.length
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids
      getCircuitInfo(id).then(response => {
        this.form = response.data;
      });
      this.isEdit = true;
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id != null) {
            updateCircuitInfo(this.form).then(response => {
              this.$modal.msgSuccess("修改成功");
              this.getList();
              this.reset();
            });
          } else {
            addCircuitInfo(this.form).then(response => {
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
      this.$modal.confirm('是否确认删除回路信息编号为"' + ids + '"的数据项？').then(function () {
        return delCircuitInfo(ids);
      }).then(() => {
        this.getList();
        this.$modal.msgSuccess("删除成功");
      }).catch(() => { });
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download('sc/circuitInfo/export', {
        ...this.queryParams
      }, `circuitInfo_${new Date().getTime()}.xlsx`)
    }
  }
}
</script>
<style lang="scss" scoped>
.dialog-footer {
  text-align: right;
}
</style>
