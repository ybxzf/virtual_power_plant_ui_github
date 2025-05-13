<template>
  <div class="app-container">
    <el-form
      :model="queryParams"
      ref="queryForm"
      size="small"
      :inline="true"
      v-show="showSearch"
      label-width="68px"
    >
      <el-form-item label="采集点标识" prop="cjCpNo">
        <el-input
          v-model="queryParams.cjCpNo"
          placeholder="请输入采集点标识"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="采集点类型" prop="cpTypeCode">
        <el-input
          v-model="queryParams.cpTypeCode"
          placeholder="请输入采集点类型"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>

      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery"
          >搜索</el-button
        >
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
      </el-form-item>
    </el-form>

    <el-row :gutter="10" class="mb8">
      <!--      <el-col :span="1.5">-->
      <!--        <el-button-->
      <!--          type="primary"-->
      <!--          plain-->
      <!--          icon="el-icon-plus"-->
      <!--          size="mini"-->
      <!--          @click="handleAdd"-->
      <!--          v-hasPermi="['sc:cpOnlineStat:add']"-->
      <!--        >新增</el-button>-->
      <!--      </el-col>-->
      <!--      <el-col :span="1.5">-->
      <!--        <el-button-->
      <!--          type="success"-->
      <!--          plain-->
      <!--          icon="el-icon-edit"-->
      <!--          size="mini"-->
      <!--          :disabled="single"-->
      <!--          @click="handleUpdate"-->
      <!--          v-hasPermi="['sc:cpOnlineStat:edit']"-->
      <!--        >修改</el-button>-->
      <!--      </el-col>-->
      <!--      <el-col :span="1.5">-->
      <!--        <el-button-->
      <!--          type="danger"-->
      <!--          plain-->
      <!--          icon="el-icon-delete"-->
      <!--          size="mini"-->
      <!--          :disabled="multiple"-->
      <!--          @click="handleDelete"-->
      <!--          v-hasPermi="['sc:cpOnlineStat:remove']"-->
      <!--        >删除</el-button>-->
      <!--      </el-col>-->
      <!--      <el-col :span="1.5">-->
      <!--        <el-button-->
      <!--          type="warning"-->
      <!--          plain-->
      <!--          icon="el-icon-download"-->
      <!--          size="mini"-->
      <!--          @click="handleExport"-->
      <!--          v-hasPermi="['sc:cpOnlineStat:export']"-->
      <!--        >导出</el-button>-->
      <!--      </el-col>-->
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table
      v-loading="loading"
      :data="cpOnlineStatList"
      @selection-change="handleSelectionChange"
      @row-dblclick="handleRowDbClick"
    >
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="ID" align="center" prop="id" />
      <el-table-column label="采集点标识" align="center" prop="cjCpNo" />
      <el-table-column label="采集点类型" align="center" prop="cpTypeCode" />
      <el-table-column label="终端型号" align="center" prop="modelCode" />
      <el-table-column label="数据日期" align="center" prop="dataDate" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.dataDate, "{y}-{m}-{d}") }}</span>
        </template>
      </el-table-column>
      <el-table-column label="采集点状态" align="center" prop="statusCode">
        <template slot-scope="scope">
          <dict-tag :options="dict.type.collection_point_status" :value="scope.row.statusCode" />
        </template>
      </el-table-column>
      <el-table-column label="开始统计时间" align="center" prop="startTime" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.startTime, "{y}-{m}-{d}") }}</span>
        </template>
      </el-table-column>
      <el-table-column label="结束统计时间" align="center" prop="endTime" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.endTime, "{y}-{m}-{d}") }}</span>
        </template>
      </el-table-column>
      <el-table-column label="写入日期" align="center" prop="writeDate" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.writeDate, "{y}-{m}-{d}") }}</span>
        </template>
      </el-table-column>
      <el-table-column label="累计统计时间" align="center" prop="totalTime" />
      <el-table-column label="在线时间" align="center" prop="onlineTime" />
      <el-table-column label="掉线时间" align="center" prop="offlineTime" />
      <el-table-column label="掉线次数" align="center" prop="offlineTimes" />
      <el-table-column label="在线率" align="center" prop="onlineRate" />
      <el-table-column label="通信次数" align="center" prop="commNumber" />
      <el-table-column label="通信成功率" align="center" prop="commRate" />
      <el-table-column label="统计时是否有当天的数据" align="center" prop="dataFlag" />
      <el-table-column label="日登录次数" align="center" prop="loginTimes" />
      <el-table-column label="累计流量" align="center" prop="totalFlux" />
      <el-table-column label="累计上行流量" align="center" prop="upflux" />
      <el-table-column label="累计下行流量" align="center" prop="dnflux" />
      <el-table-column label="心跳登陆流量" align="center" prop="hbtFlux" />
      <el-table-column label="接入运行测量点数" align="center" prop="mpRunCount" />
      <el-table-column label="有数据测量点数" align="center" prop="mpDataCount" />
      <!--      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">-->
      <!--        <template slot-scope="scope">-->
      <!--          <el-button-->
      <!--            size="mini"-->
      <!--            type="text"-->
      <!--            icon="el-icon-edit"-->
      <!--            @click="handleUpdate(scope.row)"-->
      <!--            v-hasPermi="['sc:cpOnlineStat:edit']"-->
      <!--          >修改</el-button>-->
      <!--          <el-button-->
      <!--            size="mini"-->
      <!--            type="text"-->
      <!--            icon="el-icon-delete"-->
      <!--            @click="handleDelete(scope.row)"-->
      <!--            v-hasPermi="['sc:cpOnlineStat:remove']"-->
      <!--          >删除</el-button>-->
      <!--        </template>-->
      <!--      </el-table-column>-->
    </el-table>

    <pagination
      v-show="total > 0"
      :total="total"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
      @pagination="getList"
    />

    <!-- 添加或修改终端日在线情况对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="采集点标识" prop="cjCpNo">
          <el-input v-model="form.cjCpNo" placeholder="请输入采集点标识" />
        </el-form-item>
        <el-form-item label="采集点类型" prop="cpTypeCode">
          <el-input v-model="form.cpTypeCode" placeholder="请输入采集点类型" />
        </el-form-item>
        <el-form-item label="终端型号" prop="modelCode">
          <el-input v-model="form.modelCode" placeholder="请输入终端型号" />
        </el-form-item>
        <el-form-item label="数据日期" prop="dataDate">
          <el-date-picker
            clearable
            v-model="form.dataDate"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="请选择数据日期"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="采集点状态" prop="statusCode">
          <el-select v-model="form.statusCode" placeholder="请选择采集点状态">
            <el-option
              v-for="dict in dict.type.collection_point_status"
              :key="dict.value"
              :label="dict.label"
              :value="dict.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="开始统计时间" prop="startTime">
          <el-date-picker
            clearable
            v-model="form.startTime"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="请选择开始统计时间"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="结束统计时间" prop="endTime">
          <el-date-picker
            clearable
            v-model="form.endTime"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="请选择结束统计时间"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="写入日期" prop="writeDate">
          <el-date-picker
            clearable
            v-model="form.writeDate"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="请选择写入日期"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="累计统计时间" prop="totalTime">
          <el-input v-model="form.totalTime" placeholder="请输入累计统计时间" />
        </el-form-item>
        <el-form-item label="在线时间" prop="onlineTime">
          <el-input v-model="form.onlineTime" placeholder="请输入在线时间" />
        </el-form-item>
        <el-form-item label="掉线时间" prop="offlineTime">
          <el-input v-model="form.offlineTime" placeholder="请输入掉线时间" />
        </el-form-item>
        <el-form-item label="掉线次数" prop="offlineTimes">
          <el-input v-model="form.offlineTimes" placeholder="请输入掉线次数" />
        </el-form-item>
        <el-form-item label="在线率" prop="onlineRate">
          <el-input v-model="form.onlineRate" placeholder="请输入在线率" />
        </el-form-item>
        <el-form-item label="通信次数" prop="commNumber">
          <el-input v-model="form.commNumber" placeholder="请输入通信次数" />
        </el-form-item>
        <el-form-item label="通信成功率" prop="commRate">
          <el-input v-model="form.commRate" placeholder="请输入通信成功率" />
        </el-form-item>
        <el-form-item label="统计时是否有当天的数据" prop="dataFlag">
          <el-input v-model="form.dataFlag" placeholder="请输入统计时是否有当天的数据" />
        </el-form-item>
        <el-form-item label="日登录次数" prop="loginTimes">
          <el-input v-model="form.loginTimes" placeholder="请输入日登录次数" />
        </el-form-item>
        <el-form-item label="累计流量" prop="totalFlux">
          <el-input v-model="form.totalFlux" placeholder="请输入累计流量" />
        </el-form-item>
        <el-form-item label="累计上行流量" prop="upflux">
          <el-input v-model="form.upflux" placeholder="请输入累计上行流量" />
        </el-form-item>
        <el-form-item label="累计下行流量" prop="dnflux">
          <el-input v-model="form.dnflux" placeholder="请输入累计下行流量" />
        </el-form-item>
        <el-form-item label="心跳登陆流量" prop="hbtFlux">
          <el-input v-model="form.hbtFlux" placeholder="请输入心跳登陆流量" />
        </el-form-item>
        <el-form-item label="接入运行测量点数" prop="mpRunCount">
          <el-input v-model="form.mpRunCount" placeholder="请输入接入运行测量点数" />
        </el-form-item>
        <el-form-item label="有数据测量点数" prop="mpDataCount">
          <el-input v-model="form.mpDataCount" placeholder="请输入有数据测量点数" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>

    <el-dialog
      class="device-online-dialog"
      title="展示"
      :visible.sync="visible"
      width="1380px"
      height="80%"
      append-to-body
      @close="tabCancel"
    >
      <template v-if="visible">
        <EditDialog @close="tabCancel"></EditDialog>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import {
  listCpOnlineStat,
  getCpOnlineStat,
  delCpOnlineStat,
  addCpOnlineStat,
  updateCpOnlineStat,
} from "@/api/sc/cpOnlineStat";
import EditDialog from "./editDialog.vue";

export default {
  name: "CpOnlineStat",
  components: { EditDialog },
  dicts: ["collection_point_status"],
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
      // 终端日在线情况表格数据
      cpOnlineStatList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        cjCpNo: null,
        cpTypeCode: null,
        modelCode: null,
        dataDate: null,
        statusCode: null,
        startTime: null,
        endTime: null,
        writeDate: null,
        totalTime: null,
        onlineTime: null,
        offlineTime: null,
        offlineTimes: null,
        onlineRate: null,
        commNumber: null,
        commRate: null,
        dataFlag: null,
        loginTimes: null,
        totalFlux: null,
        upflux: null,
        dnflux: null,
        hbtFlux: null,
        mpRunCount: null,
        mpDataCount: null,
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        cjCpNo: [{ required: true, message: "采集点标识不能为空", trigger: "blur" }],
        startTime: [{ required: true, message: "开始统计时间不能为空", trigger: "blur" }],
        endTime: [{ required: true, message: "结束统计时间不能为空", trigger: "blur" }],
        writeDate: [{ required: true, message: "写入日期不能为空", trigger: "blur" }],
        totalTime: [{ required: true, message: "累计统计时间不能为空", trigger: "blur" }],
        onlineTime: [{ required: true, message: "在线时间不能为空", trigger: "blur" }],
        offlineTime: [{ required: true, message: "掉线时间不能为空", trigger: "blur" }],
        offlineTimes: [{ required: true, message: "掉线次数不能为空", trigger: "blur" }],
        onlineRate: [{ required: true, message: "在线率不能为空", trigger: "blur" }],
        commNumber: [{ required: true, message: "通信次数不能为空", trigger: "blur" }],
        commRate: [{ required: true, message: "通信成功率不能为空", trigger: "blur" }],
        dataFlag: [{ required: true, message: "统计时是否有当天的数据不能为空", trigger: "blur" }],
        loginTimes: [{ required: true, message: "日登录次数不能为空", trigger: "blur" }],
        totalFlux: [{ required: true, message: "累计流量不能为空", trigger: "blur" }],
        upflux: [{ required: true, message: "累计上行流量不能为空", trigger: "blur" }],
        dnflux: [{ required: true, message: "累计下行流量不能为空", trigger: "blur" }],
        hbtFlux: [{ required: true, message: "心跳登陆流量不能为空", trigger: "blur" }],
        mpRunCount: [{ required: true, message: "接入运行测量点数不能为空", trigger: "blur" }],
        mpDataCount: [{ required: true, message: "有数据测量点数不能为空", trigger: "blur" }],
      },
      currentRow: null,
      visible: false,
      activeName: "electricEnergyReading",
    };
  },
  created() {
    this.getList();
  },
  methods: {
    /** 查询终端日在线情况列表 */
    getList() {
      this.loading = true;
      listCpOnlineStat(this.queryParams).then((response) => {
        this.cpOnlineStatList = [{ id: 1 }] || response.rows;
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
        cjCpNo: null,
        cpTypeCode: null,
        modelCode: null,
        dataDate: null,
        statusCode: null,
        startTime: null,
        endTime: null,
        writeDate: null,
        totalTime: null,
        onlineTime: null,
        offlineTime: null,
        offlineTimes: null,
        onlineRate: null,
        commNumber: null,
        commRate: null,
        dataFlag: null,
        loginTimes: null,
        totalFlux: null,
        upflux: null,
        dnflux: null,
        hbtFlux: null,
        mpRunCount: null,
        mpDataCount: null,
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
      this.ids = selection.map((item) => item.id);
      this.single = selection.length !== 1;
      this.multiple = !selection.length;
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
      this.open = true;
      this.title = "添加终端日在线情况";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids;
      getCpOnlineStat(id).then((response) => {
        this.form = response.data;
        this.open = true;
        this.title = "修改终端日在线情况";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate((valid) => {
        if (valid) {
          if (this.form.id != null) {
            updateCpOnlineStat(this.form).then((response) => {
              this.$modal.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addCpOnlineStat(this.form).then((response) => {
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
      this.$modal
        .confirm('是否确认删除终端日在线情况编号为"' + ids + '"的数据项？')
        .then(function () {
          return delCpOnlineStat(ids);
        })
        .then(() => {
          this.getList();
          this.$modal.msgSuccess("删除成功");
        })
        .catch(() => {});
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download(
        "sc/cpOnlineStat/export",
        {
          ...this.queryParams,
        },
        `cpOnlineStat_${new Date().getTime()}.xlsx`
      );
    },
    handleRowDbClick(value) {
      this.currentRow = value;
      this.visible = true;
    },

    tabCancel() {
      this.visible = false;
    },
  },
};
</script>
<style lang="scss">
.device-online-dialog {
  .el-dialog__body {
    .content {
      max-height: 600px;
      overflow-y: auto;
    }
  }
}
</style>
