<script>
import DataEmpty from "@/views/sc/dashboard/components/Empty.vue";
import * as echarts from "echarts";
import { getHistoryMonitorData } from '@/api/index.js'
export default {
  name: "HistoryData",
  components: { DataEmpty },
  props: {
    // chartData: {
    //   type: Object,
    //   default: () => ({
    //     xData: [
    //       "00:00",
    //       "00:30",
    //       "01:00",
    //       "01:30",
    //       "02:00",
    //       "02:30",
    //       "03:00",
    //       "03:30",
    //       "04:00",
    //       "04:30",
    //       "05:00",
    //       "05:30",
    //       "06:00",
    //       "06:30",
    //       "07:00",
    //       "07:30",
    //       "08:00",
    //       "08:30",
    //       "09:00",
    //       "09:30",
    //       "10:00",
    //       "10:30",
    //       "11:00",
    //       "11:30",
    //       "12:00",
    //       "12:30",
    //       "13:00",
    //       "13:30",
    //       "14:00",
    //       "14:30",
    //       "15:00",
    //       "15:30",
    //       "16:00",
    //       "16:30",
    //       "17:00",
    //       "17:30",
    //       "18:00",
    //       "18:30",
    //       "19:00",
    //       "19:30",
    //       "20:00",
    //       "20:30",
    //       "21:00",
    //       "21:30",
    //       "22:00",
    //       "22:30",
    //       "23:00",
    //       "23:30"
    //     ],
    //     yData: [45, 38, 40, 55, 15, 10, 185, 160, 70, 45, 38, 30, 85, 125, 110, 185, 160, 70, 45, 38, 30, 85, 125, 110, 185, 160, 70, 45, 38, 30, 85, 125, 110, 185, 160, 70, 45, 38, 30, 85, 125, 110, 185, 160, 70, 85, 125, 110,],
    //     yData1: [60, 58, 62, 78, 95, 100, 115, 105, 75, 60, 58, 62, 78, 95, 100, 115, 105, 60, 58, 62, 78, 95, 100, 115, 105, 60, 58, 62, 78, 95, 100, 115, 105, 60, 58, 62, 78, 95, 100, 115, 105, 60, 58, 62, 78, 95, 100, 115,],
    //     legendData: [],
    //     title: "",
    //   }),
    // },
  },
  data() {
    return {
      myChart: null,
      chartData: {
        xData: [
          "00:00",
          "00:30",
          "01:00",
          "01:30",
          "02:00",
          "02:30",
          "03:00",
          "03:30",
          "04:00",
          "04:30",
          "05:00",
          "05:30",
          "06:00",
          "06:30",
          "07:00",
          "07:30",
          "08:00",
          "08:30",
          "09:00",
          "09:30",
          "10:00",
          "10:30",
          "11:00",
          "11:30",
          "12:00",
          "12:30",
          "13:00",
          "13:30",
          "14:00",
          "14:30",
          "15:00",
          "15:30",
          "16:00",
          "16:30",
          "17:00",
          "17:30",
          "18:00",
          "18:30",
          "19:00",
          "19:30",
          "20:00",
          "20:30",
          "21:00",
          "21:30",
          "22:00",
          "22:30",
          "23:00",
          "23:30"
        ],
        yData: [45, 38, 30, 85, 125, 110, 185, 160, 70, 45, 38, 30, 85, 125, 110, 185, 160, 70, 45, 38, 30, 85, 125, 110, 185, 160, 70, 45, 38, 30, 85, 125, 110, 185, 160, 70, 45, 38, 30, 85, 125, 110, 185, 160, 70, 85, 125, 110,],
        yData1: [60, 58, 62, 78, 95, 100, 115, 105, 75, 60, 58, 62, 78, 95, 100, 115, 105, 60, 58, 62, 78, 95, 100, 115, 105, 60, 58, 62, 78, 95, 100, 115, 105, 60, 58, 62, 78, 95, 100, 115, 105, 60, 58, 62, 78, 95, 100, 115,],
        // xData: [],
        // yData: [],
        // yData1: [],
        legendData: [],
        title: "",
      },
    };
  },
  mounted() {
    this.getHistoryMonitorData();
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.handleResize);
    this.myChart.dispose();
    this.myChart = null;
  },
  methods: {
    // 获取历史监测数据
    getHistoryMonitorData() {
      getHistoryMonitorData().then((res) => {
        const { code, data } = res;
        if (code === 200) {
          this.chartData.xData = data.timePoints;
          this.chartData.yData = data.realTimeLoad;
          this.chartData.yData1 = data.baselineLoad;
          this.chartData.xData.length && this.drawChart(this.chartData.xData);
        }
      })
    },
    // 监听窗口变化
    handleResize() {
      this.myChart.resize();
    },
    // 绘制图表
    drawChart() {
      this.myChart = echarts.init(document.getElementById("loadMonitoring"));
      const option = {
        backgroundColor: "transparent",
        tooltip: {
          trigger: "axis",
          backgroundColor: "rgba(10, 20, 40, 0.9)",
          borderColor: "#2962FF",
          borderWidth: 1,
          textStyle: {
            color: "#e0f7fa",
            fontSize: 14,
          },
          axisPointer: {
            type: "line",
            lineStyle: {
              color: "#4fc3f7",
              width: 1,
              type: "dashed",
            },
          },
        },
        legend: {
          right: 'center',
          top: 10,
          textStyle: {
            fontSize: 14,
          },
          icon: "rect",
          itemWidth: 20,
          itemHeight: 4,
          data: this.chartData.legendData.length
            ? this.chartData.legendData
            : ["实时负荷", "基线负荷"],
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "0%",
          top: "25%",
          containLabel: true,
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: this.chartData.xData,
          axisLine: {
            show: false,

            lineStyle: {
              color: "#64b5f6",
            },
          },
          axisLabel: {
            interval: 1,
            rotate: 45,  // 旋转角度
            color: "#000000",
            fontSize: 12,
          },
          axisTick: {
            show: false,
          },
          splitLine: {
            show: false,
            lineStyle: {
              color: "rgba(100, 181, 246, 0.2)",
              type: "dashed",
            },
          },
        },
        yAxis: {
          type: "value",
          // name: "单位：MW",
          nameTextStyle: {
            color: "#000000",
            fontSize: 12,
            padding: [0, 0, 0, 10],
          },
          min: 0,
          // max: 200,
          // interval: 20,
          axisLine: {
            show: false,
            lineStyle: {
              color: "#37b2f5",
            },
          },
          axisLabel: {
            color: "#000000",
            fontSize: 12,
            formatter: "{value}",
          },
          splitLine: {
            lineStyle: {
              color: "rgba(100, 181, 246, 0.15)",
              type: "dashed",
            },
          },
        },
        series: [
          {
            name: "实时负荷",
            type: "line",
            symbol: "none",
            smooth: true,
            itemStyle: {
              color: "#37b2f5",
              borderColor: "#01579b",
            },
            emphasis: {
              itemStyle: {
                color: "#000000",
                borderColor: "#37b2f5",
              },
            },
            areaStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: "rgba(84, 180, 228, 0.4)" },
                { offset: 1, color: "rgba(84, 180, 228, 0.05)" },
              ]),
            },
            data: this.chartData.yData,
          },
          {
            name: "基线负荷",
            type: "line",
            symbol: "none",
            smooth: true,
            itemStyle: {
              color: "#ffee1b",
              borderColor: "#ffee1b",
            },
            emphasis: {
              itemStyle: {
                color: "#000000",
                borderColor: "#ffee1b",
              },
            },
            data: this.chartData.yData1,
          },
        ],
        dataZoom: [
          {
            type: "inside",
            start: 0,
            end: 100,
          },
        ],
      };
      this.myChart.setOption(option);
      window.addEventListener("resize", this.handleResize);
    },
  },
};
</script>

<template>
  <div class="loadMonitoring-container">
    <!-- <div class="title">
      <span>实时负荷监测</span>
    </div> -->
    <div id="loadMonitoring" v-if="chartData.xData.length"></div>
    <DataEmpty v-else></DataEmpty>
  </div>

</template>

<style scoped lang="scss">
.loadMonitoring-container {
  width: 100%;
  height: 100%;

  .title {
    width: 100%;
    height: 15%;
    // background-image: url("../../../../assets/images/header-bg.png");
    background-repeat: no-repeat;
    background-size: contain;
    background-position: center center;
    position: relative;

    span {
      position: absolute;
      top: 50%;
      left: 8%;
      transform: translateY(-60%);
      background-image: -webkit-linear-gradient(top, #000000, #597ba1);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
  }
}

#loadMonitoring {
  height: 90%;
  width: 100%;
  //background: #fff;
}
</style>
