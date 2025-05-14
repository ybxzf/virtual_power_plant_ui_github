<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="公司全称" prop="companyName">
        <el-input v-model="queryParams.companyName" placeholder="请输入公司全称" clearable @keyup.enter.native="handleQuery" />
      </el-form-item>
      <el-form-item label="公司类型" prop="companyType">
        <el-select v-model="queryParams.companyType" placeholder="请选择公司类型" clearable>
          <el-option v-for="dict in dict.type.company_type" :key="dict.value" :label="dict.label" :value="dict.value" />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
      </el-form-item>
    </el-form>

    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button type="primary" plain icon="el-icon-plus" size="mini" @click="handleAdd"
          v-hasPermi="['sc:company:add']">新增</el-button>
      </el-col>
      <!--      <el-col :span="1.5">
        <el-button
          type="success"
          plain
          icon="el-icon-edit"
          size="mini"
          :disabled="single"
          @click="handleUpdate"
          v-hasPermi="['sc:company:edit']"
        >修改</el-button>
      </el-col>-->
      <el-col :span="1.5">
        <el-button type="danger" plain icon="el-icon-delete" size="mini" :disabled="multiple" @click="handleDelete"
          v-hasPermi="['sc:company:remove']">删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button type="warning" plain icon="el-icon-download" size="mini" @click="handleExport"
          v-hasPermi="['sc:company:export']">导出</el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="companyList" border @selection-change="handleSelectionChange"
      @row-dblclick="handleRowDblClick">
      <el-table-column type="selection" width="55" align="center" />
<!--      <el-table-column label="ID" align="center" prop="id" />-->
      <el-table-column label="公司全称" align="center" prop="companyName" />
      <el-table-column label="公司编号" align="center" prop="companyCode" />
      <el-table-column label="公司类型" align="center" prop="companyType">
        <template slot-scope="scope">
          <dict-tag :options="dict.type.company_type" :value="scope.row.companyType" />
        </template>
      </el-table-column>
      <el-table-column label="统一社会信用代码" align="center" prop="creditCode" />
      <el-table-column label="区域编码" align="center" prop="subordinateAreaCode" />
      <el-table-column show-overflow-tooltip label=" 详细注册地址" align="center" prop="registeredAddress" />
      <el-table-column label="法人姓名" align="center" prop="legalPerson" />
      <el-table-column label="联系电话" align="center" prop="contactInfo" />
      <el-table-column label="注册资金(万元)" align="center" prop="registeredCapital" />
      <!--      <el-table-column label="备注信息" align="center" prop="remark" />
      <el-table-column label="扩展1" align="center" prop="reservedField1" />
      <el-table-column label="扩展2" align="center" prop="reservedField2" />-->
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <!--          <el-button-->
          <!--            size="mini"-->
          <!--            type="text"-->
          <!--            icon="el-icon-edit"-->
          <!--            @click="handleUpdate(scope.row)"-->
          <!--            v-hasPermi="['sc:company:edit']"-->
          <!--          >修改</el-button>-->
          <el-button size="mini" type="text" icon="el-icon-delete" @click="handleDelete(scope.row)"
            v-hasPermi="['sc:company:remove']">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total > 0" :total="total" :page.sync="queryParams.pageNum" :limit.sync="queryParams.pageSize"
      @pagination="getList" />

    <!-- 添加或修改售电公司聚合商信息对话框 -->
    <el-dialog :title="title" :visible.sync="addOrEditVisible" width="1380px" append-to-body @close="close">
      <addOrEditDialog v-if="addOrEditVisible" :formData="form" @close="close"></addOrEditDialog>
    </el-dialog>
  </div>
</template>

<script>
import { listCompany, getCompany, delCompany, addCompany, updateCompany } from "@/api/sc/company";
import addOrEditDialog from "./components/addOrEditDialog.vue";

export default {
  name: "Company",
  dicts: ['company_type'],
  components: { addOrEditDialog },
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
      // 售电公司聚合商信息表格数据
      companyList: [],
      addOrEditVisible: false,//新增弹窗
      // 弹出层标题
      title: "",
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        companyName: null,
        companyCode: null,
        companyType: null,
        creditCode: null,
        subordinateAreaCode: null,
        registeredAddress: null,
        legalPerson: null,
        contactInfo: null,
        registeredCapital: null,
        reservedField1: null,
        reservedField2: null
      },
      // 表单参数
      form: {},
    };
  },
  created() {
    this.getList();
  },
  methods: {
    /** 查询售电公司聚合商信息列表 */
    getList() {
      this.loading = true;
      listCompany(this.queryParams).then(response => {
        this.companyList = response.rows;
        this.total = response.total;
        this.loading = false;
      });
    },
    // 取消按钮
    cancel() {
      this.addOrEditVisible = false;
      this.reset();
    },
    // 表单重置
    reset() {
      this.form = {
        id: null,
        companyName: null,
        companyCode: null,
        companyType: null,
        creditCode: null,
        subordinateAreaCode: null,
        registeredAddress: null,
        legalPerson: null,
        contactInfo: null,
        registeredCapital: null,
        remark: null,
        reservedField1: null,
        reservedField2: null
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
      this.single = selection.length !== 1
      this.multiple = !selection.length
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
      this.title = "添加售电公司聚合商信息";
      this.addOrEditVisible = true;
    },

    handleRowDblClick(row) {
      // 调用原有的修改方法
      this.handleUpdate(row);
    },

    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      // 确保无论是按钮点击还是行双击都使用row.id
      const id = row.id || (this.ids.length === 1 ? this.ids[0] : null);
      if (!id) {
        this.$modal.msgWarning("请选择一条要修改的数据");
        return;
      }
      getCompany(id).then(response => {
        this.form = response.data;
        this.title = "修改售电公司聚合商信息";
        this.addOrEditVisible = true;
      });
    },
    /*    handleUpdate(row) {
          this.reset();
          const id = row.id || this.ids
          getCompany(id).then(response => {
            this.form = response.data;
            this.addOrEditVisible = true;
            this.title = "修改售电公司聚合商信息";
          });
        },*/
    // 查询数据
    close() {
      this.addOrEditVisible = false;
      this.getList();
    },
    /** 删除按钮操作 */
    handleDelete(row) {
      const ids = row.id || this.ids;
      this.$modal.confirm('是否确认删除售电公司聚合商信息编号为"' + ids + '"的数据项？').then(function () {
        return delCompany(ids);
      }).then(() => {
        this.getList();
        this.$modal.msgSuccess("删除成功");
      }).catch(() => { });
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download('sc/company/export', {
        ...this.queryParams
      }, `company_${new Date().getTime()}.xlsx`)
    }
  }
};
</script>
<style lang="scss" scoped></style>
