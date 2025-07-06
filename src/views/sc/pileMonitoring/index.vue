<template>
  <div>
    <div v-if="outFloor" class="app-container outFloor">
      <el-row :gutter="10">
        <el-col :span="6">
          <el-card shadow="always" class="left-ctn">
            <div class="card-value" style="width: 100%;text-align: center;">充电桩监测</div>
            <el-card v-for="(it, i) in monitorList" :key="i" @click.native="pageChange"
              style="height: 18%;width: 100%;position: relative;cursor: pointer;">
              <div slot="header" class="clearfix">
                <span>{{ it.label }}</span>
              </div>
              <div>
                <span class="card-value">{{ it.value }}</span>
                <el-image :src="it.icon"
                  style="width: 60px; height: 60px;position: absolute;right: 20px;top: 50%;transform: translateY(-50%)"></el-image>
              </div>
            </el-card>
          </el-card>
        </el-col>
        <el-col :span="18">
          <el-card shadow="always" class="chart-card">
            <div class="chart-title">
              <span>实时出力曲线</span>
            </div>
            <div style="position: absolute; right: 5%;top: 3%;z-index: 2;">
              <el-button size="mini" :type="chartType == 'realTimeLoadMonitoring' ? 'primary' : ''"
                @click="changeChartType('realTimeLoadMonitoring')">实时负荷</el-button>
              <el-button size="mini" :type="chartType == 'historyData' ? 'primary' : ''"
                @click="changeChartType('historyData')">历史数据</el-button>
            </div>
            <RealTimeLoadMonitoring v-if="chartType === 'realTimeLoadMonitoring'" class="real-time-load-monitoring">
            </RealTimeLoadMonitoring>
            <HistoryData v-else class="real-time-load-monitoring">
            </HistoryData>
          </el-card>
          <el-card shadow="always" class="chart-card" style="height: 50%;position: relative;">
            <div class="chart-title">
              <span>发电量统计</span>
            </div>
            <div style="position: absolute; right: 5%;top: 3%;z-index: 2;">
              <el-button size="mini" :type="chartType2 == 'powerGeneration' ? 'primary' : ''"
                @click="changeChartType2('powerGeneration')">发电量</el-button>
              <el-button size="mini" :type="chartType2 == 'historyData' ? 'primary' : ''"
                @click="changeChartType2('onGridEnergy')">上网电量</el-button>
            </div>
            <PowerGeneration v-if="chartType2 === 'powerGeneration'" class="real-time-load-monitoring">
            </PowerGeneration>
            <OnGridEnergy v-else class="real-time-load-monitoring">
            </OnGridEnergy>
          </el-card>
        </el-col>
      </el-row>
    </div>
    <div v-else class="app-container">
      <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch" label-width="100px">
        <el-button type="primary" icon="el-icon-back" size="mini" @click="pageChange">返回</el-button>
        <el-form-item label="采集点名称" prop="cpName">
          <el-input v-model="queryParams.cpName" placeholder="请输入采集点名称" clearable @keyup.enter.native="handleQuery" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
          <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
        </el-form-item>
      </el-form>

      <el-row :gutter="10" class="mb8">
        <!-- <el-col :span="1.5">
          <el-button type="primary" plain icon="el-icon-plus" size="mini" @click="handleAdd"
            v-hasPermi="['sc:cp:add']">新增</el-button>
        </el-col>
        <el-col :span="1.5">
          <el-button type="success" plain icon="el-icon-edit" size="mini" :disabled="single" @click="handleUpdate"
            v-hasPermi="['sc:cp:edit']">修改</el-button>
        </el-col>
        <el-col :span="1.5">
          <el-button type="danger" plain icon="el-icon-delete" size="mini" :disabled="multiple" @click="handleDelete"
            v-hasPermi="['sc:cp:remove']">删除</el-button>
        </el-col>
        <el-col :span="1.5">
          <el-button type="warning" plain icon="el-icon-download" size="mini" @click="handleExport"
            v-hasPermi="['sc:cp:export']">导出</el-button>
        </el-col> -->
        <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
      </el-row>

      <el-table v-loading="loading" :data="cpList" @selection-change="handleSelectionChange"
        @row-dblclick="handleRowDbClick">
        <!-- <el-table-column type="selection" width="55" align="center" /> -->
        <el-table-column type="index" label="序号" width="55" align="center" />
        <!--      <el-table-column label="采集点标识" align="center" width="100" prop="cjCpNo" />-->
        <el-table-column label="采集点编号" align="center" width="100" prop="cpNo" />
        <el-table-column label="采集点名称" align="center" width="100" prop="cpName" />
        <el-table-column label="所属区域" align="center" prop="areaId" />
        <el-table-column label="采集点运行状态" align="center" width="120" prop="statusCode">
          <template slot-scope="scope">
            <dict-tag :options="dict.type.collection_point_status" :value="scope.row.statusCode" />
          </template>
        </el-table-column>
        <el-table-column label="主通讯方式" align="center" width="100" prop="chnMain">
          <template slot-scope="scope">
            <dict-tag :options="dict.type.communication_mode" :value="scope.row.chnMain" />
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
        <!-- <el-table-column label="操作" align="center" class-name="small-padding fixed-width" fixed="right" min-width="150">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="text"
              icon="el-icon-edit"
              @click="handleUpdate(scope.row)"
              v-hasPermi="['sc:cp:edit']"
            >修改</el-button>
            <el-button size="mini" type="text" icon="el-icon-delete" @click="handleDelete(scope.row)"
              v-hasPermi="['sc:cp:remove']">删除</el-button>
          </template>
        </el-table-column> -->
      </el-table>

      <pagination v-show="total > 0" :total="total" :page.sync="queryParams.pageNum" :limit.sync="queryParams.pageSize"
        @pagination="getList" />

      <el-dialog class="device-online-dialog" title="展示" :visible.sync="visible" width="1380px" height="80%"
        append-to-body @close="tabCancel">
        <template v-if="visible">
          <EditDialog @close="tabCancel" :row="currentRow"></EditDialog>
        </template>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { listCp, getCp, delCp, addCp, updateCp } from "@/api/sc/cp";
import { getAreaTree } from "@/api/sc/corporation";
import LabelTitle from "@/views/sc/circuitLoadConfig/components/LabelTitle.vue";
import EditDialog from "./editDialog.vue";

import RealTimeLoadMonitoring from "./components/RealTimeLoadMonitoring.vue";
import HistoryData from "./components/historyData.vue";
import PowerGeneration from "./components/powerGeneration.vue";
import OnGridEnergy from "./components/onGridEnergy.vue";

export default {
  name: "Cp",
  components: { LabelTitle, EditDialog, RealTimeLoadMonitoring, HistoryData, PowerGeneration, OnGridEnergy, },
  dicts: ['sub_protocol_1', 'collection_point_status', 'collection_point_type'],
  data() {
    return {
      outFloor: true, //外层显示
      monitorList: [
        { label: "户数(户)", value: '23', icon: "/img/icons/icon_1.png" },
        { label: "充电桩数量(台)", value: '613', icon: "/img/icons/icon_2.png" },
        { label: "装机容量(万kW)", value: '0.6', icon: "/img/icons/icon_3.png" },
        { label: "昨日最大负荷(万kW)", value: '2.1', icon: "/img/icons/icon_4.png" },
        { label: "昨日充电量(万kwh)", value: '1.19', icon: "/img/icons/icon_5.png" },
      ],
      chartType: 'realTimeLoadMonitoring',//图表类型
      chartType2: "powerGeneration",
      currentRow: null,
      visible: false,
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
    //页面切换
    pageChange() {
      this.outFloor = !this.outFloor;
    },
    // 切换图表类型
    changeChartType(type) {
      this.chartType = type;
    },
    // 切换图表类型
    changeChartType2(type) {
      this.chartType2 = type;
    },
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
    //打开详情
    handleRowDbClick(value) {
      console.log(value);

      this.currentRow = value;
      this.visible = true;
    },
    //关闭详情
    tabCancel() {
      this.visible = false;
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
      this.single = selection.length !== 1
      this.multiple = !selection.length
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
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
      this.$modal.confirm('是否确认删除采集点编号为"' + cjCpNos + '"的数据项？').then(function () {
        return delCp(cjCpNos);
      }).then(() => {
        this.getList();
        this.$modal.msgSuccess("删除成功");
      }).catch(() => { });
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
.app-container {
  height: calc(100vh - 85px);
}

.outFloor {

  .el-row,
  .el-col {
    height: 100%;
  }
}

.left-ctn {
  height: 100%;

  ::v-deep .el-card__body {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  ::v-deep .el-card__header {
    border-bottom: none;
  }

  .card-value {
    font-weight: 600;
    font-size: 36px;
    /* 倾斜效果 */
    transform: skewX(-15deg);
    /* 水平倾斜15度 */
    display: inline-block;
    /* 必须设置为行内块元素 */

    /* 渐变背景 */
    background: linear-gradient(to bottom, #1E90FF, #00FF7F);
    /* 从道奇蓝到春绿色 */

    /* 文字渐变关键步骤 */
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;

    /* 可选：添加阴影增强立体感 */
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
}

.chart-card {
  height: calc(50% - 10px);
  margin-bottom: 10px;
  position: relative;

  ::v-deep .el-card__body {
    width: 100%;
    height: 100%;
  }

  .chart-title {
    display: inline-block;
    width: 50%;
    border-left: 5px solid #409EFF;
    padding-left: 5px;
  }
}



.el-dialog .el-form {
  height: 60vh;
  overflow: auto;
}
</style>
