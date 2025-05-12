<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="测量点名称" prop="cjMeterName">
        <el-input
          v-model="queryParams.cjMeterName"
          placeholder="请输入测量点名称"
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
          v-hasPermi="['sc:mp:add']"
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
          v-hasPermi="['sc:mp:edit']"
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
          v-hasPermi="['sc:mp:remove']"
        >删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['sc:mp:export']"
        >导出</el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="mpList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="测量点标识" align="center" prop="cjMpId" />
      <el-table-column label="测量点名称" align="center" prop="cjMeterName" />
      <el-table-column label="所属区域" align="center" prop="areaId" />
      <el-table-column label="运行状态" align="center" prop="runStatus">
        <template slot-scope="scope">
          <dict-tag :options="dict.type.operational_status" :value="scope.row.runStatus"/>
        </template>
      </el-table-column>
      <el-table-column label="测量类型" align="center" prop="mpType">
        <template slot-scope="scope">
          <dict-tag :options="dict.type.measurement_type" :value="scope.row.mpType"/>
        </template>
      </el-table-column>
      <el-table-column label="电能表资产编号" align="center" prop="assetNo" />
      <el-table-column label="采集点标识" align="center" prop="cjCpNo" />
      <el-table-column label="在终端内的测量点号" align="center" prop="innerId" />
      <el-table-column label="测量点通讯参数模板标识" align="center" prop="mpParaTmpId" />
      <el-table-column label="电表通信地址" align="center" prop="commAddr" />
      <el-table-column label="电表开关状态" align="center" prop="meterSwitchStatus">
        <template slot-scope="scope">
          <dict-tag :options="dict.type.meter_switch_status" :value="scope.row.meterSwitchStatus"/>
        </template>
      </el-table-column>
      <el-table-column label="下发状态" align="center" prop="isOnline">
        <template slot-scope="scope">
          <dict-tag :options="dict.type.issue_status" :value="scope.row.isOnline"/>
        </template>
      </el-table-column>
      <el-table-column label="电表型号" align="center" prop="meterModelId" />
      <el-table-column label="接线方式" align="center" prop="wiringMode">
        <template slot-scope="scope">
          <dict-tag :options="dict.type.wiring_mode" :value="scope.row.wiringMode"/>
        </template>
      </el-table-column>
      <el-table-column label="计量方式" align="center" prop="measMode">
        <template slot-scope="scope">
          <dict-tag :options="dict.type.measurement_mode" :value="scope.row.measMode"/>
        </template>
      </el-table-column>
      <el-table-column label="PT变比值" align="center" prop="ptRatio">
        <template slot-scope="scope">
          <dict-tag :options="dict.type.pt_ratio" :value="scope.row.ptRatio"/>
        </template>
      </el-table-column>
      <el-table-column label="CT 变比值" align="center" prop="ctRatio">
        <template slot-scope="scope">
          <dict-tag :options="dict.type.ct_ratio" :value="scope.row.ctRatio"/>
        </template>
      </el-table-column>
      <el-table-column label="综合倍率" align="center" prop="tFactor" />
      <el-table-column label="计量方向" align="center" prop="bothWayCalc">
        <template slot-scope="scope">
          <dict-tag :options="dict.type.measurement_direction" :value="scope.row.bothWayCalc"/>
        </template>
      </el-table-column>
      <el-table-column label="用户标识" align="center" prop="cjConsId" />
      <el-table-column label="是否总表" align="center" prop="cjTgTotal">
        <template slot-scope="scope">
          <dict-tag :options="dict.type.sys_yes_no" :value="scope.row.cjTgTotal"/>
        </template>
      </el-table-column>
      <el-table-column label="安装位置" align="center" prop="instLoc" />
      <el-table-column label="安装日期" align="center" prop="instDate" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.instDate, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="安装人" align="center" prop="installerNo" />
      <el-table-column label="投运日期" align="center" prop="runDate" width="180">
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
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['sc:mp:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['sc:mp:remove']"
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

    <!-- 添加或修改测量点对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="测量点名称" prop="cjMeterName">
          <el-input v-model="form.cjMeterName" placeholder="请输入测量点名称" />
        </el-form-item>
        <el-form-item label="所属区域" prop="areaId">
          <el-input v-model="form.areaId" placeholder="请输入所属区域" />
        </el-form-item>
        <el-form-item label="运行状态" prop="runStatus">
          <el-select v-model="form.runStatus" placeholder="请选择运行状态">
            <el-option
              v-for="dict in dict.type.operational_status"
              :key="dict.value"
              :label="dict.label"
              :value="dict.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="测量类型" prop="mpType">
          <el-select v-model="form.mpType" placeholder="请选择测量类型">
            <el-option
              v-for="dict in dict.type.measurement_type"
              :key="dict.value"
              :label="dict.label"
              :value="dict.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="电能表资产编号" prop="assetNo">
          <el-input v-model="form.assetNo" placeholder="请输入电能表资产编号" />
        </el-form-item>
        <el-form-item label="采集点标识" prop="cjCpNo">
          <el-input v-model="form.cjCpNo" placeholder="请输入采集点标识" />
        </el-form-item>
        <el-form-item label="在终端内的测量点号" prop="innerId">
          <el-input v-model="form.innerId" placeholder="请输入在终端内的测量点号" />
        </el-form-item>
        <el-form-item label="测量点通讯参数模板标识" prop="mpParaTmpId">
          <el-input v-model="form.mpParaTmpId" placeholder="请输入测量点通讯参数模板标识" />
        </el-form-item>
        <el-form-item label="电表通信地址" prop="commAddr">
          <el-input v-model="form.commAddr" placeholder="请输入电表通信地址" />
        </el-form-item>
        <el-form-item label="电表开关状态" prop="meterSwitchStatus">
          <el-radio-group v-model="form.meterSwitchStatus">
            <el-radio
              v-for="dict in dict.type.meter_switch_status"
              :key="dict.value"
              :label="dict.value"
            >{{dict.label}}</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="下发状态" prop="isOnline">
          <el-input v-model="form.isOnline" placeholder="请输入下发状态" />
        </el-form-item>
        <el-form-item label="电表型号" prop="meterModelId">
          <el-input v-model="form.meterModelId" placeholder="请输入电表型号" />
        </el-form-item>
        <el-form-item label="接线方式" prop="wiringMode">
          <el-select v-model="form.wiringMode" placeholder="请选择接线方式">
            <el-option
              v-for="dict in dict.type.wiring_mode"
              :key="dict.value"
              :label="dict.label"
              :value="dict.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="计量方式" prop="measMode">
          <el-select v-model="form.measMode" placeholder="请选择计量方式">
            <el-option
              v-for="dict in dict.type.measurement_mode"
              :key="dict.value"
              :label="dict.label"
              :value="dict.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="PT变比值" prop="ptRatio">
          <el-select v-model="form.ptRatio" placeholder="请选择PT变比值">
            <el-option
              v-for="dict in dict.type.pt_ratio"
              :key="dict.value"
              :label="dict.label"
              :value="parseInt(dict.value)"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="CT 变比值" prop="ctRatio">
          <el-select v-model="form.ctRatio" placeholder="请选择CT 变比值">
            <el-option
              v-for="dict in dict.type.ct_ratio"
              :key="dict.value"
              :label="dict.label"
              :value="dict.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="综合倍率" prop="tFactor">
          <el-input v-model="form.tFactor" placeholder="请输入综合倍率" />
        </el-form-item>
        <el-form-item label="计量方向" prop="bothWayCalc">
          <el-select v-model="form.bothWayCalc" placeholder="请选择计量方向">
            <el-option
              v-for="dict in dict.type.measurement_direction"
              :key="dict.value"
              :label="dict.label"
              :value="dict.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="用户标识" prop="cjConsId">
          <el-input v-model="form.cjConsId" placeholder="请输入用户标识" />
        </el-form-item>
        <el-form-item label="是否总表" prop="cjTgTotal">
          <el-select v-model="form.cjTgTotal" placeholder="请选择是否总表">
            <el-option
              v-for="dict in dict.type.sys_yes_no"
              :key="dict.value"
              :label="dict.label"
              :value="dict.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="安装位置" prop="instLoc">
          <el-input v-model="form.instLoc" placeholder="请输入安装位置" />
        </el-form-item>
        <el-form-item label="安装日期" prop="instDate">
          <el-date-picker clearable
            v-model="form.instDate"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="请选择安装日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="安装人" prop="installerNo">
          <el-input v-model="form.installerNo" placeholder="请输入安装人" />
        </el-form-item>
        <el-form-item label="投运日期" prop="runDate">
          <el-date-picker clearable
            v-model="form.runDate"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="请选择投运日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="显示序号" prop="sortNo">
          <el-input v-model="form.sortNo" placeholder="请输入显示序号" />
        </el-form-item>
        <el-form-item label="记录最后保存时间" prop="writeDate">
          <el-date-picker clearable
            v-model="form.writeDate"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="请选择记录最后保存时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="数据来源" prop="dataSource">
          <el-input v-model="form.dataSource" placeholder="请输入数据来源" />
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input v-model="form.remark" placeholder="请输入备注" />
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
import { listMp, getMp, delMp, addMp, updateMp } from "@/api/sc/mp";

export default {
  name: "Mp",
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
      this.single = selection.length!==1
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
      this.$modal.confirm('是否确认删除测量点编号为"' + cjMpIds + '"的数据项？').then(function() {
        return delMp(cjMpIds);
      }).then(() => {
        this.getList();
        this.$modal.msgSuccess("删除成功");
      }).catch(() => {});
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
