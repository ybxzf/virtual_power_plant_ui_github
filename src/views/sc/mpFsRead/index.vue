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
          v-hasPermi="['sc:mpFsRead:add']"
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
          v-hasPermi="['sc:mpFsRead:edit']"
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
          v-hasPermi="['sc:mpFsRead:remove']"
        >删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['sc:mpFsRead:export']"
        >导出</el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="mpFsReadList" @selection-change="handleSelectionChange">
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
      <el-table-column label="正向有功总示度" align="center" prop="zxygz" />
      <el-table-column label="反向有功总示度" align="center" prop="fxygz" />
      <el-table-column label="正向无功总示度" align="center" prop="zxwgz" />
      <el-table-column label="反向无功总示度" align="center" prop="fxwgz" />
      <el-table-column label="正向有功费率1示度(尖)" align="center" prop="zxyg1" />
      <el-table-column label="反向有功费率1示度(尖)" align="center" prop="fxyg1" />
      <el-table-column label="正向无功费率1示度(尖)" align="center" prop="zxwg1" />
      <el-table-column label="反向无功费率1示度(尖)" align="center" prop="fxwg1" />
      <el-table-column label="正向有功费率2示度(峰)" align="center" prop="zxyg2" />
      <el-table-column label="反向有功费率2示度(峰)" align="center" prop="fxyg2" />
      <el-table-column label="正向无功费率2示度(峰)" align="center" prop="zxwg2" />
      <el-table-column label="反向无功费率2示度(峰)" align="center" prop="fxwg2" />
      <el-table-column label="正向有功费率3示度(平)" align="center" prop="zxyg3" />
      <el-table-column label="反向有功费率3示度(平)" align="center" prop="fxyg3" />
      <el-table-column label="正向无功费率3示度(平)" align="center" prop="zxwg3" />
      <el-table-column label="反向无功费率3示度(平)" align="center" prop="fxwg3" />
      <el-table-column label="正向有功费率4示度(谷)" align="center" prop="zxyg4" />
      <el-table-column label="反向有功费率4示度(谷)" align="center" prop="fxyg4" />
      <el-table-column label="正向无功费率4示度(谷)" align="center" prop="zxwg4" />
      <el-table-column label="反向无功费率4示度(谷)" align="center" prop="fxwg4" />
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['sc:mpFsRead:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['sc:mpFsRead:remove']"
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

    <!-- 添加或修改测量点分时电量示度数据对话框 -->
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
        <el-form-item label="正向有功总示度" prop="zxygz">
          <el-input v-model="form.zxygz" placeholder="请输入正向有功总示度" />
        </el-form-item>
        <el-form-item label="反向有功总示度" prop="fxygz">
          <el-input v-model="form.fxygz" placeholder="请输入反向有功总示度" />
        </el-form-item>
        <el-form-item label="正向无功总示度" prop="zxwgz">
          <el-input v-model="form.zxwgz" placeholder="请输入正向无功总示度" />
        </el-form-item>
        <el-form-item label="反向无功总示度" prop="fxwgz">
          <el-input v-model="form.fxwgz" placeholder="请输入反向无功总示度" />
        </el-form-item>
        <el-form-item label="正向有功费率1示度(尖)" prop="zxyg1">
          <el-input v-model="form.zxyg1" placeholder="请输入正向有功费率1示度(尖)" />
        </el-form-item>
        <el-form-item label="反向有功费率1示度(尖)" prop="fxyg1">
          <el-input v-model="form.fxyg1" placeholder="请输入反向有功费率1示度(尖)" />
        </el-form-item>
        <el-form-item label="正向无功费率1示度(尖)" prop="zxwg1">
          <el-input v-model="form.zxwg1" placeholder="请输入正向无功费率1示度(尖)" />
        </el-form-item>
        <el-form-item label="反向无功费率1示度(尖)" prop="fxwg1">
          <el-input v-model="form.fxwg1" placeholder="请输入反向无功费率1示度(尖)" />
        </el-form-item>
        <el-form-item label="正向有功费率2示度(峰)" prop="zxyg2">
          <el-input v-model="form.zxyg2" placeholder="请输入正向有功费率2示度(峰)" />
        </el-form-item>
        <el-form-item label="反向有功费率2示度(峰)" prop="fxyg2">
          <el-input v-model="form.fxyg2" placeholder="请输入反向有功费率2示度(峰)" />
        </el-form-item>
        <el-form-item label="正向无功费率2示度(峰)" prop="zxwg2">
          <el-input v-model="form.zxwg2" placeholder="请输入正向无功费率2示度(峰)" />
        </el-form-item>
        <el-form-item label="反向无功费率2示度(峰)" prop="fxwg2">
          <el-input v-model="form.fxwg2" placeholder="请输入反向无功费率2示度(峰)" />
        </el-form-item>
        <el-form-item label="正向有功费率3示度(平)" prop="zxyg3">
          <el-input v-model="form.zxyg3" placeholder="请输入正向有功费率3示度(平)" />
        </el-form-item>
        <el-form-item label="反向有功费率3示度(平)" prop="fxyg3">
          <el-input v-model="form.fxyg3" placeholder="请输入反向有功费率3示度(平)" />
        </el-form-item>
        <el-form-item label="正向无功费率3示度(平)" prop="zxwg3">
          <el-input v-model="form.zxwg3" placeholder="请输入正向无功费率3示度(平)" />
        </el-form-item>
        <el-form-item label="反向无功费率3示度(平)" prop="fxwg3">
          <el-input v-model="form.fxwg3" placeholder="请输入反向无功费率3示度(平)" />
        </el-form-item>
        <el-form-item label="正向有功费率4示度(谷)" prop="zxyg4">
          <el-input v-model="form.zxyg4" placeholder="请输入正向有功费率4示度(谷)" />
        </el-form-item>
        <el-form-item label="反向有功费率4示度(谷)" prop="fxyg4">
          <el-input v-model="form.fxyg4" placeholder="请输入反向有功费率4示度(谷)" />
        </el-form-item>
        <el-form-item label="正向无功费率4示度(谷)" prop="zxwg4">
          <el-input v-model="form.zxwg4" placeholder="请输入正向无功费率4示度(谷)" />
        </el-form-item>
        <el-form-item label="反向无功费率4示度(谷)" prop="fxwg4">
          <el-input v-model="form.fxwg4" placeholder="请输入反向无功费率4示度(谷)" />
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
import { listMpFsRead, getMpFsRead, delMpFsRead, addMpFsRead, updateMpFsRead } from "@/api/sc/mpFsRead";

export default {
  name: "MpFsRead",
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
      // 测量点分时电量示度数据表格数据
      mpFsReadList: [],
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
        zxygz: null,
        fxygz: null,
        zxwgz: null,
        fxwgz: null,
        zxyg1: null,
        fxyg1: null,
        zxwg1: null,
        fxwg1: null,
        zxyg2: null,
        fxyg2: null,
        zxwg2: null,
        fxwg2: null,
        zxyg3: null,
        fxyg3: null,
        zxwg3: null,
        fxwg3: null,
        zxyg4: null,
        fxyg4: null,
        zxwg4: null,
        fxwg4: null
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
        zxygz: [
          { required: true, message: "正向有功总示度不能为空", trigger: "blur" }
        ],
        fxygz: [
          { required: true, message: "反向有功总示度不能为空", trigger: "blur" }
        ],
        zxwgz: [
          { required: true, message: "正向无功总示度不能为空", trigger: "blur" }
        ],
        fxwgz: [
          { required: true, message: "反向无功总示度不能为空", trigger: "blur" }
        ],
        zxyg1: [
          { required: true, message: "正向有功费率1示度(尖)不能为空", trigger: "blur" }
        ],
        fxyg1: [
          { required: true, message: "反向有功费率1示度(尖)不能为空", trigger: "blur" }
        ],
        zxwg1: [
          { required: true, message: "正向无功费率1示度(尖)不能为空", trigger: "blur" }
        ],
        fxwg1: [
          { required: true, message: "反向无功费率1示度(尖)不能为空", trigger: "blur" }
        ],
        zxyg2: [
          { required: true, message: "正向有功费率2示度(峰)不能为空", trigger: "blur" }
        ],
        fxyg2: [
          { required: true, message: "反向有功费率2示度(峰)不能为空", trigger: "blur" }
        ],
        zxwg2: [
          { required: true, message: "正向无功费率2示度(峰)不能为空", trigger: "blur" }
        ],
        fxwg2: [
          { required: true, message: "反向无功费率2示度(峰)不能为空", trigger: "blur" }
        ],
        zxyg3: [
          { required: true, message: "正向有功费率3示度(平)不能为空", trigger: "blur" }
        ],
        fxyg3: [
          { required: true, message: "反向有功费率3示度(平)不能为空", trigger: "blur" }
        ],
        zxwg3: [
          { required: true, message: "正向无功费率3示度(平)不能为空", trigger: "blur" }
        ],
        fxwg3: [
          { required: true, message: "反向无功费率3示度(平)不能为空", trigger: "blur" }
        ],
        zxyg4: [
          { required: true, message: "正向有功费率4示度(谷)不能为空", trigger: "blur" }
        ],
        fxyg4: [
          { required: true, message: "反向有功费率4示度(谷)不能为空", trigger: "blur" }
        ],
        zxwg4: [
          { required: true, message: "正向无功费率4示度(谷)不能为空", trigger: "blur" }
        ],
        fxwg4: [
          { required: true, message: "反向无功费率4示度(谷)不能为空", trigger: "blur" }
        ]
      }
    };
  },
  created() {
    this.getList();
  },
  methods: {
    /** 查询测量点分时电量示度数据列表 */
    getList() {
      this.loading = true;
      listMpFsRead(this.queryParams).then(response => {
        this.mpFsReadList = response.rows;
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
        zxygz: null,
        fxygz: null,
        zxwgz: null,
        fxwgz: null,
        zxyg1: null,
        fxyg1: null,
        zxwg1: null,
        fxwg1: null,
        zxyg2: null,
        fxyg2: null,
        zxwg2: null,
        fxwg2: null,
        zxyg3: null,
        fxyg3: null,
        zxwg3: null,
        fxwg3: null,
        zxyg4: null,
        fxyg4: null,
        zxwg4: null,
        fxwg4: null
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
      this.title = "添加测量点分时电量示度数据";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids
      getMpFsRead(id).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改测量点分时电量示度数据";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id != null) {
            updateMpFsRead(this.form).then(response => {
              this.$modal.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addMpFsRead(this.form).then(response => {
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
      this.$modal.confirm('是否确认删除测量点分时电量示度数据编号为"' + ids + '"的数据项？').then(function() {
        return delMpFsRead(ids);
      }).then(() => {
        this.getList();
        this.$modal.msgSuccess("删除成功");
      }).catch(() => {});
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download('sc/mpFsRead/export', {
        ...this.queryParams
      }, `mpFsRead_${new Date().getTime()}.xlsx`)
    }
  }
};
</script>
