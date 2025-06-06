<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch" label-width="100px">
<!--      <el-form-item label="采集点编号" prop="cpNo">
        <el-input
          v-model="queryParams.cpNo"
          placeholder="请输入采集点编号"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>-->
      <el-form-item label="采集点名称" prop="cpName">
        <el-input
          v-model="queryParams.cpName"
          placeholder="请输入采集点名称"
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
          icon="el-icon-plus"
          size="mini"
          @click="handleAdd"
          v-hasPermi="['sc:cp:add']"
        >新增</el-button>
      </el-col>
      <!-- <el-col :span="1.5">
        <el-button
          type="success"
          plain
          icon="el-icon-edit"
          size="mini"
          :disabled="single"
          @click="handleUpdate"
          v-hasPermi="['sc:cp:edit']"
        >修改</el-button>
      </el-col> -->
      <el-col :span="1.5">
        <el-button
          type="danger"
          plain
          icon="el-icon-delete"
          size="mini"
          :disabled="multiple"
          @click="handleDelete"
          v-hasPermi="['sc:cp:remove']"
        >删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['sc:cp:export']"
        >导出</el-button>
      </el-col>

<!--      <el-col :span="1.5">
        <el-button
          type="info"
          plain
          icon="el-icon-upload2"
          size="mini"
          @click="handleIssue"
          v-hasPermi="['sc:cp:issue']"
        >下发</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleCall"
          v-hasPermi="['sc:cp:call']"
        >召测</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="success"
          plain
          icon="el-icon-refresh-left"
          size="mini"
          @click="handleSupply"
          v-hasPermi="['sc:cp:supply']"
        >补抄</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="primary"
          plain
          icon="el-icon-info"
          size="mini"
          @click="handleGetStatus"
          v-hasPermi="['sc:cp:status']"
        >获取状态</el-button>
      </el-col>-->
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="cpList" @selection-change="handleSelectionChange" @row-dblclick="handleUpdate">
      <el-table-column type="selection" width="55" align="center" />
<!--      <el-table-column label="采集点标识" align="center" width="100" prop="cjCpNo" />-->
      <el-table-column label="采集点编号" align="center" width="100" prop="cpNo" />
      <el-table-column label="采集点名称" align="center" width="100" prop="cpName" />
      <el-table-column label="所属区域" align="center" prop="areaId" />
      <el-table-column label="采集点运行状态" align="center" width="120" prop="statusCode">
        <template slot-scope="scope">
          <dict-tag :options="dict.type.collection_point_status" :value="scope.row.statusCode"/>
        </template>
      </el-table-column>
      <el-table-column label="主通讯方式" align="center" width="100" prop="chnMain">
        <template slot-scope="scope">
          <dict-tag :options="dict.type.communication_mode" :value="scope.row.chnMain"/>
        </template>
      </el-table-column>
      <el-table-column label="地址编码" align="center" prop="addrCode" />
      <el-table-column label="通讯规约序列" align="center" width="120" prop="protocolCode" />
      <el-table-column label="电话号码" align="center" prop="phone1" />
      <el-table-column label="终端型号" align="center" prop="modelCode" />
      <el-table-column label="终端地址" align="center" prop="trmAddr" />
      <el-table-column label="终端资产编号" align="center" width="120" prop="assetNo" />
<!--      <el-table-column label="采集点类型" align="center" width="100" prop="cpTypeCode">
        <template slot-scope="scope">
          <dict-tag :options="dict.type.collection_point_type" :value="scope.row.cpTypeCode"/>
        </template>
      </el-table-column>
      <el-table-column label="采集点安装地址" align="center" width="120" prop="cpAddr" />
      <el-table-column label="行政编码" align="center" prop="districtCode" />
      <el-table-column label="端口号" align="center" prop="port" />
      <el-table-column label="子通讯规约" align="center" width="100" prop="subProtocolCode">
        <template slot-scope="scope">
          <dict-tag :options="dict.type.sub_protocol_1" :value="scope.row.subProtocolCode"/>
        </template>
      </el-table-column>
      <el-table-column label="模板组ID" align="center" prop="tmpGroupId" />

      <el-table-column label="IP地址" align="center" prop="ipAddr" />
      <el-table-column label="串口参数" align="center" prop="comPara" />

      <el-table-column label="SIM卡ID" align="center" prop="simId" />
      <el-table-column label="投运日期" align="center" prop="instDate" width="80">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.instDate, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="建档日期" align="center" prop="docCreateDate" width="80">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.docCreateDate, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="建档人" align="center" prop="docCreatorNo" />
      <el-table-column label="安装日期" align="center" prop="installDate" width="80">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.installDate, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="安装人" align="center" prop="installerNo" />
      <el-table-column label="GPS经度" align="center" prop="gpsLongitude" />
      <el-table-column label="显示序号" align="center" prop="sortNo" />
      <el-table-column label="记录最后保存时间" align="center" prop="writeDate" width="150">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.writeDate, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="数据来源" align="center" prop="dataSource" />-->
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width" fixed="right" min-width="150">
        <template slot-scope="scope">
          <!-- <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['sc:cp:edit']"
          >修改</el-button> -->
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['sc:cp:remove']"
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

    <!-- 添加或修改采集点对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="1250px" height="80%" append-to-body>
      <div style="background: #F5F5F5;margin-bottom: 20px;" v-if="title.includes('修改')">
          <custome-tabs :active="active" :tabList="tabs" @change="changeTab"></custome-tabs>
      </div>
      <el-form v-if="active == 0" ref="form" :model="form" :rules="rules" :inline="true" label-width="160px">
        <LabelTitle title="基础信息" style="margin-bottom: 20px"/>
        <el-form-item label="采集点编号" prop="cpNo">
          <el-input v-model="form.cpNo" placeholder="请输入采集点编号" />
        </el-form-item>
        <el-form-item label="采集点名称" prop="cpName">
          <el-input v-model="form.cpName" placeholder="请输入采集点名称" />
        </el-form-item>
        <el-form-item label="所属区域" prop="areaCodePath">
          <el-cascader v-model="areaCodePath" :options="areaOptions" clearable @change="handleChange"
          placeholder="请选择所属区域" :props="{
            checkStrictly: false,
          }"></el-cascader>
          <!-- <el-input v-model="form.areaId" placeholder="请输入所属区域" /> -->
        </el-form-item>
        <el-form-item label="采集点类型" prop="cpTypeCode">
          <el-select v-model="form.cpTypeCode" placeholder="请选择采集点类型">
            <el-option
              v-for="dict in dict.type.collection_point_type"
              :key="dict.value"
              :label="dict.label"
              :value="dict.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="运行状态" prop="statusCode">
          <el-select v-model="form.statusCode" placeholder="请选择采集点运行状态">
            <el-option
              v-for="dict in dict.type.collection_point_status"
              :key="dict.value"
              :label="dict.label"
              :value="dict.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="终端型号" prop="modelCode">
          <el-input v-model="form.modelCode" placeholder="请输入终端型号" />
        </el-form-item>
        <LabelTitle title="通讯信息" style="margin-bottom: 20px"/>
        <el-form-item label="主通讯方式" prop="chnMain">
          <el-input v-model="form.chnMain" placeholder="请输入主通讯方式" />
        </el-form-item>
        <el-form-item label="行政编码" prop="districtCode">
          <el-input v-model="form.districtCode" placeholder="请输入行政编码" />
        </el-form-item>
        <el-form-item label="地址编码" prop="addrCode">
          <el-input v-model="form.addrCode" placeholder="请输入地址编码" />
        </el-form-item>
        <el-form-item label="IP地址" prop="ipAddr">
          <el-input v-model="form.ipAddr" placeholder="请输入IP地址" />
        </el-form-item>
        <el-form-item label="串口参数" prop="comPara">
          <el-input v-model="form.comPara" placeholder="请输入串口参数" />
        </el-form-item>
        <el-form-item label="电话号码" prop="phone1">
          <el-input v-model="form.phone1" placeholder="请输入电话号码" />
        </el-form-item>
        <el-form-item label="端口号" prop="port">
          <el-input v-model="form.port" placeholder="请输入端口号" />
        </el-form-item>
        <el-form-item label="通讯规约序列" prop="protocolCode">
          <el-input v-model="form.protocolCode" placeholder="请输入通讯规约序列" />
        </el-form-item>
        <el-form-item label="子通讯规约" prop="subProtocolCode">
          <el-select v-model="form.subProtocolCode" placeholder="请选择子通讯规约">
            <el-option
              v-for="dict in dict.type.sub_protocol_1"
              :key="dict.value"
              :label="dict.label"
              :value="dict.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <LabelTitle title="其他信息" style="margin-bottom: 20px"/>
        <el-form-item label="终端资产编号" prop="assetNo">
          <el-input v-model="form.assetNo" placeholder="请输入终端资产编号" />
        </el-form-item>
        <el-form-item label="采集点安装地址" prop="cpAddr">
          <el-input v-model="form.cpAddr" placeholder="请输入采集点安装地址" />
        </el-form-item>
        <el-form-item label="终端地址" prop="trmAddr">
          <el-input v-model="form.trmAddr" placeholder="请输入终端地址" />
        </el-form-item>
<!--        <el-form-item label="模板组ID" prop="tmpGroupId">
          <el-input v-model="form.tmpGroupId" placeholder="请输入模板组ID" />
        </el-form-item>-->

<!--        <el-form-item label="SIM卡ID" prop="simId">-->
<!--          <el-input v-model="form.simId" placeholder="请输入SIM卡ID" />-->
<!--        </el-form-item>-->
        <el-form-item label="投运日期" prop="instDate">
          <el-date-picker clearable
            v-model="form.instDate"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="请选择投运日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="建档日期" prop="docCreateDate">
          <el-date-picker clearable
            v-model="form.docCreateDate"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="请选择建档日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="建档人" prop="docCreatorNo">
          <el-input v-model="form.docCreatorNo" placeholder="请输入建档人" />
        </el-form-item>
        <el-form-item label="安装日期" prop="installDate">
          <el-date-picker clearable
            v-model="form.installDate"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="请选择安装日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="安装人" prop="installerNo">
          <el-input v-model="form.installerNo" placeholder="请输入安装人" />
        </el-form-item>
        <el-form-item label="GPS经度" prop="gpsLongitude">
          <el-input v-model="form.gpsLongitude" placeholder="请输入GPS经度" />
        </el-form-item>
<!--        <el-form-item label="显示序号" prop="sortNo">
          <el-input v-model="form.sortNo" placeholder="请输入显示序号" />
        </el-form-item>-->
<!--        <el-form-item label="记录最后保存时间" prop="writeDate">
          <el-date-picker clearable
            v-model="form.writeDate"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="请选择记录最后保存时间">
          </el-date-picker>
        </el-form-item>-->
<!--        <el-form-item label="数据来源" prop="dataSource">
          <el-input v-model="form.dataSource" placeholder="请输入数据来源" />
        </el-form-item>-->
      </el-form>
<!--      <MpInfo v-if="active == 1"></MpInfo>-->
      <MpInfo v-if="active == 1" :cjCpNo="form.cjCpNo"></MpInfo>
      <div v-if="active == 0" slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { listCp, getCp, delCp, addCp, updateCp } from "@/api/sc/cp";
import {  getAreaTree } from "@/api/sc/corporation";
import LabelTitle from "@/views/sc/circuitLoadConfig/components/LabelTitle.vue";
import MpInfo from "./mpInfo.vue";

export default {
  name: "Cp",
  components: { LabelTitle, MpInfo },
  dicts: ['sub_protocol_1', 'collection_point_status', 'collection_point_type'],
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
      // 采集点表格数据
      cpList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        cpNo: null,
        cpName: null,
        areaId: null,
        statusCode: null,
        modelCode: null,
        assetNo: null,
        cpTypeCode: null,
        cpAddr: null,
        districtCode: null,
        addrCode: null,
        trmAddr: null,
        protocolCode: null,
        port: null,
        subProtocolCode: null,
        tmpGroupId: null,
        chnMain: null,
        ipAddr: null,
        comPara: null,
        phone1: null,
        simId: null,
        instDate: null,
        docCreateDate: null,
        docCreatorNo: null,
        installDate: null,
        installerNo: null,
        gpsLongitude: null,
        sortNo: null,
        writeDate: null,
        dataSource: null
      },
      areaOptions: [],//省市区列表
      areaCodePath: [],//省市区存储的所有值
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        cpNo: [
          { required: true, message: "采集点编号不能为空", trigger: "blur" }
        ],
        cpName: [
          { required: true, message: "采集点名称不能为空", trigger: "blur" }
        ],
        areaId: [
          { required: true, message: "所属区域不能为空", trigger: "blur" }
        ],
        assetNo: [
          { required: true, message: "终端资产编号不能为空", trigger: "blur" }
        ],
        cpAddr: [
          { required: true, message: "采集点安装地址不能为空", trigger: "blur" }
        ],
        districtCode: [
          { required: true, message: "行政编码不能为空", trigger: "blur" }
        ],
        port: [
          { required: true, message: "端口号不能为空", trigger: "blur" }
        ],
        tmpGroupId: [
          { required: true, message: "模板组ID不能为空", trigger: "blur" }
        ],
        ipAddr: [
          { required: true, message: "IP地址不能为空", trigger: "blur" }
        ],
        comPara: [
          { required: true, message: "串口参数不能为空", trigger: "blur" }
        ],
        phone1: [
          { required: true, message: "电话号码不能为空", trigger: "blur" }
        ],
        simId: [
          { required: true, message: "SIM卡ID不能为空", trigger: "blur" }
        ],
        instDate: [
          { required: true, message: "投运日期不能为空", trigger: "blur" }
        ],
        docCreateDate: [
          { required: true, message: "建档日期不能为空", trigger: "blur" }
        ],
        docCreatorNo: [
          { required: true, message: "建档人不能为空", trigger: "blur" }
        ],
        installDate: [
          { required: true, message: "安装日期不能为空", trigger: "blur" }
        ],
        installerNo: [
          { required: true, message: "安装人不能为空", trigger: "blur" }
        ],
        gpsLongitude: [
          { required: true, message: "GPS经度不能为空", trigger: "blur" }
        ],
      },
      active: 0,
        tabs: [
            {
                label: '采集点',
                value: 0
            },
            {
                label: '测量点',
                value: 1
            },
        ],
    };
  },
  watch: {
    form: {
      handler(newVal, oldVal) {
        if (newVal.areaId !== oldVal.areaId) {
          if (this.areaOptions.length == 0) {
            //获取区域信息
            getAreaTree().then(response => {
              this.areaOptions = response.data;
              this.areaCodePath = this.findFullPath(newVal.areaId, this.areaOptions) || [];
            });
          } else {
            this.areaCodePath = this.findFullPath(newVal.areaId, this.areaOptions) || [];
          }
        }
      },
      deep: true,
      immidiate: true,
    },
  },
  created() {
    this.getList();
  },
  methods: {
    /** 下发按钮操作 */
    /*handleIssue() {
      // 待实现
      this.$modal.msgSuccess("下发功能待实现");
    },
    /!** 召测按钮操作 *!/
    handleCall() {
      // 待实现
      this.$modal.msgSuccess("召测功能待实现");
    },
    /!** 补抄按钮操作 *!/
    handleSupply() {
      // 待实现
      this.$modal.msgSuccess("补抄功能待实现");
    },
    /!** 获取状态按钮操作 *!/
    handleGetStatus() {
      // 待实现
      this.$modal.msgSuccess("获取状态功能待实现");
    },*/
    /** 查询采集点列表 */
    getList() {
      this.loading = true;
      listCp(this.queryParams).then(response => {
        this.cpList = response.rows;
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
        cjCpNo: null,
        cpNo: null,
        cpName: null,
        areaId: null,
        statusCode: null,
        modelCode: null,
        assetNo: null,
        cpTypeCode: null,
        cpAddr: null,
        districtCode: null,
        addrCode: null,
        trmAddr: null,
        protocolCode: null,
        port: null,
        subProtocolCode: null,
        tmpGroupId: null,
        chnMain: null,
        ipAddr: null,
        comPara: null,
        phone1: null,
        simId: null,
        instDate: null,
        docCreateDate: null,
        docCreatorNo: null,
        installDate: null,
        installerNo: null,
        gpsLongitude: null,
        sortNo: null,
        writeDate: null,
        dataSource: null
      };
      this.resetForm("form");
    },
    //切换tab页
    changeTab(index) {
      this.active = index;
    },
    // 级联选择器值改变时触发
    handleChange(val) {
      console.log('val', val);
      this.form.areaId = val[val.length - 1] || ""; // 获取最后一级的值
      // this.form.areaId = val;
    },
    // 根据最后一级的值查找完整路径
    findFullPath(targetValue, options) {
      // 递归查找函数
      function findPath(nodes, path = []) {
        for (const node of nodes) {
          // 如果当前节点值匹配，返回当前路径
          if (node.value == targetValue) {
            return [...path, node.value];
          }
          // 如果有子节点，递归查找
          if (node.children && node.children.length > 0) {
            const foundPath = findPath(node.children, [...path, node.value]);
            if (foundPath) return foundPath;
          }
        }
        return null; // 未找到返回null
      }
      return findPath(options) || []; // 返回找到的路径或空数组
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
      this.ids = selection.map(item => item.cjCpNo)
      this.single = selection.length!==1
      this.multiple = !selection.length
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
      this.active = 0;
      this.open = true;
      this.title = "添加采集点";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const cjCpNo = row.cjCpNo || this.ids
      getCp(cjCpNo).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改采集点";
        // this.active = 0;
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.cjCpNo != null) {
            updateCp(this.form).then(response => {
              this.$modal.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addCp(this.form).then(response => {
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
      const cjCpNos = row.cjCpNo || this.ids;
      this.$modal.confirm('是否确认删除采集点编号为"' + cjCpNos + '"的数据项？').then(function() {
        return delCp(cjCpNos);
      }).then(() => {
        this.getList();
        this.$modal.msgSuccess("删除成功");
      }).catch(() => {});
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download('sc/cp/export', {
        ...this.queryParams
      }, `cp_${new Date().getTime()}.xlsx`)
    }
  }
};
</script>
<style lang="scss" scoped>
.el-dialog .el-form {
  height: 60vh;
  overflow: auto;
}
</style>
