<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="公司全称" prop="companyName">
        <el-input
          v-model="queryParams.companyName"
          placeholder="请输入公司全称"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="公司类型" prop="companyType">
        <el-select v-model="queryParams.companyType" placeholder="请选择公司类型" clearable>
          <el-option
            v-for="dict in dict.type.company_type"
            :key="dict.value"
            :label="dict.label"
            :value="dict.value"
          />
        </el-select>
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
          v-hasPermi="['sc:company:add']"
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
          v-hasPermi="['sc:company:edit']"
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
          v-hasPermi="['sc:company:remove']"
        >删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['sc:company:export']"
        >导出</el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="companyList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="ID" align="center" prop="id" />
      <el-table-column label="公司全称" align="center" prop="companyName" />
      <el-table-column label="公司编号" align="center" prop="companyCode" />
      <el-table-column label="公司类型" align="center" prop="companyType">
        <template slot-scope="scope">
          <dict-tag :options="dict.type.company_type" :value="scope.row.companyType"/>
        </template>
      </el-table-column>
      <el-table-column label="统一社会信用代码" align="center" prop="creditCode" />
      <el-table-column label="区域编码" align="center" prop="subordinateAreaCode" />
      <el-table-column label="详细注册地址" align="center" prop="registeredAddress" />
      <el-table-column label="法人姓名" align="center" prop="legalPerson" />
      <el-table-column label="联系电话" align="center" prop="contactInfo" />
      <el-table-column label="注册资金(万元)" align="center" prop="registeredCapital" />
<!--      <el-table-column label="备注信息" align="center" prop="remark" />
      <el-table-column label="扩展1" align="center" prop="reservedField1" />
      <el-table-column label="扩展2" align="center" prop="reservedField2" />-->
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['sc:company:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['sc:company:remove']"
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

    <!-- 添加或修改售电公司聚合商信息对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="公司全称" prop="companyName">
          <el-input v-model="form.companyName" placeholder="请输入公司全称" />
        </el-form-item>
        <el-form-item label="公司编号" prop="companyCode">
          <el-input v-model="form.companyCode" placeholder="请输入公司编号" />
        </el-form-item>
        <el-form-item label="公司类型" prop="companyType">
          <el-select v-model="form.companyType" placeholder="请选择公司类型">
            <el-option
              v-for="dict in dict.type.company_type"
              :key="dict.value"
              :label="dict.label"
              :value="dict.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="统一社会信用代码" prop="creditCode">
          <el-input v-model="form.creditCode" placeholder="请输入统一社会信用代码" />
        </el-form-item>
        <el-form-item label="区域编码" prop="subordinateAreaCode">
          <el-input v-model="form.subordinateAreaCode" placeholder="请输入区域编码" />
        </el-form-item>
        <el-form-item label="详细注册地址" prop="registeredAddress">
          <el-input v-model="form.registeredAddress" placeholder="请输入详细注册地址" />
        </el-form-item>
        <el-form-item label="法人姓名" prop="legalPerson">
          <el-input v-model="form.legalPerson" placeholder="请输入法人姓名" />
        </el-form-item>
        <el-form-item label="联系电话" prop="contactInfo">
          <el-input v-model="form.contactInfo" placeholder="请输入联系电话" />
        </el-form-item>
        <el-form-item label="注册资金(万元)" prop="registeredCapital">
          <el-input v-model="form.registeredCapital" placeholder="请输入注册资金(万元)" />
        </el-form-item>
        <el-form-item label="备注信息" prop="remark">
          <el-input v-model="form.remark" placeholder="请输入备注信息" />
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
import { listCompany, getCompany, delCompany, addCompany, updateCompany } from "@/api/sc/company";

export default {
  name: "Company",
  dicts: ['company_type'],
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
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
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
      // 表单校验
      rules: {
        companyName: [
          { required: true, message: "公司全称不能为空", trigger: "blur" }
        ],
        companyCode: [
          { required: true, message: "公司编号不能为空", trigger: "blur" }
        ],
        companyType: [
          { required: true, message: "公司类型不能为空", trigger: "change" }
        ],
        creditCode: [
          { required: true, message: "统一社会信用代码不能为空", trigger: "blur" }
        ],
        subordinateAreaCode: [
          { required: true, message: "区域编码不能为空", trigger: "blur" }
        ],
        registeredAddress: [
          { required: true, message: "详细注册地址不能为空", trigger: "blur" }
        ],
        legalPerson: [
          { required: true, message: "法人姓名不能为空", trigger: "blur" }
        ],
        contactInfo: [
          { required: true, message: "联系电话不能为空", trigger: "blur" }
        ],
        registeredCapital: [
          { required: true, message: "注册资金(万元)不能为空", trigger: "blur" }
        ],
      }
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
      this.open = false;
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
      this.single = selection.length!==1
      this.multiple = !selection.length
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
      this.open = true;
      this.title = "添加售电公司聚合商信息";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids
      getCompany(id).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改售电公司聚合商信息";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id != null) {
            updateCompany(this.form).then(response => {
              this.$modal.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addCompany(this.form).then(response => {
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
      this.$modal.confirm('是否确认删除售电公司聚合商信息编号为"' + ids + '"的数据项？').then(function() {
        return delCompany(ids);
      }).then(() => {
        this.getList();
        this.$modal.msgSuccess("删除成功");
      }).catch(() => {});
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
