<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="用户名称" prop="userName">
        <el-input v-model="queryParams.userName" placeholder="请输入用户名称" clearable @keyup.enter.native="handleQuery" />
      </el-form-item>
      <el-form-item label="用户编号" prop="userCode">
        <el-input v-model="queryParams.userCode" placeholder="请输入用户编号" clearable @keyup.enter.native="handleQuery" />
      </el-form-item>
      <el-form-item label="用户状态" prop="userStatus">
        <el-select v-model="queryParams.userStatus" placeholder="请选择用户状态" clearable>
          <el-option v-for="dict in dict.type.corporation_state" :key="dict.value" :label="dict.label"
                     :value="dict.value" />
        </el-select>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
        <el-button type="primary" icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
      </el-form-item>
    </el-form>

    <el-row :gutter="10" class="mb8">
      <!-- <el-col :span="1.5">
        <el-button type="success" plain icon="el-icon-edit" size="mini" :disabled="single" @click="handleUpdate"
                   v-hasPermi="['sc:corporation:edit']">修改</el-button>
      </el-col> -->
      <el-col :span="1.5">
        <el-button type="danger" plain icon="el-icon-delete" size="mini" :disabled="multiple" @click="handleDelete"
                   v-hasPermi="['sc:corporation:remove']">删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button type="warning" plain icon="el-icon-download" size="mini" @click="handleExport"
                   v-hasPermi="['sc:corporation:export']">导出</el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>
    <div class="table-container">
      <el-table border v-loading="loading" height="100%" :data="corporationList"
                @selection-change="handleSelectionChange" @row-dblclick="handleUpdate">
        <el-table-column type="selection" width="50" fixed align="center" />
        <!--      <el-table-column show-overflow-tooltip label="自增主键" align="center" prop="id" />-->
        <el-table-column show-overflow-tooltip label="用户名称" align="center" prop="userName" min-width="150" />
        <el-table-column show-overflow-tooltip label="用户编号" align="center" prop="userCode" min-width="80" />
        <el-table-column show-overflow-tooltip label="统一社会信用代码" align="center" prop="creditCode" min-width="150" />
        <el-table-column show-overflow-tooltip label="所属区域" align="center" prop="areaCode" min-width="120" />
        <el-table-column show-overflow-tooltip label="用电地址" align="center" prop="powerAddress" min-width="120" />
        <!--        <el-table-column show-overflow-tooltip label="注册资金(万元)" align="center" prop="registeredCapital"
                  min-width="120" />-->
        <el-table-column show-overflow-tooltip label="行业分类" align="center" prop="industryCategory" min-width="80">
          <template slot-scope="scope">
            <dict-tag :options="dict.type.industry_type" :value="scope.row.industryCategory" />
          </template>
        </el-table-column>
        <el-table-column show-overflow-tooltip label="供电电压" align="center" prop="supplyVoltage" min-width="80">
          <template slot-scope="scope">
            <dict-tag :options="dict.type.supply_voltage" :value="scope.row.supplyVoltage" />
          </template>
        </el-table-column>
        <el-table-column show-overflow-tooltip label="联系人" align="center" prop="contactPerson" min-width="80" />
        <el-table-column show-overflow-tooltip label="联系电话" align="center" prop="contactPhone" min-width="80" />
        <el-table-column show-overflow-tooltip label="是否需求响应签约用户" align="center" prop="isDemandResponse"
                         min-width="160">
          <template slot-scope="scope">
            <dict-tag :options="dict.type.sys_yes_no" :value="scope.row.isDemandResponse" />
          </template>
        </el-table-column>
        <el-table-column show-overflow-tooltip label="用户状态" align="center" prop="userStatus" min-width="80">
          <template slot-scope="scope">
            <dict-tag :options="dict.type.corporation_state" :value="scope.row.userStatus" />
          </template>
        </el-table-column>
        <el-table-column show-overflow-tooltip label="用电类别" align="center" prop="powerCategory" min-width="100">
          <template slot-scope="scope">
            <dict-tag :options="dict.type.electricity_state" :value="scope.row.powerCategory" />
          </template>
        </el-table-column>


        <!--      <el-table-column show-overflow-tooltip label="自增主键" align="center" prop="id" />-->
<!--        <el-table-column show-overflow-tooltip label="用户名称" align="center" prop="userName" min-width="150" />
        <el-table-column show-overflow-tooltip label="统一社会信用代码" align="center" prop="creditCode" min-width="150" />
        <el-table-column show-overflow-tooltip label="所属区域编码" align="center" prop="areaCode" min-width="120" />
        <el-table-column show-overflow-tooltip label="注册资金(万元)" align="center" prop="registeredCapital"
                         min-width="120" />
        <el-table-column show-overflow-tooltip label="行业分类" align="center" prop="industryCategory" min-width="80">
          <template slot-scope="scope">
            <dict-tag :options="dict.type.industry_type" :value="scope.row.industryCategory" />
          </template>
        </el-table-column>
        <el-table-column show-overflow-tooltip label="用电类别" align="center" prop="powerCategory" min-width="100">
          <template slot-scope="scope">
            <dict-tag :options="dict.type.electricity_state" :value="scope.row.powerCategory" />
          </template>
        </el-table-column>
        <el-table-column show-overflow-tooltip label="供电电压" align="center" prop="supplyVoltage" min-width="80">
          <template slot-scope="scope">
            <dict-tag :options="dict.type.supply_voltage" :value="scope.row.supplyVoltage" />
          </template>
        </el-table-column>
        <el-table-column show-overflow-tooltip label="合约生效日期" align="center" prop="contractStart" width="100">
          <template slot-scope="scope">
            <span>{{ parseTime(scope.row.contractStart, '{y}-{m}-{d}') }}</span>
          </template>
        </el-table-column>
        <el-table-column show-overflow-tooltip label="联系人" align="center" prop="contactPerson" min-width="80" />
        <el-table-column show-overflow-tooltip label="联系电话" align="center" prop="contactPhone" min-width="80" />
        <el-table-column show-overflow-tooltip label="邮箱" align="center" prop="email" min-width="80" />
        <el-table-column show-overflow-tooltip label="所属虚拟电厂id" align="center" prop="virtualPlant" min-width="120" />
        <el-table-column show-overflow-tooltip label="所属线路" align="center" prop="circuit" min-width="80" />
        <el-table-column show-overflow-tooltip label="用电地址" align="center" prop="powerAddress" min-width="120" />
        <el-table-column show-overflow-tooltip label="用户编号" align="center" prop="userCode" min-width="80" />
        <el-table-column show-overflow-tooltip label="用户状态" align="center" prop="userStatus" min-width="80">
          <template slot-scope="scope">
            <dict-tag :options="dict.type.corporation_state" :value="scope.row.userStatus" />
          </template>
        </el-table-column>
        <el-table-column show-overflow-tooltip label="用户采集分类" align="center" prop="collectCategory" min-width="100">
          <template slot-scope="scope">
            <dict-tag :options="dict.type.collection_state" :value="scope.row.collectCategory" />
          </template>
        </el-table-column>
        <el-table-column show-overflow-tooltip label="行业小类" align="center" prop="industrySubclass" min-width="80" />
        <el-table-column show-overflow-tooltip label="是否需求响应签约用户" align="center" prop="isDemandResponse"
                         min-width="160">
          <template slot-scope="scope">
            <dict-tag :options="dict.type.sys_yes_no" :value="scope.row.isDemandResponse" />
          </template>
        </el-table-column>
        <el-table-column show-overflow-tooltip label="合约有效期(年)" align="center" prop="contractPeriod" min-width="110" />
        <el-table-column show-overflow-tooltip label="所属变电站" align="center" prop="substation" min-width="90" />
        <el-table-column show-overflow-tooltip label="所属虚拟电厂" align="center" prop="extend1" min-width="100" />-->
        <el-table-column label="操作" align="center" class-name="small-padding fixed-width" fixed="right" min-width="150">
          <template slot-scope="scope">
            <!-- <el-button size="mini" type="text" icon="el-icon-edit" @click="handleUpdate(scope.row)"
                       v-hasPermi="['sc:corporation:edit']">修改</el-button> -->
            <el-button size="mini" type="text" icon="el-icon-delete" @click="handleDelete(scope.row)"
                       v-hasPermi="['sc:corporation:remove']">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <pagination v-show="total > 0" :total="total" :page.sync="queryParams.pageNum" :limit.sync="queryParams.pageSize"
                @pagination="getList" />
    <!-- 添加或修改企业用户信息对话框 -->
    <el-dialog class="custom-dialog" :title="title" :visible.sync="addOrEditVisible" width="1380px" height="60%"
               append-to-body @close="close">
      <template v-if="addOrEditVisible">
        <AddDialog v-if="title == '新增'" :formData="form" @close="close"></AddDialog>
        <EditDialog v-else :formData="form" @close="close"></EditDialog>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import { listCorporation, getCorporation, delCorporation, addCorporation, updateCorporation } from "@/api/sc/corporation";
import AddDialog from "./components/addDialog";
import EditDialog from "./components/editDialog";

export default {
  name: "Corporation",
  dicts: ['supply_voltage', 'industry_type', 'sys_yes_no', 'collection_state', 'electricity_state', 'corporation_state'],
  components: {
    AddDialog,//新增弹窗
    EditDialog,//编辑弹窗
  },
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
      addOrEditVisible: false,//新增弹窗
      title: "",//弹窗标题
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
      this.addOrEditVisible = false;
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
      this.single = selection.length !== 1
      this.multiple = !selection.length
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
      this.title = "新增"
      this.addOrEditVisible = true;
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids
      getCorporation(id).then(response => {
        this.title = "修改"
        this.form = response.data;
        this.addOrEditVisible = true;
      });
    },
    // 查询数据
    close() {
      this.addOrEditVisible = false;
      this.getList();
    },
    /** 删除按钮操作 */
    handleDelete(row) {
      const ids = row.id || this.ids;
      this.$modal.confirm('是否确认删除企业用户信息编号为"' + ids + '"的数据项？').then(function () {
        return delCorporation(ids);
      }).then(() => {
        this.getList();
        this.$modal.msgSuccess("删除成功");
      }).catch(() => { });
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

<style lang="scss" scoped>
.table-container {
  height: 70vh;
  min-height: 10vh;
  max-height: 70vh;
  display: flex;
  flex-direction: column;
  overflow: auto;
}

/* 确保表格填满容器 */
.el-table {
  flex: 1;
  overflow: auto;
}

/* 使用深度选择器 */
::v-deep .custom-dialog {
  height: 70vh;
  display: flex;
  flex-direction: column;
}
</style>
