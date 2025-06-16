<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="交易序列名称" prop="tradeSeq">
        <el-input
          v-model="queryParams.tradeSeq"
          placeholder="请输入交易序列名称"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="需求类型" prop="demandType">
        <el-select v-model="queryParams.demandType" placeholder="请选择需求类型" clearable>
          <el-option
            v-for="dict in dict.type.requirement_type"
            :key="dict.value"
            :label="dict.label"
            :value="dict.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="用户名称" prop="userName">
        <el-input
          v-model="queryParams.userName"
          placeholder="请输入用户名称"
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
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['sc:demandResponse:export']"
        >导出</el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="demandResponseList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
<!--      <el-table-column label="主键ID" align="center" prop="id" />-->
      <el-table-column label="响应起始时间" align="center" prop="startTime" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.startTime, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="响应结束时间" align="center" prop="endTime" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.endTime, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
<!--      <el-table-column label="响应日期" align="center" prop="respDate" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.respDate, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="响应时段" align="center" prop="timePeriod" />-->
      <el-table-column label="交易序列名称" align="center" prop="tradeSeq" />
      <el-table-column label="需求类型" align="center" prop="demandType">
        <template slot-scope="scope">
          <dict-tag :options="dict.type.requirement_type" :value="scope.row.demandType"/>
        </template>
      </el-table-column>
      <el-table-column label="响应地区" align="center" prop="region" />
<!--      <el-table-column label="用户ID" align="center" prop="userId" />-->
      <el-table-column label="用户名称" align="center" prop="userName" />
      <el-table-column label="用户代码" align="center" prop="userCode" />
      <el-table-column label="用户户号" align="center" prop="accountNo" />
      <el-table-column label="出清价格(元/kWh)" align="center" prop="clearPrice" />
      <el-table-column label="出清容量(kW)" align="center" prop="clearCapacity" />
      <el-table-column label="交易状态" align="center" prop="reserved1">
        <template slot-scope="scope">
          <dict-tag :options="dict.type.transaction_status" :value="scope.row.reserved1"/>
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

    <el-dialog
      title="选择用户"
      :visible.sync="userDialogVisible"
      width="70%"
      append-to-body
      class="user-select-dialog">
      <el-form :model="userQuery" :inline="true">
        <el-form-item label="用户名称">
          <el-input
            v-model="userQuery.userName"
            clearable
            placeholder="请输入用户名称"
            @keyup.enter.native="handleUserSearch"/>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleUserSearch">搜索</el-button>
          <el-button @click="resetUserSearch">重置</el-button>
        </el-form-item>
      </el-form>
      <el-table
        v-loading="userLoading"
        :data="userList"
        highlight-current-row
        @row-click="handleUserRowClick">
        <el-table-column width="55">
          <template slot-scope="scope">
            <el-radio v-model="selectedUser" :label="scope.row">&nbsp;</el-radio>
          </template>
        </el-table-column>
        <el-table-column prop="userName" label="用户名称" min-width="200"/>
        <el-table-column prop="userCode" label="用户代码" width="150"/>
        <el-table-column prop="extend2" label="用户户号" width="150"/>
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
    <!-- 添加或修改市场交易申报对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="1380px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" :inline="true" label-width="160px">
        <el-form-item label="响应起始时间" prop="startTime">
          <el-date-picker clearable
            v-model="form.startTime"
            type="datetime"
            value-format="yyyy-MM-dd HH:mm:ss"
            placeholder="请选择响应起始时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="响应结束时间" prop="endTime">
          <el-date-picker clearable
            v-model="form.endTime"
            type="datetime"
            value-format="yyyy-MM-dd HH:mm:ss"
            placeholder="请选择响应结束时间">
          </el-date-picker>
        </el-form-item>
<!--        <el-form-item label="响应日期" prop="respDate">
          <el-date-picker clearable
            v-model="form.respDate"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="请选择响应日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="响应时段" prop="timePeriod">
          <el-input v-model="form.timePeriod" placeholder="请输入响应时段" />
        </el-form-item>-->
        <el-form-item label="交易序列名称" prop="tradeSeq">
          <el-input v-model="form.tradeSeq" placeholder="请输入交易序列名称" />
        </el-form-item>
        <el-form-item label="需求类型" prop="demandType">
          <el-select v-model="form.demandType" placeholder="请选择需求类型">
            <el-option
              v-for="dict in dict.type.requirement_type"
              :key="dict.value"
              :label="dict.label"
              :value="dict.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="响应地区" prop="region">
          <el-input v-model="form.region" placeholder="请输入响应地区" />
        </el-form-item>
<!--        <el-form-item label="用户ID" prop="userId">
          <el-input v-model="form.userId" placeholder="请输入用户ID" />
        </el-form-item>-->
        <!-- 修改用户名称字段 -->
        <el-form-item label="用户名称" prop="userName">
          <div class="input-with-select">
            <el-input
              v-model="form.userName"
              placeholder="请选择用户"
              readonly
              @click.native="openUserSelect">
              <i slot="suffix" class="el-icon-search"></i>
            </el-input>
            <el-button
              v-if="form.userName"
              class="clear-btn"
              icon="el-icon-close"
              circle
              @click="clearUser"
              title="清空"></el-button>
          </div>
        </el-form-item>

        <!-- 修改用户代码字段 -->
        <el-form-item label="用户代码" prop="userCode">
          <el-input v-model="form.userCode" placeholder="用户代码" disabled />
        </el-form-item>

        <!-- 修改用户户号字段 -->
        <el-form-item label="用户户号" prop="accountNo">
          <el-input v-model="form.accountNo" placeholder="用户户号" disabled />
        </el-form-item>
<!--        <el-form-item label="上报价格(元/kWh)" prop="bidPrice">
          <el-input v-model="form.bidPrice" placeholder="请输入上报价格(元/kWh)" />
        </el-form-item>
        <el-form-item label="上报容量(kW)" prop="bidCapacity">
          <el-input v-model="form.bidCapacity" placeholder="请输入上报容量(kW)" />
        </el-form-item>-->
        <el-form-item label="出清价格(元/kWh)" prop="clearPrice">
          <el-input v-model="form.clearPrice" placeholder="请输入出清价格(元/kWh)" />
        </el-form-item>
        <el-form-item label="出清容量(kW)" prop="clearCapacity">
          <el-input v-model="form.clearCapacity" placeholder="请输入出清容量(kW)" />
        </el-form-item>
<!--        <el-form-item label="备注" prop="remark">
          <el-input v-model="form.remark" type="textarea" placeholder="请输入内容" />
        </el-form-item>-->
        <el-form-item label="交易状态" prop="reserved1">
          <el-select v-model="form.reserved1" placeholder="请选择交易状态">
            <el-option
              v-for="dict in dict.type.transaction_status"
              :key="dict.value"
              :label="dict.label"
              :value="dict.value"
            ></el-option>
          </el-select>
        </el-form-item>
<!--        <el-form-item label="扩展2" prop="reserved2">
          <el-input v-model="form.reserved2" placeholder="请输入扩展2" />
        </el-form-item>-->
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { listDemandResponse, getDemandResponse, delDemandResponse, addDemandResponse, updateDemandResponse } from "@/api/sc/demandResponse";
import { listCorporation } from "@/api/sc/corporation";
export default {
  name: "DemandResponse",
  dicts: ['transaction_status', 'requirement_type'],
  data() {
    return {
      // 用户选择相关
      userDialogVisible: false,
      userList: [],
      userTotal: 0,
      userLoading: false,
      userQuery: {
        pageNum: 1,
        pageSize: 10,
        userName: undefined
      },
      selectedUser: null,
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
      // 市场交易申报表格数据
      demandResponseList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        tradeSeq: null,
        demandType: null,
        userName: null,
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        startTime: [
          { required: true, message: "响应起始时间不能为空", trigger: "blur" }
        ],
        endTime: [
          { required: true, message: "响应结束时间不能为空", trigger: "blur" }
        ],
        tradeSeq: [
          { required: true, message: "交易序列名称不能为空", trigger: "blur" }
        ],
        demandType: [
          { required: true, message: "需求类型不能为空", trigger: "change" }
        ],
        region: [
          { required: true, message: "响应地区不能为空", trigger: "blur" }
        ],
      }
    };
  },
  created() {
    this.getList();
  },
  methods: {
    // 打开用户选择对话框
    openUserSelect() {
      this.userDialogVisible = true;
      this.userQuery.userName = '';
      this.selectedUser = null;
      this.getUserList();
    },

    // 用户搜索
    handleUserSearch() {
      this.userQuery.pageNum = 1;
      this.getUserList();
    },

    // 重置用户搜索
    resetUserSearch() {
      this.userQuery.userName = '';
      this.handleUserSearch();
    },

    // 获取用户列表
    async getUserList() {
      this.userLoading = true;
      try {
        const response = await listCorporation(this.userQuery);
        if (response.code === 200) {
          this.userList = response.rows;
          this.userTotal = response.total;
        }
      } finally {
        this.userLoading = false;
      }
    },

    // 用户行点击
    handleUserRowClick(row) {
      this.selectedUser = row;
    },

    // 确认用户选择
    confirmUserSelect() {
      if (this.selectedUser) {
        this.form.userName = this.selectedUser.userName; // 用户名称
        this.form.userCode = this.selectedUser.extend2;  // extend2 -> userCode
        this.form.accountNo = this.selectedUser.userCode; // userCode -> accountNo
        this.form.userId = this.selectedUser.id;        // id -> userId
        this.userDialogVisible = false;
      } else {
        this.$message.warning("请选择一个用户");
      }
    },

    // 清空用户
    clearUser() {
      this.form.userName = null;
      this.form.userCode = null;
      this.form.accountNo = null;
      this.form.userId = null;
      this.selectedUser = null;
    },
    /** 查询市场交易申报列表 */
    getList() {
      this.loading = true;
      listDemandResponse(this.queryParams).then(response => {
        this.demandResponseList = response.rows;
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
        startTime: null,
        endTime: null,
        respDate: null,
        timePeriod: null,
        tradeSeq: null,
        demandType: null,
        region: null,
        userId: null,
        userName: null,
        userCode: null,
        accountNo: null,
        bidPrice: null,
        bidCapacity: null,
        clearPrice: null,
        clearCapacity: null,
        remark: null,
        reserved1: null,
        reserved2: null
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
      this.title = "添加市场交易申报";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids
      getDemandResponse(id).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改市场交易申报";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id != null) {
            updateDemandResponse(this.form).then(response => {
              this.$modal.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addDemandResponse(this.form).then(response => {
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
      this.$modal.confirm('是否确认删除市场交易申报编号为"' + ids + '"的数据项？').then(function() {
        return delDemandResponse(ids);
      }).then(() => {
        this.getList();
        this.$modal.msgSuccess("删除成功");
      }).catch(() => {});
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download('sc/demandResponse/export', {
        ...this.queryParams
      }, `demandResponse_${new Date().getTime()}.xlsx`)
    }
  }
};
</script>
<style scoped>
/* 添加带清除按钮的输入框样式 */
.input-with-select {
  position: relative;
  display: flex;
  align-items: center;
}

.clear-btn {
  position: absolute;
  right: 5px;
  width: 24px;
  height: 24px;
  padding: 0;
  background: transparent;
  border: none;
  z-index: 10;
}

/* 调整输入框样式 */
.el-input >>> .el-input__inner {
  padding-right: 30px;
}

/* 隐藏单选按钮的标签内容 */
/deep/ .el-radio__label {
  display: none !important;
}

/* 调整单选框位置 */
.el-table .el-radio {
  margin-right: 0;
}

.user-select-dialog .el-dialog {
  margin-top: 5vh !important;
}
</style>
