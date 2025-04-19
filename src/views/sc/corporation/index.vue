<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="用户名称" prop="userName">
        <el-input
          v-model="queryParams.userName"
          placeholder="请输入用户名称"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="用户编号" prop="userCode">
        <el-input
          v-model="queryParams.userCode"
          placeholder="请输入用户编号"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="用户状态" prop="userStatus">
        <el-select v-model="queryParams.userStatus" placeholder="请选择用户状态" clearable>
          <el-option
            v-for="dict in dict.type.corporation_state"
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
          v-hasPermi="['sc:corporation:add']"
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
          v-hasPermi="['sc:corporation:edit']"
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
          v-hasPermi="['sc:corporation:remove']"
        >删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['sc:corporation:export']"
        >导出</el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="corporationList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
<!--      <el-table-column label="自增主键" align="center" prop="id" />-->
      <el-table-column label="用户名称" align="center" prop="userName" />
      <el-table-column label="统一社会信用代码" align="center" prop="creditCode" />
      <el-table-column label="所属区域编码" align="center" prop="areaCode" />
      <el-table-column label="注册资金(万元)" align="center" prop="registeredCapital" />
      <el-table-column label="行业分类" align="center" prop="industryCategory">
        <template slot-scope="scope">
          <dict-tag :options="dict.type.industry_type" :value="scope.row.industryCategory"/>
        </template>
      </el-table-column>
      <el-table-column label="用电类别" align="center" prop="powerCategory">
        <template slot-scope="scope">
          <dict-tag :options="dict.type.electricity_state" :value="scope.row.powerCategory"/>
        </template>
      </el-table-column>
      <el-table-column label="供电电压" align="center" prop="supplyVoltage">
        <template slot-scope="scope">
          <dict-tag :options="dict.type.supply_voltage" :value="scope.row.supplyVoltage"/>
        </template>
      </el-table-column>
      <el-table-column label="合约生效日期" align="center" prop="contractStart" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.contractStart, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="联系人" align="center" prop="contactPerson" />
      <el-table-column label="联系电话" align="center" prop="contactPhone" />
      <el-table-column label="邮箱" align="center" prop="email" />
      <el-table-column label="所属虚拟电厂id" align="center" prop="virtualPlant" />
      <el-table-column label="所属线路" align="center" prop="circuit" />
      <el-table-column label="用电地址" align="center" prop="powerAddress" />
      <el-table-column label="用户编号" align="center" prop="userCode" />
      <el-table-column label="用户状态" align="center" prop="userStatus">
        <template slot-scope="scope">
          <dict-tag :options="dict.type.corporation_state" :value="scope.row.userStatus"/>
        </template>
      </el-table-column>
      <el-table-column label="用户采集分类" align="center" prop="collectCategory">
        <template slot-scope="scope">
          <dict-tag :options="dict.type.collection_state" :value="scope.row.collectCategory"/>
        </template>
      </el-table-column>
      <el-table-column label="行业小类" align="center" prop="industrySubclass" />
      <el-table-column label="是否需求响应签约用户" align="center" prop="isDemandResponse">
        <template slot-scope="scope">
          <dict-tag :options="dict.type.sys_yes_no" :value="scope.row.isDemandResponse"/>
        </template>
      </el-table-column>
      <el-table-column label="合约有效期(年)" align="center" prop="contractPeriod" />
      <el-table-column label="所属变电站" align="center" prop="substation" />
      <el-table-column label="所属虚拟电厂" align="center" prop="extend1" />
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['sc:corporation:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['sc:corporation:remove']"
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

    <!-- 添加或修改企业用户信息对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="用户名称" prop="userName">
          <el-input v-model="form.userName" placeholder="请输入用户名称" />
        </el-form-item>
        <el-form-item label="统一社会信用代码" prop="creditCode">
          <el-input v-model="form.creditCode" placeholder="请输入统一社会信用代码" />
        </el-form-item>
        <el-form-item label="所属区域编码" prop="areaCode">
          <el-input v-model="form.areaCode" placeholder="请输入所属区域编码" />
        </el-form-item>
        <el-form-item label="注册资金(万元)" prop="registeredCapital">
          <el-input v-model="form.registeredCapital" placeholder="请输入注册资金(万元)" />
        </el-form-item>
        <el-form-item label="行业分类" prop="industryCategory">
          <el-select v-model="form.industryCategory" placeholder="请选择行业分类">
            <el-option
              v-for="dict in dict.type.industry_type"
              :key="dict.value"
              :label="dict.label"
              :value="dict.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="用电类别" prop="powerCategory">
          <el-select v-model="form.powerCategory" placeholder="请选择用电类别">
            <el-option
              v-for="dict in dict.type.electricity_state"
              :key="dict.value"
              :label="dict.label"
              :value="dict.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="供电电压" prop="supplyVoltage">
          <el-select v-model="form.supplyVoltage" placeholder="请选择供电电压">
            <el-option
              v-for="dict in dict.type.supply_voltage"
              :key="dict.value"
              :label="dict.label"
              :value="dict.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="合约生效日期" prop="contractStart">
          <el-date-picker clearable
            v-model="form.contractStart"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="请选择合约生效日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="联系人" prop="contactPerson">
          <el-input v-model="form.contactPerson" placeholder="请输入联系人" />
        </el-form-item>
        <el-form-item label="联系电话" prop="contactPhone">
          <el-input v-model="form.contactPhone" placeholder="请输入联系电话" />
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="form.email" placeholder="请输入邮箱" />
        </el-form-item>
        <el-form-item label="所属虚拟电厂id" prop="virtualPlant">
          <el-input v-model="form.virtualPlant" placeholder="请输入所属虚拟电厂id" />
        </el-form-item>
        <el-form-item label="所属线路" prop="circuit">
          <el-input v-model="form.circuit" placeholder="请输入所属线路" />
        </el-form-item>
        <el-form-item label="用电地址" prop="powerAddress">
          <el-input v-model="form.powerAddress" placeholder="请输入用电地址" />
        </el-form-item>
        <el-form-item label="用户编号" prop="userCode">
          <el-input v-model="form.userCode" placeholder="请输入用户编号" />
        </el-form-item>
        <el-form-item label="用户状态" prop="userStatus">
          <el-select v-model="form.userStatus" placeholder="请选择用户状态">
            <el-option
              v-for="dict in dict.type.corporation_state"
              :key="dict.value"
              :label="dict.label"
              :value="dict.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="用户采集分类" prop="collectCategory">
          <el-select v-model="form.collectCategory" placeholder="请选择用户采集分类">
            <el-option
              v-for="dict in dict.type.collection_state"
              :key="dict.value"
              :label="dict.label"
              :value="dict.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="行业小类" prop="industrySubclass">
          <el-input v-model="form.industrySubclass" placeholder="请输入行业小类" />
        </el-form-item>
        <el-form-item label="是否需求响应签约用户" prop="isDemandResponse">
          <el-radio-group v-model="form.isDemandResponse">
            <el-radio
              v-for="dict in dict.type.sys_yes_no"
              :key="dict.value"
              :label="dict.value"
            >{{dict.label}}</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="合约有效期(年)" prop="contractPeriod">
          <el-input v-model="form.contractPeriod" placeholder="请输入合约有效期(年)" />
        </el-form-item>
        <el-form-item label="所属变电站" prop="substation">
          <el-input v-model="form.substation" placeholder="请输入所属变电站" />
        </el-form-item>
<!--        <el-form-item label="所属虚拟电厂" prop="extend1">
          <el-input v-model="form.extend1" placeholder="请输入所属虚拟电厂" />
        </el-form-item>
        <el-form-item label="扩展2" prop="extend2">
          <el-input v-model="form.extend2" placeholder="请输入扩展2" />
        </el-form-item>-->
        <el-form-item label="备注" prop="remark">
          <el-input v-model="form.remark" type="textarea" placeholder="请输入内容" />
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
import { listCorporation, getCorporation, delCorporation, addCorporation, updateCorporation } from "@/api/sc/corporation";

export default {
  name: "Corporation",
  dicts: ['supply_voltage', 'industry_type', 'sys_yes_no', 'collection_state', 'electricity_state', 'corporation_state'],
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
      // 企业用户信息表格数据
      corporationList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        userName: null,
        creditCode: null,
        areaCode: null,
        registeredCapital: null,
        industryCategory: null,
        powerCategory: null,
        supplyVoltage: null,
        contractStart: null,
        contactPerson: null,
        contactPhone: null,
        email: null,
        virtualPlant: null,
        circuit: null,
        powerAddress: null,
        userCode: null,
        userStatus: null,
        collectCategory: null,
        industrySubclass: null,
        isDemandResponse: null,
        contractPeriod: null,
        substation: null,
        extend1: null,
        extend2: null,
      },
      // 表单参数
      form: {},
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
      }
    };
  },
  created() {
    this.getList();
  },
  methods: {
    /** 查询企业用户信息列表 */
    getList() {
      this.loading = true;
      listCorporation(this.queryParams).then(response => {
        this.corporationList = response.rows;
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
        userName: null,
        creditCode: null,
        areaCode: null,
        registeredCapital: null,
        industryCategory: null,
        powerCategory: null,
        supplyVoltage: null,
        contractStart: null,
        contactPerson: null,
        contactPhone: null,
        email: null,
        virtualPlant: null,
        circuit: null,
        powerAddress: null,
        userCode: null,
        userStatus: null,
        collectCategory: null,
        industrySubclass: null,
        isDemandResponse: null,
        contractPeriod: null,
        substation: null,
        extend1: null,
        extend2: null,
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
      this.ids = selection.map(item => item.id)
      this.single = selection.length!==1
      this.multiple = !selection.length
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
      this.open = true;
      this.title = "添加企业用户信息";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids
      getCorporation(id).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改企业用户信息";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id != null) {
            updateCorporation(this.form).then(response => {
              this.$modal.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addCorporation(this.form).then(response => {
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
      this.$modal.confirm('是否确认删除企业用户信息编号为"' + ids + '"的数据项？').then(function() {
        return delCorporation(ids);
      }).then(() => {
        this.getList();
        this.$modal.msgSuccess("删除成功");
      }).catch(() => {});
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download('sc/corporation/export', {
        ...this.queryParams
      }, `corporation_${new Date().getTime()}.xlsx`)
    }
  }
};
</script>
