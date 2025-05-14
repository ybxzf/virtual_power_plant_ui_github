<script>
import { chartOption, curveList, data1, echartData, oneList } from '@/views/sc/cpOnlineStat/const'
import * as echarts from "echarts";
import { listMpYcRead } from '@/api/sc/mpYcRead'
import { getOptionList, getQxChartData, getQxList } from '@/api/sc/cpOnlineStat'

export default {
  name: "ElectricEnergyReading",
  data() {
    return {
      cjPoint: "",
      dataDate: "",
      curveValue: 1, // 曲线
      curveList,
      oneToTwo: 1,
      oneList,
      currentShow: true, // 表格
      loading: false,
      optionsData:[],
      tableData: [],
      ids: [],
      total: 0, //总条数
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
      },
      myCharts : [
        {
          name: "chartP",
          echartDom: null,
          title: '瞬时数据P',
          legendData: ["pz", "pa", "pb", "pc",],
          option: JSON.parse(JSON.stringify(chartOption)),
        }, {
          name: "chartQ",
          echartDom: null,
          title: '瞬时数据Q',
          legendData: ["qz", "qa", "qb", "qc",],
          option: JSON.parse(JSON.stringify(chartOption)),
        }, {
          name: "chartU",
          echartDom: null,
          title: '瞬时数据U',
          legendData: ["ua", "ub", "uc",],
          option: JSON.parse(JSON.stringify(chartOption)),
        }, {
          name: "chartI",
          echartDom: null,
          title: '瞬时数据I',
          legendData: ["ia", "ib", "ic",],
          option: JSON.parse(JSON.stringify(chartOption)),
        }, {
          name: "chartCos",
          echartDom: null,
          title: '瞬时数据Cos',
          legendData: ["cos", "cosa", "cosb", "cosc",],
          option: JSON.parse(JSON.stringify(chartOption)),
        },
      ]
    };
  },
  props: {
    currentData: {
      type: Object,
      default: {}
    }
  },
  mounted() {
    this.getOptionList(this.currentData.id);
  },
  methods: {
    getOptionList(id){
      getOptionList(id).then(response => {
        if (response.code === 200) {
          this.optionsData = response.data;
        }
      });
    },
    getParams(type=0){
      const formData = new FormData();
      formData.append('cjMpId', this.cjPoint);
      formData.append('dataDate',  this.queryParams.dataDate);
      formData.append('oneTwo', this.oneToTwo);
      formData.append('type', this.curveValue);
      if (type) {
        formData.append('pageNum', this.queryParams.pageNum);
        formData.append('pageSize', this.queryParams.pageSize);
      }
      return formData;
    },
    handleQuery() {
      if (!this.cjPoint || !this.dataDate) {
        this.$message({
          showClose: true,
          type: 'error',
          message: '请选择搜索项'
        });
        return;
      }
      this.getList();
    },
    resetQuery() {
      this.cjPoint = "";
      this.oneToTwo=1;
      this.dataDate = "";
      this.curveValue = 1;
    },
    getDataList(){
      const params = this.getParams(0);
      getQxChartData(params).then(response => {
        const data = response.data;
        const xData = data.map(dataItem=>{
          return dataItem.dataDate.split(' ')[1].substring(0, 5)
        });
        this.myCharts.map(myChart=>{
          myChart.option.legend.data = myChart.legendData;
          myChart.option.xAxis.data = xData;
          myChart.legendData.map((legendItem)=>{
            const seriesData = {
              type: "line",
              name: legendItem,
              data: []
            };
            data.map(dataItem=>{
              seriesData.data.push(Number(dataItem['data'][legendItem] || 0));
            });
            myChart.option.series.push(seriesData);
          })
          myChart.echartDom.setOption(myChart.option);
        })
      })

    },
    initEchart(){
      this.myCharts[0].echartDom = echarts.init(document.getElementById("echarts-line-chart-1"));
      this.myCharts[1].echartDom = echarts.init(document.getElementById("echarts-line-chart-2"));
      this.myCharts[2].echartDom = echarts.init(document.getElementById("echarts-line-chart-3"));
      this.myCharts[3].echartDom = echarts.init(document.getElementById("echarts-line-chart-4"));
      this.myCharts[4].echartDom = echarts.init(document.getElementById("echarts-line-chart-5"));
      this.getDataList();
    },
    handleDateChange(value){
      const date = new Date(value);
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      const formattedDateNative = `${year}-${month}-${day}`;
      this.queryParams.dataDate = formattedDateNative;
    },
    changeShow(){
      if (!this.cjPoint || !this.dataDate) {
        this.$message({
          showClose: true,
          type: 'error',
          message: '请选择搜索项后切换'
        });
        return;
      }
      this.currentShow = !this.currentShow;
      if (!this.currentShow && !this.myChart) {
        this.$nextTick(()=>{
          this.myCharts.map((myChart)=>{
            if (myChart.echartDom) {
              myChart.echartDom.dispose();
              myChart.echartDom = null;
            }
          })
          this.initEchart();
        })
      }
    },
    getList() {
      this.loading = true;
      const params = this.getParams(1);
      getQxList(params).then(response => {
        this.tableData = response.rows;
        this.total = response.total;
        this.loading = false;
      });
    },
  },
};
</script>

<template>
  <div class="instantaneous-data-container">
    <div class="header">
      <el-row :gutter="24">
        <el-col :span="18" class="header-left">
          <div class="item-common">
            <label>采集点:</label>
            <el-select v-model="cjPoint">
              <el-option v-for="option in optionsData"
                         :key="option.value"
                         :label="option.label"
                         :value="option.value"
              ></el-option>
            </el-select>
          </div>
          <div class="item-common">
            <label>时间:</label>
            <el-date-picker v-model="dataDate" type="date" @change="handleDateChange" placeholder="选择日期"> </el-date-picker>
            <el-select v-model="curveValue" placeholder="请选择">
              <el-option
                v-for="item in curveList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
            <el-select v-model="oneToTwo" placeholder="请选择">
              <el-option
                v-for="item in oneList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </div>
        </el-col>
        <el-col :span="6">
          <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery"
            >搜索</el-button
          >
          <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
          <el-button icon="el-icon-sort" size="mini" @click="changeShow">{{
            currentShow ? "切换图像" : "切换表格"
          }}</el-button>
        </el-col>
      </el-row>
    </div>
    <div class="content">
      <template v-if="currentShow">
        <el-table v-loading="loading" :data="tableData">
          <!--          <el-table-column type="selection" width="55" align="center" />-->
          <el-table-column label="ID" align="center" prop="id" />
          <el-table-column label="测量点标识" align="center" prop="cjMpId" />
          <el-table-column label="数据时标" align="center" prop="dataDate" width="180">
            <template slot-scope="scope">
              <span>{{ parseTime(scope.row.dataDate, "{y}-{m}-{d}") }}</span>
            </template>
          </el-table-column>
          <el-table-column label="数据来源" align="center" prop="dataSource" />
          <el-table-column label="写入日期" align="center" prop="writeDate" width="180">
            <template slot-scope="scope">
              <span>{{ parseTime(scope.row.writeDate, "{y}-{m}-{d}") }}</span>
            </template>
          </el-table-column>
          <el-table-column label="总有功功率" align="center" prop="pz" />
          <el-table-column label="A相有功功率" align="center" prop="pa" />
          <el-table-column label="B相有功功率" align="center" prop="pb" />
          <el-table-column label="C相有功功率" align="center" prop="pc" />
          <el-table-column label="总无功功率" align="center" prop="qz" />
          <el-table-column label="A相无功功率" align="center" prop="qa" />
          <el-table-column label="B相无功功率" align="center" prop="qb" />
          <el-table-column label="C相无功功率" align="center" prop="qc" />
          <el-table-column label="A相电压" align="center" prop="ua" />
          <el-table-column label="B相电压" align="center" prop="ub" />
          <el-table-column label="C相电压" align="center" prop="uc" />
          <el-table-column label="A相电流" align="center" prop="ia" />
          <el-table-column label="B相电流" align="center" prop="ib" />
          <el-table-column label="C相电流" align="center" prop="ic" />
          <el-table-column label="总功率因数" align="center" prop="cos" />
          <el-table-column label="A相功率因数" align="center" prop="cosa" />
          <el-table-column label="B相功率因数" align="center" prop="cosb" />
          <el-table-column label="C相功率因数" align="center" prop="cosc" />
          <el-table-column label="零序电流" align="center" prop="midI" />
          <el-table-column label="PT变比值" align="center" prop="ptRatio" />
          <el-table-column label="CT 变比值" align="center" prop="ctRatio" />
          <el-table-column label="综合倍率" align="center" prop="tFactor" />
          <!--          <el-table-column label="操作" align="center" class-name="small-padding fixed-width">-->
          <!--            <template slot-scope="scope">-->
          <!--              <el-button-->
          <!--                size="mini"-->
          <!--                type="text"-->
          <!--                icon="el-icon-edit"-->
          <!--                @click="handleUpdate(scope.row)"-->
          <!--                v-hasPermi="['sc:mpYcRead:edit']"-->
          <!--              >修改</el-button>-->
          <!--              <el-button-->
          <!--                size="mini"-->
          <!--                type="text"-->
          <!--                icon="el-icon-delete"-->
          <!--                @click="handleDelete(scope.row)"-->
          <!--                v-hasPermi="['sc:mpYcRead:remove']"-->
          <!--              >删除</el-button>-->
          <!--            </template>-->
          <!--          </el-table-column>-->
        </el-table>

        <pagination
          v-show="total > 0"
          :total="total"
          :page.sync="queryParams.pageNum"
          :limit.sync="queryParams.pageSize"
          @pagination="getList"
        />
      </template>
      <template v-else>
        <div id="echarts-line-chart-1" class="chartContainer"></div>
        <div id="echarts-line-chart-2" class="chartContainer"></div>
        <div id="echarts-line-chart-3" class="chartContainer"></div>
        <div id="echarts-line-chart-4" class="chartContainer"></div>
        <div id="echarts-line-chart-5" class="chartContainer"></div>
      </template>
    </div>
  </div>
</template>

<style lang="scss">
.instantaneous-data-container {
  .header {
    .header-left {
      display: flex;
      align-items: center;
      .item-common {
        display: flex;
        align-items: center;
        &:nth-child(2) {
          margin-left: 16px;
        }
        label {
          display: inline-block;
          width: 60px;
          text-align: right;
          margin-right: 8px;
        }
        .el-select {
          margin-left: 8px;
        }
      }
    }
  }
  .content {
    margin-top: 16px;
    .chartContainer {
      width: 100%;
      height: 300px;
    }
  }
}
</style>
