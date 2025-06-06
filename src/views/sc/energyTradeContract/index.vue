<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="合同名称" prop="contractName">
        <el-input
          v-model="queryParams.contractName"
          placeholder="请输入合同名称"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="合同编号" prop="contractNo">
        <el-input
          v-model="queryParams.contractNo"
          placeholder="请输入合同编号"
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
          v-hasPermi="['sc:energyTradeContract:add']"
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
          v-hasPermi="['sc:energyTradeContract:edit']"
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
          v-hasPermi="['sc:energyTradeContract:remove']"
        >删除</el-button>
      </el-col>
<!--      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['sc:energyTradeContract:export']"
        >导出</el-button>
      </el-col>-->
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table @row-dblclick="handleRowDblClick" v-loading="loading" :data="energyTradeContractList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="甲方名称" align="center" prop="partyAName" />
      <el-table-column label="乙方名称" align="center" prop="partyBName" />
      <el-table-column label="合同名称" align="center" prop="contractName" />
      <el-table-column label="合同编号" align="center" prop="contractNo" />
      <el-table-column label="签订日期" align="center" prop="signDate" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.signDate, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="生效日期" align="center" prop="startDate" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.startDate, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="终止日期" align="center" prop="endDate" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.endDate, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="合同状态" align="center" prop="status" />
      <el-table-column label="用电量(kWh)" align="center" prop="energyUsage" />
      <el-table-column label="代理价格(元)" align="center" prop="proxyPrice" />
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['sc:energyTradeContract:remove']"
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

    <!-- 添加或修改电能量交易合同对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="1380px" append-to-body>
      <el-form :inline="true" ref="form" :model="form" :rules="rules" label-width="180px">
        <LabelTitle title="合同基础信息" style="margin-bottom: 20px"/>
        <el-form-item label="合同名称" prop="contractName">
          <el-input v-model="form.contractName" placeholder="请输入合同名称" />
        </el-form-item>
        <el-form-item label="合同编号" prop="contractNo">
          <el-input v-model="form.contractNo" placeholder="请输入合同编号" />
        </el-form-item>
        <el-form-item label="签订日期" prop="signDate">
          <el-date-picker clearable
                          v-model="form.signDate"
                          type="date"
                          value-format="yyyy-MM-dd"
                          placeholder="请选择签订日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="生效日期" prop="startDate">
          <el-date-picker clearable
                          v-model="form.startDate"
                          type="date"
                          value-format="yyyy-MM-dd"
                          placeholder="请选择生效日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="终止日期" prop="endDate">
          <el-date-picker clearable
                          v-model="form.endDate"
                          type="date"
                          value-format="yyyy-MM-dd"
                          placeholder="请选择终止日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="合同备注" prop="remark">
          <el-input v-model="form.remark" type="textarea" placeholder="请输入内容" />
        </el-form-item>
        <el-form-item label="合同附件" prop="fileName">
          <file-upload v-model="form.fileName"/>
        </el-form-item>
        <!--        <el-form-item label="甲方(用户)" prop="partyAName">
                  <el-input v-model="form.partyAName" placeholder="请输入甲方" />
                </el-form-item>-->
        <LabelTitle title="签约方信息" style="margin-bottom: 20px"/>
        <el-form-item label="甲方(用户)" prop="partyAName">
          <el-input
            v-model="form.partyAName"
            placeholder="请选择甲方"
            readonly
            @click.native="partyADialogVisible = true">
            <i slot="suffix" class="el-icon-search"></i>
          </el-input>
        </el-form-item>
        <el-form-item label="甲方交易代码" prop="partyACode">
          <el-input v-model="form.partyACode" placeholder="请输入甲方交易代码" />
        </el-form-item>
        <el-form-item label="甲方户号" prop="partyANo">
          <el-input v-model="form.partyANo" placeholder="请输入甲方户号" />
        </el-form-item>
        <el-form-item label="甲方地址" prop="partyAAddr">
          <el-input v-model="form.partyAAddr" placeholder="请输入甲方地址" />
        </el-form-item>
        <el-form-item label="甲方统一信用代码" prop="partyACredit">
          <el-input v-model="form.partyACredit" placeholder="请输入甲方统一信用代码" />
        </el-form-item>
        <el-form-item label="甲方联系人" prop="partyAContact">
          <el-input v-model="form.partyAContact" placeholder="请输入甲方联系人" />
        </el-form-item>
        <el-form-item label="甲方联系电话" prop="partyATel">
          <el-input v-model="form.partyATel" placeholder="请输入甲方联系电话" />
        </el-form-item>
        <el-form-item label="甲方联系邮箱" prop="partyAEmail">
          <el-input v-model="form.partyAEmail" placeholder="请输入甲方联系邮箱" />
        </el-form-item>
        <!--        <el-form-item label="乙方运营商ID" prop="partyBId">
                  <el-input v-model="form.partyBId" placeholder="请输入乙方运营商ID" />
                </el-form-item>-->
        <!--        <el-form-item label="乙方(虚拟电厂运营商)" prop="partyBName">
                  <el-input v-model="form.partyBName" placeholder="请输入乙方" />
                </el-form-item>-->
        <el-form-item label="乙方(虚拟电厂运营商)" prop="partyBName">
          <el-input
            v-model="form.partyBName"
            placeholder="请选择乙方"
            readonly
            @click.native="partyBDialogVisible = true">
            <i slot="suffix" class="el-icon-search"></i>
          </el-input>
        </el-form-item>
        <el-form-item label="乙方交易代码" prop="partyBCode">
          <el-input v-model="form.partyBCode" placeholder="请输入乙方交易代码" />
        </el-form-item>
        <el-form-item label="乙方地址" prop="partyBAddr">
          <el-input v-model="form.partyBAddr" placeholder="请输入乙方地址" />
        </el-form-item>
        <el-form-item label="乙方统一信用代码" prop="partyBCredit">
          <el-input v-model="form.partyBCredit" placeholder="请输入乙方统一信用代码" />
        </el-form-item>
        <el-form-item label="乙方联系人" prop="partyBContact">
          <el-input v-model="form.partyBContact" placeholder="请输入乙方联系人" />
        </el-form-item>
        <el-form-item label="乙方联系电话" prop="partyBTel">
          <el-input v-model="form.partyBTel" placeholder="请输入乙方联系电话" />
        </el-form-item>
        <el-form-item label="乙方联系邮箱" prop="partyBEmail">
          <el-input v-model="form.partyBEmail" placeholder="请输入乙方联系邮箱" />
        </el-form-item>
        <LabelTitle title="结算信息" style="margin-bottom: 20px"/>
        <el-form-item label="用电量(kWh)" prop="energyUsage">
          <el-input type="number" v-model="form.energyUsage" placeholder="请输入用电量" />
        </el-form-item>
        <el-form-item label="代理价格(元)" prop="proxyPrice">
          <el-input type="number" v-model="form.proxyPrice" placeholder="请输入代理价格" />
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>

    <el-dialog title="选择甲方" :visible.sync="partyADialogVisible" width="70%">
      <el-form :inline="true">
        <el-form-item label="用户名称">
          <el-input v-model="partyAQuery.userName" placeholder="请输入用户名称"/>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handlePartyASearch">搜索</el-button>
        </el-form-item>
      </el-form>
      <el-table
        v-loading="partyALoading"
        :data="partyAList"
        highlight-current-row
        @row-click="handlePartyARowClick">
        <el-table-column width="55">
          <template slot-scope="scope">
            <el-radio v-model="selectedPartyAId" :label="scope.row.id">&nbsp;</el-radio>
          </template>
        </el-table-column>
        <el-table-column prop="userName" label="用户名称"/>
        <el-table-column prop="userCode" label="用户编号"/>
      </el-table>
      <pagination
        v-show="partyATotal>0"
        :total="partyATotal"
        :page.sync="partyAQuery.pageNum"
        :limit.sync="partyAQuery.pageSize"
        @pagination="getPartyAList"
      />
      <div slot="footer" class="dialog-footer">
        <el-button @click="partyADialogVisible = false">取消</el-button>
        <el-button type="primary" @click="confirmPartyASelect">确定</el-button>
      </div>
    </el-dialog>

    <!-- 新增乙方选择对话框 -->
    <el-dialog title="选择乙方" :visible.sync="partyBDialogVisible" width="70%">
      <el-form :inline="true">
        <el-form-item label="公司名称">
          <el-input v-model="partyBQuery.companyName" placeholder="请输入公司名称"/>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handlePartyBSearch">搜索</el-button>
        </el-form-item>
      </el-form>
      <el-table
        v-loading="partyBLoading"
        :data="partyBList"
        highlight-current-row
        @row-click="handlePartyBRowClick">
        <el-table-column width="55">
          <template slot-scope="scope">
            <el-radio v-model="selectedPartyBId" :label="scope.row.id">&nbsp;</el-radio>
          </template>
        </el-table-column>
        <el-table-column prop="companyName" label="公司名称"/>
        <el-table-column prop="creditCode" label="统一信用代码"/>
      </el-table>
      <pagination
        v-show="partyBTotal>0"
        :total="partyBTotal"
        :page.sync="partyBQuery.pageNum"
        :limit.sync="partyBQuery.pageSize"
        @pagination="getPartyBList"
      />
      <div slot="footer" class="dialog-footer">
        <el-button @click="partyBDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="confirmPartyBSelect">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { listEnergyTradeContract, getEnergyTradeContract, delEnergyTradeContract, addEnergyTradeContract, updateEnergyTradeContract } from "@/api/sc/energyTradeContract";
import { listCorporation } from "@/api/sc/corporation";
import { listCompany } from "@/api/sc/company";
import LabelTitle from "@/views/sc/circuitLoadConfig/components/LabelTitle.vue";
export default {
  name: "EnergyTradeContract",
  components: { LabelTitle },
  data() {
    return {
      // 甲方选择相关
      partyADialogVisible: false,
      partyAList: [],
      partyATotal: 0,
      partyALoading: false,
      partyAQuery: {
        pageNum: 1,
        pageSize: 10,
        userName: undefined
      },
      selectedPartyAId: null,

      // 乙方选择相关
      partyBDialogVisible: false,
      partyBList: [],
      partyBTotal: 0,
      partyBLoading: false,
      partyBQuery: {
        pageNum: 1,
        pageSize: 10,
        companyName: undefined
      },
      selectedPartyBId: null,
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
      // 电能量交易合同表格数据
      energyTradeContractList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        partyAId: null,
        partyAName: null,
        partyACode: null,
        partyANo: null,
        partyAAddr: null,
        partyACredit: null,
        partyAContact: null,
        partyATel: null,
        partyAEmail: null,
        partyBId: null,
        partyBName: null,
        partyBCode: null,
        partyBAddr: null,
        partyBCredit: null,
        partyBContact: null,
        partyBTel: null,
        partyBEmail: null,
        contractType: null,
        contractName: null,
        contractNo: null,
        signDate: null,
        startDate: null,
        endDate: null,
        status: null,
        energyUsage: null,
        proxyPrice: null,
        fileName: null,
        fileType: null,
        filePath: null,
        fileSize: null,
        reserved1: null,
        reserved2: null
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        partyAName: [
          { required: true, message: "甲方名称不能为空", trigger: "blur" }
        ],
        partyACode: [
          { required: true, message: "甲方交易代码不能为空", trigger: "blur" }
        ],
        partyANo: [
          { required: true, message: "甲方户号不能为空", trigger: "blur" }
        ],
        partyBName: [
          { required: true, message: "乙方名称不能为空", trigger: "blur" }
        ],
        partyBCode: [
          { required: true, message: "乙方交易代码不能为空", trigger: "blur" }
        ],
        contractName: [
          { required: true, message: "合同名称不能为空", trigger: "blur" }
        ],
        contractNo: [
          { required: true, message: "合同编号不能为空", trigger: "blur" }
        ],
        signDate: [
          { required: true, message: "签订日期不能为空", trigger: "blur" }
        ],
        startDate: [
          { required: true, message: "生效日期不能为空", trigger: "blur" }
        ],
        endDate: [
          { required: true, message: "终止日期不能为空", trigger: "blur" }
        ],
      }
    };
  },
  created() {
    this.getList();
  },
  mounted() {
    this.getPartyAList();
    this.getPartyBList();
  },
  methods: {
    handleRowDblClick(row) {
      // 调用原有的修改方法
      this.handleUpdate(row);
    },
    // 甲方选择方法
    handlePartyASearch() {
      this.partyAQuery.pageNum = 1;
      this.getPartyAList();
    },
    async getPartyAList() {
      this.partyALoading = true;
      try {
        const response = await listCorporation(this.partyAQuery);
        if (response.code === 200) {
          this.partyAList = response.rows;
          this.partyATotal = response.total;
        }
      } finally {
        this.partyALoading = false;
      }
    },
    handlePartyARowClick(row) {
      this.selectedPartyAId = row.id;
    },
    confirmPartyASelect() {
      const selected = this.partyAList.find(item => item.id === this.selectedPartyAId);
      if (selected) {
        this.form.partyAId = selected.id;
        this.form.partyAName = selected.userName;
        this.form.partyANo = selected.userCode;
        this.form.partyAAddr = selected.powerAddress;
        this.form.partyACredit = selected.creditCode;
        this.form.partyAContact = selected.contactPerson;
        this.form.partyATel = selected.contactPhone;
        this.form.partyAEmail = selected.email;
        this.partyADialogVisible = false;
      }
    },

    // 乙方选择方法
    handlePartyBSearch() {
      this.partyBQuery.pageNum = 1;
      this.getPartyBList();
    },
    async getPartyBList() {
      this.partyBLoading = true;
      try {
        const response = await listCompany(this.partyBQuery);
        if (response.code === 200) {
          this.partyBList = response.rows;
          this.partyBTotal = response.total;
        }
      } finally {
        this.partyBLoading = false;
      }
    },
    handlePartyBRowClick(row) {
      this.selectedPartyBId = row.id;
    },
    confirmPartyBSelect() {
      const selected = this.partyBList.find(item => item.id === this.selectedPartyBId);
      if (selected) {
        this.form.partyBId = selected.id;
        this.form.partyBName = selected.companyName;
        this.form.partyBAddr = selected.registeredAddress;
        this.form.partyBCredit = selected.creditCode;
        this.form.partyBContact = selected.legalPerson;
        this.form.partyBTel = selected.contactInfo;
        this.partyBDialogVisible = false;
      }
    },
    /** 查询电能量交易合同列表 */
    getList() {
      this.loading = true;
      listEnergyTradeContract(this.queryParams).then(response => {
        this.energyTradeContractList = response.rows;
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
        contractId: null,
        partyAId: null,
        partyAName: null,
        partyACode: null,
        partyANo: null,
        partyAAddr: null,
        partyACredit: null,
        partyAContact: null,
        partyATel: null,
        partyAEmail: null,
        partyBId: null,
        partyBName: null,
        partyBCode: null,
        partyBAddr: null,
        partyBCredit: null,
        partyBContact: null,
        partyBTel: null,
        partyBEmail: null,
        contractType: null,
        contractName: null,
        contractNo: null,
        signDate: null,
        startDate: null,
        endDate: null,
        status: null,
        remark: null,
        createBy: null,
        createTime: null,
        updateBy: null,
        updateTime: null,
        energyUsage: null,
        proxyPrice: null,
        fileName: null,
        fileType: null,
        filePath: null,
        fileSize: null,
        reserved1: null,
        reserved2: null
      };
      this.selectedPartyAId = null;
      this.selectedPartyBId = null;
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
      this.ids = selection.map(item => item.contractId)
      this.single = selection.length!==1
      this.multiple = !selection.length
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
      this.open = true;
      this.title = "添加电能量交易合同";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const contractId = row.contractId || this.ids
      getEnergyTradeContract(contractId).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改电能量交易合同";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.contractId != null) {
            updateEnergyTradeContract(this.form).then(response => {
              this.$modal.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addEnergyTradeContract(this.form).then(response => {
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
      const contractIds = row.contractId || this.ids;
      this.$modal.confirm('是否确认删除电能量交易合同编号为"' + contractIds + '"的数据项？').then(function() {
        return delEnergyTradeContract(contractIds);
      }).then(() => {
        this.getList();
        this.$modal.msgSuccess("删除成功");
      }).catch(() => {});
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download('sc/energyTradeContract/export', {
        ...this.queryParams
      }, `energyTradeContract_${new Date().getTime()}.xlsx`)
    }
  }
};
</script>

<style lang="scss" scoped>
.el-form--inline .el-form-item {
  min-width: 240px; /* 控制每列最小宽度 */
  margin-right: 20px; /* 调整列间距 */
}
</style>
