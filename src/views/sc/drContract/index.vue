<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch" label-width="68px">
<!--      <el-form-item label="甲方名称" prop="partyAName">
        <el-input
          v-model="queryParams.partyAName"
          placeholder="请输入甲方名称"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="乙方名称" prop="partyBName">
        <el-input
          v-model="queryParams.partyBName"
          placeholder="请输入乙方名称"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>-->
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
          v-hasPermi="['sc:drContract:add']"
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
          v-hasPermi="['sc:drContract:edit']"
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
          v-hasPermi="['sc:drContract:remove']"
        >删除</el-button>
      </el-col>
<!--      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['sc:drContract:export']"
        >导出</el-button>
      </el-col>-->
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table @row-dblclick="handleRowDblClick" v-loading="loading" :data="drContractList" @selection-change="handleSelectionChange">
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
      <el-table-column label="结算方式" align="center" prop="settleType" />
      <el-table-column label="价格(元)" align="center" prop="price" />
      <el-table-column label="响应费用分成比例" align="center" prop="shareRatio" />
      <el-table-column label="考核费用分摊比例" align="center" prop="assessRatio" />
<!--      <el-table-column label="文件名" align="center" prop="fileName" />-->
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['sc:drContract:remove']"
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

    <!-- 添加或修改负荷响应合同对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="1380px" append-to-body>
      <el-form :inline="true" ref="form" :model="form" :rules="rules" label-width="180px">
<!--        <el-form-item label="甲方(用户)ID" prop="partyAId">
          <el-input v-model="form.partyAId" placeholder="请输入甲方(用户)ID" />
        </el-form-item>-->
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
            @click.native="userDialogVisible = true">
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
            @click.native="companyDialogVisible = true">
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
        <el-form-item label="价格(元)" prop="price">
          <el-input type="number" v-model="form.price" placeholder="请输入价格" />
        </el-form-item>
        <el-form-item label="响应费用分成比例(%)" prop="shareRatio">
          <el-input type="number" v-model="form.shareRatio" placeholder="请输入响应费用分成比例" />
        </el-form-item>
        <el-form-item label="考核费用分摊比例(%)" prop="assessRatio">
          <el-input type="number" v-model="form.assessRatio" placeholder="请输入考核费用分摊比例" />
        </el-form-item>

<!--        <el-form-item label="存储路径" prop="filePath">
          <el-input v-model="form.filePath" type="textarea" placeholder="请输入内容" />
        </el-form-item>
        <el-form-item label="文件大小" prop="fileSize">
          <el-input v-model="form.fileSize" placeholder="请输入文件大小" />
        </el-form-item>
        <el-form-item label="扩展字段1" prop="reserved1">
          <el-input v-model="form.reserved1" placeholder="请输入扩展字段1" />
        </el-form-item>
        <el-form-item label="扩展字段2" prop="reserved2">
          <el-input v-model="form.reserved2" placeholder="请输入扩展字段2" />
        </el-form-item>-->
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>

    <el-dialog title="选择乙方" :visible.sync="companyDialogVisible" width="70%">
      <el-form :inline="true">
        <el-form-item label="公司名称">
          <el-input v-model="companyQuery.companyName" placeholder="请输入公司名称"/>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleCompanySearch">搜索</el-button>
        </el-form-item>
      </el-form>
      <el-table
        v-loading="companyLoading"
        :data="companyList"
        @row-click="handleCompanyRowClick"
        highlight-current-row>
        <el-table-column width="55">
          <template slot-scope="scope">
            <el-radio v-model="selectedCompanyId" :label="scope.row.id">&nbsp;</el-radio>
          </template>
        </el-table-column>
        <el-table-column prop="companyName" label="公司名称"/>
        <el-table-column prop="creditCode" label="统一信用代码"/>
      </el-table>
      <pagination
        v-show="companyTotal>0"
        :total="companyTotal"
        :page.sync="companyQuery.pageNum"
        :limit.sync="companyQuery.pageSize"
        @pagination="getCompanyList"
      />
      <div slot="footer" class="dialog-footer">
        <el-button @click="companyDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="confirmCompanySelect">确定</el-button>
      </div>
    </el-dialog>

    <el-dialog title="选择甲方" :visible.sync="userDialogVisible" width="70%">
      <el-form :inline="true">
        <el-form-item label="用户名称">
          <el-input v-model="userQuery.userName" placeholder="请输入用户名称"/>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleUserSearch">搜索</el-button>
        </el-form-item>
      </el-form>
      <el-table
        v-loading="userLoading"
        :data="userList"
        @row-click="handleUserRowClick"
        highlight-current-row>
        <el-table-column width="55">
          <template slot-scope="scope">
            <el-radio v-model="selectedUserId" :label="scope.row.id">&nbsp;</el-radio>
          </template>
        </el-table-column>
        <el-table-column prop="userName" label="用户名称"/>
        <el-table-column prop="userCode" label="用户编号"/>
      </el-table>
      <pagination
        v-show="userTotal>0"
        :total="userTotal"
        :page.sync="userQuery.pageNum"
        :limit.sync="userQuery.pageSize"
        @pagination="getUserList"
      />
      <div slot="footer" class="dialog-footer">
        <el-button @click="userDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="confirmUserSelect">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { listDrContract, getDrContract, delDrContract, addDrContract, updateDrContract } from "@/api/sc/drContract";
import { listCompany } from "@/api/sc/company";
import { listCorporation } from "@/api/sc/corporation";
import LabelTitle from "@/views/sc/circuitLoadConfig/components/LabelTitle.vue";

export default {
  name: "DrContract",
  components: { LabelTitle },
  data() {
    return {
      // 乙方相关数据
      companyDialogVisible: false,
      companyList: [],
      companyTotal: 0,
      companyLoading: false,
      companyQuery: {
        pageNum: 1,
        pageSize: 10,
        companyName: undefined
      },
      selectedCompanyId: null,

      // 甲方相关数据
      userDialogVisible: false,
      userList: [],
      userTotal: 0,
      userLoading: false,
      userQuery: {
        pageNum: 1,
        pageSize: 10,
        userName: undefined
      },
      selectedUserId: null,
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
      // 负荷响应合同表格数据
      drContractList: [],
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
        settleType: null,
        price: null,
        shareRatio: null,
        assessRatio: null,
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
        partyANo: [
          { required: true, message: "甲方户号不能为空", trigger: "blur" }
        ],
        partyBName: [
          { required: true, message: "乙方名称不能为空", trigger: "blur" }
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
    this.getCompanyList();
    this.getUserList();
  },
  methods: {
    handleRowDblClick(row) {
      // 调用原有的修改方法
      this.handleUpdate(row);
    },
    // 乙方选择方法
    handleCompanySearch() {
      this.companyQuery.pageNum = 1;
      this.getCompanyList();
    },
    async getCompanyList() {
      this.companyLoading = true;
      try {
        const response = await listCompany(this.companyQuery);
        if (response.code === 200) {
          this.companyList = response.rows;
          this.companyTotal = response.total;
        }
      } finally {
        this.companyLoading = false;
      }
    },
    handleCompanyRowClick(row) {
      this.selectedCompanyId = row.id;
    },
    confirmCompanySelect() {
      const selected = this.companyList.find(item => item.id === this.selectedCompanyId);
      if (selected) {
        this.form.partyBId = selected.id;
        this.form.partyBName = selected.companyName;
        this.form.partyBAddr = selected.registeredAddress;
        this.form.partyBCredit = selected.creditCode;
        this.form.partyBContact = selected.legalPerson;
        this.form.partyBTel = selected.contactInfo;
        this.companyDialogVisible = false;
      }
    },

    // 甲方选择方法
    handleUserSearch() {
      this.userQuery.pageNum = 1;
      this.getUserList();
    },
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
    handleUserRowClick(row) {
      this.selectedUserId = row.id;
    },
    confirmUserSelect() {
      const selected = this.userList.find(item => item.id === this.selectedUserId);
      if (selected) {
        this.form.partyAId = selected.id;
        this.form.partyAName = selected.userName;
        this.form.partyANo = selected.userCode;
        this.form.partyAAddr = selected.powerAddress;
        this.form.partyACredit = selected.creditCode;
        this.form.partyAContact = selected.contactPerson;
        this.form.partyATel = selected.contactPhone;
        this.form.partyAEmail = selected.email;
        this.userDialogVisible = false;
      }
    },
    /** 查询负荷响应合同列表 */
    getList() {
      this.loading = true;
      listDrContract(this.queryParams).then(response => {
        this.drContractList = response.rows;
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
        settleType: null,
        price: null,
        shareRatio: null,
        assessRatio: null,
        fileName: null,
        fileType: null,
        filePath: null,
        fileSize: null,
        reserved1: null,
        reserved2: null
      };
      this.selectedCompanyId = null;
      this.selectedUserId = null;
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
      this.title = "添加负荷响应合同";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const contractId = row.contractId || this.ids
      getDrContract(contractId).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改负荷响应合同";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.contractId != null) {
            updateDrContract(this.form).then(response => {
              this.$modal.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addDrContract(this.form).then(response => {
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
      this.$modal.confirm('是否确认删除负荷响应合同编号为"' + contractIds + '"的数据项？').then(function() {
        return delDrContract(contractIds);
      }).then(() => {
        this.getList();
        this.$modal.msgSuccess("删除成功");
      }).catch(() => {});
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download('sc/drContract/export', {
        ...this.queryParams
      }, `drContract_${new Date().getTime()}.xlsx`)
    }
  }
};
</script>
<style lang="scss" scoped>
.el-form--inline .el-form-item {
  min-width: 240px; /* 控制每列最小宽度 */
  margin-right: 20px; /* 调整列间距 */
}
.el-input-group__append {
  cursor: pointer;
  background: #f5f7fa;
  &:hover {
    background: #e4e7ed;
  }
}
</style>
