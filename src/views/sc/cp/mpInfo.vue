<template>
  <div class="app-container">
    <el-table v-loading="loading" :data="mpList" @selection-change="handleSelectionChange" @row-dblclick="handleUpdate">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="测量点标识" align="center" width="100" prop="cjMpId" />
      <el-table-column label="测量点名称" align="center" width="100" prop="cjMeterName" />
      <el-table-column label="所属区域" align="center" prop="areaId" />
      <el-table-column label="运行状态" align="center" prop="runStatus">
        <template slot-scope="scope">
          <dict-tag :options="dict.type.operational_status" :value="scope.row.runStatus" />
        </template>
      </el-table-column>
      <el-table-column label="测量类型" align="center" prop="mpType">
        <template slot-scope="scope">
          <dict-tag :options="dict.type.measurement_type" :value="scope.row.mpType" />
        </template>
      </el-table-column>
      <el-table-column label="电能表资产编号" align="center" width="120" prop="assetNo" />
      <el-table-column label="采集点标识" align="center" width="100" prop="cjCpNo" />
      <el-table-column label="在终端内的测量点号" align="center" width="140" prop="innerId" />
      <el-table-column label="测量点通讯参数模板标识" align="center" width="170" prop="mpParaTmpId" />
      <el-table-column label="电表通信地址" align="center" width="120" prop="commAddr" />
      <el-table-column label="电表开关状态" align="center" width="120" prop="meterSwitchStatus">
        <template slot-scope="scope">
          <dict-tag :options="dict.type.meter_switch_status" :value="scope.row.meterSwitchStatus" />
        </template>
      </el-table-column>
      <el-table-column label="下发状态" align="center" prop="isOnline">
        <template slot-scope="scope">
          <dict-tag :options="dict.type.issue_status" :value="scope.row.isOnline" />
        </template>
      </el-table-column>
      <el-table-column label="电表型号" align="center" prop="meterModelId" />
      <el-table-column label="接线方式" align="center" prop="wiringMode">
        <template slot-scope="scope">
          <dict-tag :options="dict.type.wiring_mode" :value="scope.row.wiringMode" />
        </template>
      </el-table-column>
      <el-table-column label="计量方式" align="center" prop="measMode">
        <template slot-scope="scope">
          <dict-tag :options="dict.type.measurement_mode" :value="scope.row.measMode" />
        </template>
      </el-table-column>
      <el-table-column label="PT变比值" align="center" prop="ptRatio">
        <template slot-scope="scope">
          <dict-tag :options="dict.type.pt_ratio" :value="scope.row.ptRatio" />
        </template>
      </el-table-column>
      <el-table-column label="CT 变比值" align="center" prop="ctRatio">
        <template slot-scope="scope">
          <dict-tag :options="dict.type.ct_ratio" :value="scope.row.ctRatio" />
        </template>
      </el-table-column>
      <el-table-column label="综合倍率" align="center" prop="tFactor" />
      <el-table-column label="计量方向" align="center" prop="bothWayCalc">
        <template slot-scope="scope">
          <dict-tag :options="dict.type.measurement_direction" :value="scope.row.bothWayCalc" />
        </template>
      </el-table-column>
      <el-table-column label="用户标识" align="center" prop="cjConsId" />
      <el-table-column label="是否总表" align="center" prop="cjTgTotal">
        <template slot-scope="scope">
          <dict-tag :options="dict.type.sys_yes_no" :value="scope.row.cjTgTotal" />
        </template>
      </el-table-column>
      <el-table-column label="安装位置" align="center" prop="instLoc" />
      <el-table-column label="安装日期" align="center" prop="instDate" width="100">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.instDate, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="安装人" align="center" prop="installerNo" />
      <el-table-column label="投运日期" align="center" prop="runDate" width="100">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.runDate, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="显示序号" align="center" prop="sortNo" />
      <el-table-column label="记录最后保存时间" align="center" prop="writeDate" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.writeDate, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="数据来源" align="center" prop="dataSource" />
      <el-table-column label="备注" align="center" prop="remark" />
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width" fixed="right" min-width="150">
        <template slot-scope="scope">
          <!-- <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['sc:mp:edit']"
          >修改</el-button> -->
          <el-button size="mini" type="text" icon="el-icon-delete" @click="handleDelete(scope.row)"
            v-hasPermi="['sc:mp:remove']">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total > 0" :total="total" :page.sync="queryParams.pageNum" :limit.sync="queryParams.pageSize"
      @pagination="getList" />
  </div>
</template>

<script>
import { listMp, getMp, delMp, addMp, updateMp } from "@/api/sc/mp";
import { getAreaTree } from "@/api/sc/corporation";
import LabelTitle from "@/views/sc/circuitLoadConfig/components/LabelTitle.vue";

export default {
  name: "MpInfo",
  components: { LabelTitle },
  dicts: ['meter_switch_status', 'measurement_type', 'measurement_mode', 'ct_ratio', 'sys_yes_no', 'measurement_direction', 'wiring_mode', 'pt_ratio', 'operational_status'],
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
      // 测量点表格数据
      mpList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        cjMeterName: null,
        areaId: null,
        runStatus: null,
        mpType: null,
        assetNo: null,
        cjCpNo: null,
        innerId: null,
        mpParaTmpId: null,
        commAddr: null,
        meterSwitchStatus: null,
        isOnline: null,
        meterModelId: null,
        wiringMode: null,
        measMode: null,
        ptRatio: null,
        ctRatio: null,
        tFactor: null,
        bothWayCalc: null,
        cjConsId: null,
        cjTgTotal: null,
        instLoc: null,
        instDate: null,
        installerNo: null,
        runDate: null,
        sortNo: null,
        writeDate: null,
        dataSource: null,
      },
      areaOptions: [],//省市区列表
      areaCodePath: [],//省市区存储的所有值
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        areaId: [
          { required: true, message: "所属区域不能为空", trigger: "blur" }
        ],
        mpType: [
          { required: true, message: "测量类型不能为空", trigger: "change" }
        ],
        assetNo: [
          { required: true, message: "电能表资产编号不能为空", trigger: "blur" }
        ],
        cjCpNo: [
          { required: true, message: "采集点标识不能为空", trigger: "blur" }
        ],
        innerId: [
          { required: true, message: "在终端内的测量点号不能为空", trigger: "blur" }
        ],
        mpParaTmpId: [
          { required: true, message: "测量点通讯参数模板标识不能为空", trigger: "blur" }
        ],
        commAddr: [
          { required: true, message: "电表通信地址不能为空", trigger: "blur" }
        ],
        meterSwitchStatus: [
          { required: true, message: "电表开关状态不能为空", trigger: "change" }
        ],
        meterModelId: [
          { required: true, message: "电表型号不能为空", trigger: "blur" }
        ],
        wiringMode: [
          { required: true, message: "接线方式不能为空", trigger: "change" }
        ],
        measMode: [
          { required: true, message: "计量方式不能为空", trigger: "change" }
        ],
        bothWayCalc: [
          { required: true, message: "计量方向不能为空", trigger: "change" }
        ],
        cjConsId: [
          { required: true, message: "用户标识不能为空", trigger: "blur" }
        ],
        cjTgTotal: [
          { required: true, message: "是否总表不能为空", trigger: "change" }
        ],
        instLoc: [
          { required: true, message: "安装位置不能为空", trigger: "blur" }
        ],
        instDate: [
          { required: true, message: "安装日期不能为空", trigger: "blur" }
        ],
        installerNo: [
          { required: true, message: "安装人不能为空", trigger: "blur" }
        ],
        runDate: [
          { required: true, message: "投运日期不能为空", trigger: "blur" }
        ],
        remark: [
          { required: true, message: "备注不能为空", trigger: "blur" }
        ]
      }
    };
  },
  watch: {
    form: {
      handler(newVal, oldVal) {
        if (newVal.areaId !== oldVal.areaId) {
          if (this.areaOptions.length == 0) {
            //获取区域信息
            getAreaTree().then(response => {
              this.areaOptions = response.data;
              this.areaCodePath = this.findFullPath(newVal.areaId, this.areaOptions) || [];
            });
          } else {
            this.areaCodePath = this.findFullPath(newVal.areaId, this.areaOptions) || [];
          }
        }
      },
      deep: true,
      immidiate: true,
    },
  },
  created() {
    this.getList();
  },
  methods: {
    /** 查询测量点列表 */
    getList() {
      this.loading = true;
      listMp(this.queryParams).then(response => {
        this.mpList = response.rows;
        this.total = response.total;
        this.loading = false;
      });
    },
    // 级联选择器值改变时触发
    handleChange(val) {
      console.log('val', val);
      this.form.areaId = val[val.length - 1]; // 获取最后一级的值
      // this.form.areaId = val;
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
    // 取消按钮
    cancel() {
      this.open = false;
      this.reset();
    },
    // 表单重置
    reset() {
      this.form = {
        cjMpId: null,
        cjMeterName: null,
        areaId: null,
        runStatus: null,
        mpType: null,
        assetNo: null,
        cjCpNo: null,
        innerId: null,
        mpParaTmpId: null,
        commAddr: null,
        meterSwitchStatus: null,
        isOnline: null,
        meterModelId: null,
        wiringMode: null,
        measMode: null,
        ptRatio: null,
        ctRatio: null,
        tFactor: null,
        bothWayCalc: null,
        cjConsId: null,
        cjTgTotal: null,
        instLoc: null,
        instDate: null,
        installerNo: null,
        runDate: null,
        sortNo: null,
        writeDate: null,
        dataSource: null,
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
      this.ids = selection.map(item => item.cjMpId)
      this.single = selection.length !== 1
      this.multiple = !selection.length
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
      this.open = true;
      this.title = "添加测量点";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const cjMpId = row.cjMpId || this.ids
      getMp(cjMpId).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改测量点";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.cjMpId != null) {
            updateMp(this.form).then(response => {
              this.$modal.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addMp(this.form).then(response => {
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
      const cjMpIds = row.cjMpId || this.ids;
      this.$modal.confirm('是否确认删除测量点编号为"' + cjMpIds + '"的数据项？').then(function () {
        return delMp(cjMpIds);
      }).then(() => {
        this.getList();
        this.$modal.msgSuccess("删除成功");
      }).catch(() => { });
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download('sc/mp/export', {
        ...this.queryParams
      }, `mp_${new Date().getTime()}.xlsx`)
    }
  }
};
</script>
<style lang="scss" scoped>
.el-dialog .el-form {
  height: 60vh;
  overflow: auto;
}
</style>
