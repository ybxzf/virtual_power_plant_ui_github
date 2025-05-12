<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch" label-width="120px">
      <el-form-item label="所属用户" prop="reserved1">
        <el-input v-model="queryParams.reserved1" placeholder="请输入所属用户" clearable @keyup.enter.native="handleQuery" />
      </el-form-item>
      <el-form-item label="分布式光伏名称" prop="pvName">
        <el-input v-model="queryParams.pvName" placeholder="请输入分布式光伏名称" clearable @keyup.enter.native="handleQuery" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
      </el-form-item>
    </el-form>

    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button type="primary" plain icon="el-icon-plus" size="mini" @click="handleAdd"
          v-hasPermi="['sc:pv:add']">新增</el-button>
      </el-col>
      <!-- <el-col :span="1.5">
        <el-button
          type="success"
          plain
          icon="el-icon-edit"
          size="mini"
          :disabled="single"
          @click="handleUpdate"
          v-hasPermi="['sc:pv:edit']"
        >修改</el-button>
      </el-col> -->
      <el-col :span="1.5">
        <el-button type="danger" plain icon="el-icon-delete" size="mini" :disabled="multiple" @click="handleDelete"
          v-hasPermi="['sc:pv:remove']">删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button type="warning" plain icon="el-icon-download" size="mini" @click="handleExport"
          v-hasPermi="['sc:pv:export']">导出</el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="pvList" @selection-change="handleSelectionChange" @row-dblclick="handleUpdate">
      <el-table-column type="selection" width="55" align="center" />
<!--      <el-table-column label="主键ID" min-width="100" align="center" prop="id" />-->
      <el-table-column label="所属用户" min-width="100" align="center" prop="reserved1" />
      <el-table-column label="分布式光伏名称" min-width="120" align="center" prop="pvName" />
      <el-table-column label="资产编号" min-width="80" align="center" prop="assetNo" />
      <el-table-column label="所属区域" min-width="80" align="center" prop="area" />
<!--      <el-table-column label="电源类型" min-width="80" align="center" prop="powerType">
        <template slot-scope="scope">
          <dict-tag :options="dict.type.power_source_type" :value="scope.row.powerType" />
        </template>
      </el-table-column>-->

      <el-table-column label="峰值总功率(KWP)" min-width="130" align="center" prop="peakPower" />
      <el-table-column label="最大可出力(KW)" min-width="120" align="center" prop="maxOutput" />
      <el-table-column label="发电效率" min-width="80" align="center" prop="efficiency" />
      <el-table-column label="是否可调节" min-width="90" align="center" prop="isAdjust">
        <template slot-scope="scope">
          <dict-tag :options="dict.type.sys_yes_no" :value="scope.row.isAdjust" />
        </template>
      </el-table-column>
      <el-table-column label="是否可控制" min-width="90" align="center" prop="isControl">
        <template slot-scope="scope">
          <dict-tag :options="dict.type.sys_yes_no" :value="scope.row.isControl" />
        </template>
      </el-table-column>
      <el-table-column label="操作" min-width="150" fixed="right" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <!-- <el-button size="mini" type="text" icon="el-icon-edit" @click="handleUpdate(scope.row)"
            v-hasPermi="['sc:pv:edit']">修改</el-button> -->
          <el-button size="mini" type="text" icon="el-icon-delete" @click="handleDelete(scope.row)"
            v-hasPermi="['sc:pv:remove']">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total > 0" :total="total" :page.sync="queryParams.pageNum" :limit.sync="queryParams.pageSize"
      @pagination="getList" />

    <!-- 添加或修改分布式光伏对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="1250px" height="80%" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" :inline="true" label-width="160px">
        <LabelTitle title="基础信息" style="margin-bottom: 20px"/>
        <el-form-item label="分布式光伏名称" prop="pvName">
          <el-input v-model="form.pvName" placeholder="请输入分布式光伏名称" />
        </el-form-item>
        <el-form-item label="资产编号" prop="assetNo">
          <el-input v-model="form.assetNo" placeholder="请输入资产编号" />
        </el-form-item>
        <el-form-item label="所属区域" prop="area">
          <el-input v-model="form.area" placeholder="请输入所属区域" />
        </el-form-item>
<!--        <el-form-item label="电源类型" prop="powerType">
          <el-select v-model="form.powerType" placeholder="请选择电源类型">
            <el-option v-for="dict in dict.type.power_source_type" :key="dict.value" :label="dict.label"
              :value="dict.value"></el-option>
          </el-select>
        </el-form-item>-->

        <el-form-item label="峰值总功率(KWP)" prop="peakPower">
          <el-input v-model="form.peakPower" placeholder="请输入峰值总功率(KWP)" />
        </el-form-item>
        <el-form-item label="最大可出力(KW)" prop="maxOutput">
          <el-input v-model="form.maxOutput" placeholder="请输入最大可出力(KW)" />
        </el-form-item>
        <el-form-item label="发电效率" prop="efficiency">
          <el-input v-model="form.efficiency" placeholder="请输入发电效率" />
        </el-form-item>
<!--        <el-form-item label="所属用户ID" prop="userId">
          <el-input v-model="form.userId" placeholder="请输入所属用户ID" />
        </el-form-item>-->
<!--        <el-form-item label="所属用户" prop="reserved1">
          <el-input v-model="form.reserved1" placeholder="请输入所属用户" />
        </el-form-item>
        -->
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

        <el-form-item label="主设备品牌和型号" prop="deviceModel">
          <el-input v-model="form.deviceModel" placeholder="请输入主设备品牌和型号" />
        </el-form-item>
        <el-form-item label="备注信息" prop="remark">
          <el-input v-model="form.remark" type="textarea" placeholder="请输入内容" />
        </el-form-item>
        <LabelTitle title="可调负荷配置" style="margin-bottom: 20px"/>
        <el-form-item label="调节方式" prop="adjustMode">
          <el-select v-model="form.adjustMode" placeholder="请选择调节方式">
            <el-option v-for="dict in dict.type.regulation_mode" :key="dict.value" :label="dict.label"
              :value="dict.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="提前通知执行时间" prop="noticeTime">
          <el-select v-model="form.noticeTime" placeholder="请选择提前通知执行时间">
            <el-option v-for="dict in dict.type.advance_notice_time" :key="dict.value" :label="dict.label"
              :value="parseInt(dict.value)"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="调节时段" prop="adjustPeriod">
          <el-select v-model="form.adjustPeriod" placeholder="请选择调节时段">
            <el-option v-for="dict in dict.type.adjustment_period" :key="dict.value" :label="dict.label"
              :value="dict.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="是否可调节" prop="isAdjust">
          <el-select v-model="form.isAdjust" placeholder="请选择是否可调节">
            <el-option v-for="dict in dict.type.sys_yes_no" :key="dict.value" :label="dict.label"
              :value="dict.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="是否可控制" prop="isControl">
          <el-select v-model="form.isControl" placeholder="请选择是否可控制">
            <el-option v-for="dict in dict.type.sys_yes_no" :key="dict.value" :label="dict.label"
              :value="dict.value"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>

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
import { listPv, getPv, delPv, addPv, updatePv } from "@/api/sc/pv";

import { listCorporation } from "@/api/sc/corporation";
import { listCircuitInfo } from "@/api/sc/circuitInfo";
import LabelTitle from "@/views/sc/circuitLoadConfig/components/LabelTitle.vue";

export default {
  name: "Pv",
  components: { LabelTitle },
  dicts: ['regulation_mode', 'advance_notice_time', 'adjustment_period', 'sys_yes_no', 'power_source_type'],
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
      // 分布式光伏表格数据
      pvList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        userId: null,
        pvName: null,
        area: null,
        powerType: null,
        assetNo: null,
        peakPower: null,
        maxOutput: null,
        efficiency: null,
        adjustMode: null,
        noticeTime: null,
        adjustPeriod: null,
        circuitId: null,
        deviceModel: null,
        reserved1: null,
        reserved2: null,
        isAdjust: null,
        isControl: null
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

    /** 查询分布式光伏列表 */
    getList() {
      this.loading = true;
      listPv(this.queryParams).then(response => {
        this.pvList = response.rows;
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
        pvName: null,
        area: null,
        powerType: null,
        assetNo: null,
        peakPower: null,
        maxOutput: null,
        efficiency: null,
        adjustMode: null,
        noticeTime: null,
        adjustPeriod: null,
        circuitId: null,
        deviceModel: null,
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
      this.single = selection.length !== 1
      this.multiple = !selection.length
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
      this.open = true;
      this.title = "添加分布式光伏";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids
      getPv(id).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改分布式光伏";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id != null) {
            updatePv(this.form).then(response => {
              this.$modal.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addPv(this.form).then(response => {
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
      this.$modal.confirm('是否确认删除分布式光伏编号为"' + ids + '"的数据项？').then(function () {
        return delPv(ids);
      }).then(() => {
        this.getList();
        this.$modal.msgSuccess("删除成功");
      }).catch(() => { });
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download('sc/pv/export', {
        ...this.queryParams
      }, `pv_${new Date().getTime()}.xlsx`)
    }
  }
};
</script>

