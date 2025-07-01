<script>
import DataEmpty from "@/views/sc/dashboard/components/Empty.vue";
import * as echarts from "echarts";
export default {
  name: "RealTimeLoadMonitoring",
  components: { DataEmpty },
  props: {
    chartData: {
      type: Object,
      default: () => ({
        xData: ["00:15", "03:00", "06:00", "09:00", "12:00", "15:00", "18:00", "21:00", "24:00"],
        yData: [0.45, 0.38, 0.30, 0.85, 0.125, 0.110, 0.185, 0.160, 0.70],
        yData1: [0.60, 0.58, 0.62, 0.78, 0.95, 0.100, 0.115, 0.105, 0.75],
        legendData: [],
        title: "",
      }),
    },
  },
  data() {
    return {
      myChart: null,
    };
  },
  mounted() {
    this.chartData.xData.length && this.drawChart(this.chartData.xData);
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.handleResize);
    this.myChart.destroy();
    this.myChart = null;
  },
  methods: {
    handleResize() {
      this.myChart.resize();
    },
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
          right: 30,
          top: 10,
          textStyle: {
            color: "#bbdefb",
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
          bottom: "3%",
          top: "15%",
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
            color: "#fff",
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
          name: "单位：MW",
          nameTextStyle: {
            color: "#fff",
            fontSize: 12,
            padding: [0, 0, 0, 10],
          },
          // min: 0,
          // max: 200,
          interval: 20,
          axisLine: {
            show: false,
            lineStyle: {
              color: "#37b2f5",
            },
          },
          axisLabel: {
            color: "#fff",
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
                color: "#ffffff",
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
                color: "#ffffff",
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
    <div class="title">
      <span>实时负荷监测</span>
    </div>
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
    background-image: url("../../../../assets/images/header-bg.png");
    background-repeat: no-repeat;
    background-size: contain;
    background-position: center center;
    position: relative;

    span {
      position: absolute;
      top: 50%;
      left: 8%;
      transform: translateY(-60%);
      background-image:-webkit-linear-gradient(top, #ffffff,#597ba1);
      -webkit-background-clip:text;
      -webkit-text-fill-color:transparent;
    }
  }
}
#loadMonitoring {
  height: 85%;
  width: 100%;
  //background: #fff;
}
</style>
