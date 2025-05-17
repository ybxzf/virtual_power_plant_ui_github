<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="测量点标识" prop="cjMpId">
        <el-input
          v-model="queryParams.cjMpId"
          placeholder="请输入测量点标识"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="数据时标" prop="dataDate">
        <el-date-picker clearable
          v-model="queryParams.dataDate"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="请选择数据时标">
        </el-date-picker>
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
          v-hasPermi="['sc:mpYcRead:add']"
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
          v-hasPermi="['sc:mpYcRead:edit']"
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
          v-hasPermi="['sc:mpYcRead:remove']"
        >删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['sc:mpYcRead:export']"
        >导出</el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="mpYcReadList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="ID" align="center" prop="id" />
      <el-table-column label="测量点标识" align="center" prop="cjMpId" />
      <el-table-column label="数据时标" align="center" prop="dataDate" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.dataDate, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="数据来源" align="center" prop="dataSource" />
      <el-table-column label="写入日期" align="center" prop="writeDate" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.writeDate, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="总有功功率(kV)" align="center" prop="pz" />
      <el-table-column label="A相有功功率(kV)" align="center" prop="pa" />
      <el-table-column label="B相有功功率(kV)" align="center" prop="pb" />
      <el-table-column label="C相有功功率(kV)" align="center" prop="pc" />
      <el-table-column label="总无功功率(kV)" align="center" prop="qz" />
      <el-table-column label="A相无功功率(kV)" align="center" prop="qa" />
      <el-table-column label="B相无功功率(kV)" align="center" prop="qb" />
      <el-table-column label="C相无功功率(kV)" align="center" prop="qc" />
      <el-table-column label="A相电压(V)" align="center" prop="ua" />
      <el-table-column label="B相电压(V)" align="center" prop="ub" />
      <el-table-column label="C相电压(V)" align="center" prop="uc" />
      <el-table-column label="A相电流(A)" align="center" prop="ia" />
      <el-table-column label="B相电流(A)" align="center" prop="ib" />
      <el-table-column label="C相电流(A)" align="center" prop="ic" />
      <el-table-column label="总功率因数" align="center" prop="cos" />
      <el-table-column label="A相功率因数" align="center" prop="cosa" />
      <el-table-column label="B相功率因数" align="center" prop="cosb" />
      <el-table-column label="C相功率因数" align="center" prop="cosc" />
<!--      <el-table-column label="零序电流" align="center" prop="midI" />
      <el-table-column label="PT变比值" align="center" prop="ptRatio" />
      <el-table-column label="CT 变比值" align="center" prop="ctRatio" />
      <el-table-column label="综合倍率" align="center" prop="tFactor" />-->
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['sc:mpYcRead:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['sc:mpYcRead:remove']"
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

    <!-- 添加或修改瞬时量数据对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="测量点标识" prop="cjMpId">
          <el-input v-model="form.cjMpId" placeholder="请输入测量点标识" />
        </el-form-item>
        <el-form-item label="数据时标" prop="dataDate">
          <el-date-picker clearable
            v-model="form.dataDate"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="请选择数据时标">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="数据来源" prop="dataSource">
          <el-input v-model="form.dataSource" placeholder="请输入数据来源" />
        </el-form-item>
        <el-form-item label="写入日期" prop="writeDate">
          <el-date-picker clearable
            v-model="form.writeDate"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="请选择写入日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="总有功功率" prop="pz">
          <el-input v-model="form.pz" placeholder="请输入总有功功率" />
        </el-form-item>
        <el-form-item label="A相有功功率" prop="pa">
          <el-input v-model="form.pa" placeholder="请输入A相有功功率" />
        </el-form-item>
        <el-form-item label="B相有功功率" prop="pb">
          <el-input v-model="form.pb" placeholder="请输入B相有功功率" />
        </el-form-item>
        <el-form-item label="C相有功功率" prop="pc">
          <el-input v-model="form.pc" placeholder="请输入C相有功功率" />
        </el-form-item>
        <el-form-item label="总无功功率" prop="qz">
          <el-input v-model="form.qz" placeholder="请输入总无功功率" />
        </el-form-item>
        <el-form-item label="A相无功功率" prop="qa">
          <el-input v-model="form.qa" placeholder="请输入A相无功功率" />
        </el-form-item>
        <el-form-item label="B相无功功率" prop="qb">
          <el-input v-model="form.qb" placeholder="请输入B相无功功率" />
        </el-form-item>
        <el-form-item label="C相无功功率" prop="qc">
          <el-input v-model="form.qc" placeholder="请输入C相无功功率" />
        </el-form-item>
        <el-form-item label="A相电压" prop="ua">
          <el-input v-model="form.ua" placeholder="请输入A相电压" />
        </el-form-item>
        <el-form-item label="B相电压" prop="ub">
          <el-input v-model="form.ub" placeholder="请输入B相电压" />
        </el-form-item>
        <el-form-item label="C相电压" prop="uc">
          <el-input v-model="form.uc" placeholder="请输入C相电压" />
        </el-form-item>
        <el-form-item label="A相电流" prop="ia">
          <el-input v-model="form.ia" placeholder="请输入A相电流" />
        </el-form-item>
        <el-form-item label="B相电流" prop="ib">
          <el-input v-model="form.ib" placeholder="请输入B相电流" />
        </el-form-item>
        <el-form-item label="C相电流" prop="ic">
          <el-input v-model="form.ic" placeholder="请输入C相电流" />
        </el-form-item>
        <el-form-item label="总功率因数" prop="cos">
          <el-input v-model="form.cos" placeholder="请输入总功率因数" />
        </el-form-item>
        <el-form-item label="A相功率因数" prop="cosa">
          <el-input v-model="form.cosa" placeholder="请输入A相功率因数" />
        </el-form-item>
        <el-form-item label="B相功率因数" prop="cosb">
          <el-input v-model="form.cosb" placeholder="请输入B相功率因数" />
        </el-form-item>
        <el-form-item label="C相功率因数" prop="cosc">
          <el-input v-model="form.cosc" placeholder="请输入C相功率因数" />
        </el-form-item>
        <el-form-item label="零序电流" prop="midI">
          <el-input v-model="form.midI" placeholder="请输入零序电流" />
        </el-form-item>
        <el-form-item label="PT变比值" prop="ptRatio">
          <el-input v-model="form.ptRatio" placeholder="请输入PT变比值" />
        </el-form-item>
        <el-form-item label="CT 变比值" prop="ctRatio">
          <el-input v-model="form.ctRatio" placeholder="请输入CT 变比值" />
        </el-form-item>
        <el-form-item label="综合倍率" prop="tFactor">
          <el-input v-model="form.tFactor" placeholder="请输入综合倍率" />
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
import { listMpYcRead, getMpYcRead, delMpYcRead, addMpYcRead, updateMpYcRead } from "@/api/sc/mpYcRead";

export default {
  name: "MpYcRead",
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
      // 瞬时量数据表格数据
      mpYcReadList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        cjMpId: null,
        dataDate: null,
        dataSource: null,
        writeDate: null,
        pz: null,
        pa: null,
        pb: null,
        pc: null,
        qz: null,
        qa: null,
        qb: null,
        qc: null,
        ua: null,
        ub: null,
        uc: null,
        ia: null,
        ib: null,
        ic: null,
        cos: null,
        cosa: null,
        cosb: null,
        cosc: null,
        midI: null,
        ptRatio: null,
        ctRatio: null,
        tFactor: null
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        cjMpId: [
          { required: true, message: "测量点标识不能为空", trigger: "blur" }
        ],
        dataSource: [
          { required: true, message: "数据来源不能为空", trigger: "blur" }
        ],
        pz: [
          { required: true, message: "总有功功率不能为空", trigger: "blur" }
        ],
        pa: [
          { required: true, message: "A相有功功率不能为空", trigger: "blur" }
        ],
        pb: [
          { required: true, message: "B相有功功率不能为空", trigger: "blur" }
        ],
        pc: [
          { required: true, message: "C相有功功率不能为空", trigger: "blur" }
        ],
        qz: [
          { required: true, message: "总无功功率不能为空", trigger: "blur" }
        ],
        qa: [
          { required: true, message: "A相无功功率不能为空", trigger: "blur" }
        ],
        qb: [
          { required: true, message: "B相无功功率不能为空", trigger: "blur" }
        ],
        qc: [
          { required: true, message: "C相无功功率不能为空", trigger: "blur" }
        ],
        ua: [
          { required: true, message: "A相电压不能为空", trigger: "blur" }
        ],
        ub: [
          { required: true, message: "B相电压不能为空", trigger: "blur" }
        ],
        uc: [
          { required: true, message: "C相电压不能为空", trigger: "blur" }
        ],
        ia: [
          { required: true, message: "A相电流不能为空", trigger: "blur" }
        ],
        ib: [
          { required: true, message: "B相电流不能为空", trigger: "blur" }
        ],
        ic: [
          { required: true, message: "C相电流不能为空", trigger: "blur" }
        ],
        cos: [
          { required: true, message: "总功率因数不能为空", trigger: "blur" }
        ],
        cosa: [
          { required: true, message: "A相功率因数不能为空", trigger: "blur" }
        ],
        cosb: [
          { required: true, message: "B相功率因数不能为空", trigger: "blur" }
        ],
        cosc: [
          { required: true, message: "C相功率因数不能为空", trigger: "blur" }
        ],
        midI: [
          { required: true, message: "零序电流不能为空", trigger: "blur" }
        ],
        ptRatio: [
          { required: true, message: "PT变比值不能为空", trigger: "blur" }
        ],
        ctRatio: [
          { required: true, message: "CT 变比值不能为空", trigger: "blur" }
        ],
        tFactor: [
          { required: true, message: "综合倍率不能为空", trigger: "blur" }
        ]
      }
    };
  },
  created() {
    this.getList();
  },
  methods: {
    /** 查询瞬时量数据列表 */
    getList() {
      this.loading = true;
      listMpYcRead(this.queryParams).then(response => {
        this.mpYcReadList = response.rows;
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
        cjMpId: null,
        dataDate: null,
        dataSource: null,
        writeDate: null,
        pz: null,
        pa: null,
        pb: null,
        pc: null,
        qz: null,
        qa: null,
        qb: null,
        qc: null,
        ua: null,
        ub: null,
        uc: null,
        ia: null,
        ib: null,
        ic: null,
        cos: null,
        cosa: null,
        cosb: null,
        cosc: null,
        midI: null,
        ptRatio: null,
        ctRatio: null,
        tFactor: null
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
      this.title = "添加瞬时量数据";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids
      getMpYcRead(id).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改瞬时量数据";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id != null) {
            updateMpYcRead(this.form).then(response => {
              this.$modal.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addMpYcRead(this.form).then(response => {
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
      this.$modal.confirm('是否确认删除瞬时量数据编号为"' + ids + '"的数据项？').then(function() {
        return delMpYcRead(ids);
      }).then(() => {
        this.getList();
        this.$modal.msgSuccess("删除成功");
      }).catch(() => {});
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download('sc/mpYcRead/export', {
        ...this.queryParams
      }, `mpYcRead_${new Date().getTime()}.xlsx`)
    }
  }
};
</script>
