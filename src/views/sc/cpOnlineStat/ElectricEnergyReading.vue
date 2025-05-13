<script>
import { curveList, echartData } from '@/views/sc/cpOnlineStat/const'
import { listMpReadCurve } from "@/api/sc/mpReadCurve";
import * as echarts from "echarts";

export default {
  name: "ElectricEnergyReading",
  data() {
    return {
      cjPoint: "中央空调计量点",
      dataDate: "",
      curveValue: 1, // 曲线
      curveList,
      currentShow: true, // 表格
      loading: false,
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
      myChart: null,
      legendMap: [
        {
          name: '正向有功总示度(kWh)',
          key: 'zxygz',
        },
        {
          name: '反向有功总示度(kWh)',
          key: 'fxygz',
        },
        {
          name: '正向无功总示度(kWh)',
          key: 'zxwgz',
        },
        {
          name: '反向无功总示度(kWh)',
          key: 'fxwgz',
        }
      ]
    };
  },
  methods: {
    handleQuery() {
      this.getList();
    },
    resetQuery() {
      this.dataDate = "";
      this.curveValue = 1;
    },
    getDataList(){
      const data = echartData;
      const legendData = this.legendMap.map(legend=>legend.name);
      const xData = data.map(dataItem=>{
         return dataItem.dataDate.split(' ')[1].substring(0, 5)
      });
      const yData = this.legendMap.map(legend=> {
        const obj = {
          name: legend.name,
          type: 'line',
          data: [],
        }
        data.map((dataItem)=>{
          const value = dataItem.data[legend.key] || 0;
          obj.data.push(value);
        });
        return obj;
      });
      this.drawEchart(legendData, xData, yData);
    },
    drawEchart(legendData, xData, yData){
      const option = {
        title: {
          text: "电能示值"
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow"
          }
        },
        toolbox: {
          show: true,
          feature: {
            dataZoom: {
              show: true,
              title: {
                zoom: "区域缩放",
                back: "区域缩放还原"
              },
              yAxisIndex: "none"
            },
            dataView: {
              show: true,
              readOnly: false,
              title: "数据视图"
            },
            magicType: {
              show: true,
              title: {
                line: "切换为折线图",
                bar: "切换为柱状图",
                stack: "切换为堆叠",
                tiled: "切换为平铺"
              },
              type: [
                "line",
                "bar",
                "stack",
                "tiled"
              ]
            },
            "restore": {
              "show": true,
              "title": "还原"
            },
            "saveAsImage": {
              "show": true,
              "title": "保存图片"
            }
          }
        },
        legend: {
          left: 80,
          data: legendData,
          textStyle: {
            fontSize: 6.5
          }
        },

        xAxis: {
          type: "category",
          data: xData,
          axisTick: {
            alignWithLabel: true
          },
          axisLabel: {
            rotate: 45,
            fontSize: 10
          }
        },
        yAxis: {
          type: 'value'
        },
        series: yData,
      };
      this.myChart && this.myChart.setOption(option)
    },
    initEchart(){
      const chartDom = document.getElementById("chartContainer")
      this.myChart = echarts.init(chartDom);
      this.getDataList();
    },
    changeShow(){
      this.currentShow = !this.currentShow;
      if (!this.currentShow) {
        this.$nextTick(()=>{
          if (this.myChart) {
            this.myChart.dispose();
            this.myChart = null;
          }
          this.initEchart();
        })
      }
    },
    getList() {
      this.loading = true;
      listMpReadCurve(this.queryParams).then((response) => {
        this.tableData = response.rows;
        this.total = response.total;
        this.loading = false;
      });
    },
  },
};
</script>

<template>
  <div class="ElectricEnergyReading-container">
    <div class="header">
      <el-row :gutter="24">
        <el-col :span="18" class="header-left">
          <div class="item-common">
            <label>采集点:</label>
            <el-input v-model="cjPoint" disabled />
          </div>
          <div class="item-common">
            <label>时间:</label>
            <el-date-picker v-model="dataDate" type="date" placeholder="选择日期"> </el-date-picker>
            <el-select v-model="curveValue" placeholder="请选择">
              <el-option
                v-for="item in curveList"
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
          <el-button icon="el-icon-sort" size="mini" @click="changeShow">{{currentShow?"切换图像":"切换表格"}}</el-button>
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
          <el-table-column label="正向有功总示度" align="center" prop="zxygz" />
          <el-table-column label="反向有功总示度" align="center" prop="fxygz" />
          <el-table-column label="正向无功总示度" align="center" prop="zxwgz" />
          <el-table-column label="反向无功总示度" align="center" prop="fxwgz" />
          <!--          <el-table-column label="操作" align="center" class-name="small-padding fixed-width">-->
          <!--            <template slot-scope="scope">-->
          <!--              <el-button-->
          <!--                size="mini"-->
          <!--                type="text"-->
          <!--                icon="el-icon-edit"-->
          <!--                @click="handleUpdate(scope.row)"-->
          <!--                v-hasPermi="['sc:mpReadCurve:edit']"-->
          <!--              >修改</el-button>-->
          <!--              <el-button-->
          <!--                size="mini"-->
          <!--                type="text"-->
          <!--                icon="el-icon-delete"-->
          <!--                @click="handleDelete(scope.row)"-->
          <!--                v-hasPermi="['sc:mpReadCurve:remove']"-->
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
        <div id="chartContainer"></div>
      </template>
    </div>
  </div>
</template>

<style lang="scss">
.ElectricEnergyReading-container {
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
    #chartContainer {
      width: 100%;
      height: 300px;
    }
  }
}
</style>
