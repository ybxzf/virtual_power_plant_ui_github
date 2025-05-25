<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch" label-width="100px">
      <el-form-item label="所属用户" prop="reserved1">
        <el-input
          v-model="queryParams.reserved1"
          placeholder="请输入所属用户"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
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
<!--      <el-form-item label="所属区域" prop="area">-->
<!--        <el-input-->
<!--          v-model="queryParams.area"-->
<!--          placeholder="请输入所属区域"-->
<!--          clearable-->
<!--          @keyup.enter.native="handleQuery"-->
<!--        />-->
<!--      </el-form-item>-->
<!--      <el-form-item label="充电桩类型" prop="chargerType">
        <el-select v-model="queryParams.chargerType" placeholder="请选择充电桩类型" clearable>
          <el-option
            v-for="dict in dict.type.generation_type"
            :key="dict.value"
            :label="dict.label"
            :value="dict.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="供电电压(kV)" prop="supplyVoltage">
        <el-select v-model="queryParams.supplyVoltage" placeholder="请选择供电电压(kV)" clearable>
          <el-option
            v-for="dict in dict.type.supply_voltage"
            :key="dict.value"
            :label="dict.label"
            :value="dict.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="充电桩功率(kW)" prop="power">
        <el-input
          v-model="queryParams.power"
          placeholder="请输入充电桩功率(kW)"
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
      </el-form-item>-->
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
      </el-form-item>
    </el-form>

    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button
          type="primary"
          icon="el-icon-plus"
          size="mini"
          @click="handleAdd"
          v-hasPermi="['sc:chargingPile:add']"
        >新增</el-button>
      </el-col>
<!--      <el-col :span="1.5">
        <el-button
          type="success"
          plain
          icon="el-icon-edit"
          size="mini"
          :disabled="single"
          @click="handleUpdate"
          v-hasPermi="['sc:chargingPile:edit']"
        >修改</el-button>
      </el-col>-->
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

    <el-table v-loading="loading" :data="chargingPileList" @selection-change="handleSelectionChange" @row-dblclick="handleRowDblClick">
      <el-table-column type="selection" width="55" align="center" />
<!--      <el-table-column label="主键ID" align="center" prop="id" />-->
      <el-table-column label="所属用户" align="center" prop="reserved1" />
      <el-table-column label="充电桩名称" align="center" prop="chargerName" />
      <el-table-column label="资产编号" align="center" prop="assetNo" />
      <el-table-column label="所属区域" align="center" prop="area" />
      <el-table-column label="充电桩类型" align="center" prop="chargerType">
        <template slot-scope="scope">
          <dict-tag :options="dict.type.generation_type" :value="scope.row.chargerType"/>
        </template>
      </el-table-column>
<!--      <el-table-column label="供电电压(kV)" align="center" prop="supplyVoltage">-->
<!--        <template slot-scope="scope">-->
<!--          <dict-tag :options="dict.type.supply_voltage" :value="scope.row.supplyVoltage"/>-->
<!--        </template>-->
<!--      </el-table-column>-->
      <el-table-column label="充电桩功率(kW)" align="center" prop="power" />
      <el-table-column label="主设备品牌" align="center" prop="deviceBrand" />
      <el-table-column label="主设备型号" align="center" prop="deviceModel" />
<!--      <el-table-column label="所属用户ID" align="center" prop="userId" />
      <el-table-column label="所属回路ID" align="center" prop="circuitId" />
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
      <el-table-column label="备注信息" align="center" prop="remark" />-->
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
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width" fixed="right" min-width="150">
        <template slot-scope="scope">
<!--          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['sc:chargingPile:edit']"
          >修改</el-button>-->
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
    <el-dialog :title="title" :visible.sync="open" width="1250px" height="80%" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" :inline="true" label-width="160px">
        <LabelTitle title="基础信息" style="margin-bottom: 20px"/>
        <el-form-item label="充电桩名称" prop="chargerName">
          <el-input v-model="form.chargerName" placeholder="请输入充电桩名称" />
        </el-form-item>
        <el-form-item label="资产编号" prop="assetNo">
          <el-input v-model="form.assetNo" placeholder="请输入资产编号" />
        </el-form-item>
        <el-form-item label="所属区域" prop="areaCodePath">
          <el-cascader v-model="areaCodePath" :options="areaOptions" clearable @change="handleChange"
          placeholder="请选择所属区域" :props="{
            checkStrictly: false,
          }"></el-cascader>
          <!-- <el-input v-model="form.area" placeholder="请输入所属区域" /> -->
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
        <el-form-item label="供电电压(kV)" prop="supplyVoltage">
<!--          <el-select v-model="form.supplyVoltage" placeholder="请选择供电电压(kV)">
            <el-option
              v-for="dict in dict.type.supply_voltage"
              :key="dict.value"
              :label="dict.label"
              :value="dict.value"
            ></el-option>
          </el-select>-->
          <el-select v-model="form.supplyVoltage" placeholder="请选择供电电压">
            <el-option v-for="dict in dict.type.supply_voltage" :key="dict.value" :label="dict.label"
                       :value="dict.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="充电桩功率(kW)" prop="power">
          <el-input type="number" v-model="form.power" placeholder="请输入充电桩功率(kW)" />
        </el-form-item>
        <el-form-item label="所属用户" prop="reserved1">
          <el-input
            v-model="form.reserved1"
            placeholder="请选择所属用户"
            readonly
            @click.native="userDialogVisible = true">
            <i slot="suffix" class="el-icon-search"></i>
          </el-input>
        </el-form-item>
        <el-form-item label="所属回路" prop="reserved2">
          <el-input
            v-model="form.reserved2"
            placeholder="请先选择用户"
            readonly
            :disabled="!form.userId"
            @click.native="handleCircuitSelect">
            <i slot="suffix" class="el-icon-search"></i>
          </el-input>
        </el-form-item>
<!--        <el-form-item label="所属用户ID" prop="userId">
          <el-input v-model="form.userId" placeholder="请输入所属用户ID" />
        </el-form-item>
        <el-form-item label="所属回路ID" prop="circuitId">
          <el-input v-model="form.circuitId" placeholder="请输入所属回路ID" />
        </el-form-item>-->
        <el-form-item label="主设备品牌" prop="deviceBrand">
          <el-input v-model="form.deviceBrand" placeholder="请输入主设备品牌" />
        </el-form-item>
        <el-form-item label="主设备型号" prop="deviceModel">
          <el-input v-model="form.deviceModel" placeholder="请输入主设备型号" />
        </el-form-item>
        <el-form-item label="备注信息" prop="remark">
          <el-input v-model="form.remark" type="textarea" placeholder="请输入内容" />
        </el-form-item>
        <LabelTitle title="可调负荷配置" style="margin-bottom: 20px"/>
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

    <!-- 用户选择对话框 -->
    <el-dialog title="选择用户" :visible.sync="userDialogVisible" width="70%">
      <el-form :model="userQuery" :inline="true">
        <el-form-item label="用户名">
          <el-input v-model="userQuery.userName" clearable placeholder="请输入用户名"/>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleUserSearch">搜索</el-button>
        </el-form-item>
      </el-form>
      <el-table
        v-loading="userLoading"
        :data="userList"
        highlight-current-row
        @row-click="handleUserRowClick">
        <el-table-column width="55">
          <template slot-scope="scope">
            <el-radio v-model="selectedUserId" :label="scope.row.id">&nbsp;</el-radio>
          </template>
        </el-table-column>
        <el-table-column prop="userName" label="用户名称"/>
        <el-table-column prop="creditCode" label="信用代码"/>
      </el-table>
      <pagination
        v-show="userTotal>0"
        :total="userTotal"
        :page.sync="userQuery.pageNum"
        :limit.sync="userQuery.pageSize"
        @pagination="getUserList"
      />
      <div slot="footer" class="dialog-footer">
        <el-button @click="userDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirmUserSelect">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 回路选择对话框 -->
    <el-dialog title="选择回路" :visible.sync="circuitDialogVisible" width="70%">
      <el-form :model="circuitQuery" :inline="true">
        <el-form-item label="回路名称">
          <el-input v-model="circuitQuery.circuitName" clearable placeholder="请输入回路名称"/>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleCircuitSearch">搜索</el-button>
        </el-form-item>
      </el-form>
      <el-table
        v-loading="circuitLoading"
        :data="circuitList"
        highlight-current-row
        @row-click="handleCircuitRowClick">
        <el-table-column width="55">
          <template slot-scope="scope">
            <el-radio v-model="selectedCircuitId" :label="scope.row.id">&nbsp;</el-radio>
          </template>
        </el-table-column>
        <el-table-column prop="circuitName" label="回路名称"/>
        <el-table-column prop="voltageLevel" label="电压等级"/>
      </el-table>
      <pagination
        v-show="circuitTotal>0"
        :total="circuitTotal"
        :page.sync="circuitQuery.pageNum"
        :limit.sync="circuitQuery.pageSize"
        @pagination="getCircuitList"
      />
      <div slot="footer" class="dialog-footer">
        <el-button @click="circuitDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirmCircuitSelect">确 定</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
import { listChargingPile, getChargingPile, delChargingPile, addChargingPile, updateChargingPile } from "@/api/sc/chargingPile";
import { getAreaTree } from "@/api/sc/corporation";
import LabelTitle from "@/views/sc/circuitLoadConfig/components/LabelTitle.vue";
import { listCorporation } from "@/api/sc/corporation";
import { listCircuitInfo } from "@/api/sc/circuitInfo";

export default {
  name: "ChargingPile",
  components: { LabelTitle },
  dicts: ['supply_voltage', 'advance_notice_time', 'adjustment_period', 'sys_yes_no', 'generation_type'],
  data() {
    return {
      // 新增数据项
      userDialogVisible: false,
      circuitDialogVisible: false,
      userList: [],
      userTotal: 0,
      userLoading: false,
      userQuery: {
        pageNum: 1,
        pageSize: 10,
        userName: undefined
      },
      circuitList: [],
      circuitTotal: 0,
      circuitLoading: false,
      circuitQuery: {
        pageNum: 1,
        pageSize: 10,
        circuitName: undefined,
        userId: undefined
      },
      selectedUserId: null,
      selectedCircuitId: null,
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
      areaOptions: [],//省市区列表
      areaCodePath: [],//省市区存储的所有值
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        chargerName: [
          { required: true, message: "充电桩名称不能为空", trigger: "blur" }
        ],
        assetNo: [
          { required: true, message: "资产编号不能为空", trigger: "blur" }
        ],
        reserved1: [
          { required: true, message: "所属用户不能为空", trigger: "blur" }
        ]
      }
    };
  },
  watch: {
    form: {
      handler(newVal, oldVal) {
        if (newVal.area !== oldVal.area) {
          if (this.areaOptions.length == 0) {
            //获取区域信息
            getAreaTree().then(response => {
              this.areaOptions = response.data;
              this.areaCodePath = this.findFullPath(newVal.area, this.areaOptions) || [];
            });
          } else {
            this.areaCodePath = this.findFullPath(newVal.area, this.areaOptions) || [];
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
  mounted() {
    // 初始化用户列表
    this.getUserList();
  },
  methods: {
    // 用户选择相关方法
    handleUserSearch() {
      this.userQuery.pageNum = 1;
      this.getUserList();
    },
    async getUserList() {
      this.userLoading = true;
      try {
        const response = await listCorporation(this.userQuery);
        this.userList = response.rows;
        this.userTotal = response.total;
      } finally {
        this.userLoading = false;
      }
    },
    handleUserRowClick(row) {
      this.selectedUserId = row.id;
    },
    confirmUserSelect() {
      const selectedUser = this.userList.find(item => item.id === this.selectedUserId);
      if (selectedUser) {
        this.form.userId = selectedUser.id;
        this.form.reserved1 = selectedUser.userName;
        this.userDialogVisible = false;
        // 清空回路相关数据
        this.form.circuitId = null;
        this.form.reserved2 = null;
      }
    },

    // 回路选择相关方法
    handleCircuitSelect() {
      if (!this.form.userId) {
        this.$message.warning('请先选择所属用户');
        return;
      }
      this.circuitQuery.userId = this.form.userId;
      this.circuitDialogVisible = true;
      this.getCircuitList();
    },
    handleCircuitSearch() {
      this.circuitQuery.pageNum = 1;
      this.getCircuitList();
    },
    async getCircuitList() {
      this.circuitLoading = true;
      try {
        const response = await listCircuitInfo(this.circuitQuery);
        this.circuitList = response.rows;
        this.circuitTotal = response.total;
      } finally {
        this.circuitLoading = false;
      }
    },
    handleCircuitRowClick(row) {
      this.selectedCircuitId = row.id;
    },
    confirmCircuitSelect() {
      const selectedCircuit = this.circuitList.find(item => item.id === this.selectedCircuitId);
      if (selectedCircuit) {
        this.form.circuitId = selectedCircuit.id;
        this.form.reserved2 = selectedCircuit.circuitName;
        this.circuitDialogVisible = false;
      }
    },
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
      this.selectedUserId = null;
      this.selectedCircuitId = null;
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
    // 新增双击行处理
    handleRowDblClick(row) {
      // 调用原有的修改方法
      this.handleUpdate(row);
    },
    // 级联选择器值改变时触发
    handleChange(val) {
      console.log('val', val);
      this.form.area = val[val.length - 1] || ""; // 获取最后一级的值
      // this.form.area = val;
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
    // 修改原有的handleUpdate方法
    handleUpdate(row) {
      this.reset();
      // 确保无论是按钮点击还是行双击都使用row.id
      const id = row.id || (this.ids.length === 1 ? this.ids[0] : null);
      if (!id) {
        this.$modal.msgWarning("请选择一条要修改的数据");
        return;
      }
      getChargingPile(id).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改充电桩";
      });
    },
    /** 修改按钮操作 */
    /*handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids
      getChargingPile(id).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改充电桩";
      });
    },*/
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
