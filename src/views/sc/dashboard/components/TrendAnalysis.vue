<script>
import DataEmpty from "@/views/sc/dashboard/components/Empty.vue";
import * as echarts from "echarts";
export default {
  name: "TrendAnalysis",
  components: { DataEmpty },
  props: {
    chartData: {
      type: Object,
      default: () => ({
        xData: Array.from({ length: 24 }, (_, i) => (i < 9 ? `0${i + 1}` : `${i + 1}`)),
        accessLoad: [
          42, 38, 35, 32, 36, 45, 68, 92, 120, 145, 162, 178, 186, 176, 168, 154, 142, 128, 112, 98,
          85, 72, 58, 46,
        ],
        predictAccess: [
          45, 40, 36, 34, 40, 52, 74, 96, 125, 152, 168, 180, 190, 182, 170, 160, 148, 135, 120,
          105, 90, 78, 65, 50,
        ],
        adjustableLoad: [
          28, 26, 24, 22, 25, 30, 42, 55, 68, 82, 95, 105, 112, 108, 102, 98, 92, 85, 78, 72, 65,
          58, 50, 40,
        ],
        predictAdjustable: [
          30, 28, 25, 23, 28, 35, 45, 58, 72, 85, 98, 108, 115, 112, 105, 100, 95, 88, 80, 75, 68,
          60, 52, 42,
        ],
        legendData: [],
        title: "",
      }),
    },
  },
  data() {
    return {
      myChart: null,
      seriesData: [
        {
          color: "#00f9f9",
          name: "接入负荷",
          visible: true,
          key: "accessLoad",
        },
        {
          color: "#00f9f9",
          name: "预测接入负荷",
          icon: "dashed",
          visible: true,
          key: "predictAccess",
        },
        {
          color: "#1ba6fb",
          name: "可调负荷",
          visible: true,
          key: "adjustableLoad",
        },
        {
          color: "#1ba6fb",
          name: "预测可调负荷",
          icon: "dashed",
          visible: true,
          key: "predictAdjustable",
        },
      ],
    };
  },
  mounted() {
    this.chartData.xData.length && this.initChart();
  },
  beforeDestroy() {
    this.myChart.destroy();
    window.removeEventListener("resize", this.handleResize);
  },
  methods: {
    toggleSeries(index) {
      this.seriesData[index].visible = !this.seriesData[index].visible;
      this.myChart &&
        this.myChart.dispatchAction({
          type: "legendToggleSelect",
          name: this.seriesData[index].name,
        });
      this.drawChart();
    },
    getLegendStyle(item) {
      const style = {
        backgroundColor: item.color,
        height: "4px",
      };
      if (item.icon === "dashed") {
        style.background = `repeating-linear-gradient(
            to right,
            ${item.visible ? item.color : "#959aa7"},
            ${item.visible ? item.color : "#959aa7"} 4px,
            transparent 4px,
            transparent 8px
        )`;
      }

      return style;
    },
    handleResize() {
      this.myChart.resize();
    },
    initChart() {
      this.myChart = echarts.init(document.getElementById("TrendAnalysis"));
      this.drawChart();
    },
    drawChart() {
      const option = {
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
          formatter: function (params) {
            let result = `<div style="font-weight:bold;margin-bottom:5px;">${params[0].name}:00</div>`;
            params.forEach((item) => {
              const marker = `<span style="display:inline-block;width:15px;height:4px;background:${item.color};margin-right:5px;vertical-align:middle;"></span>`;
              const markDashed = `<span style="display:inline-block;width:15px;height:4px;background: repeating-linear-gradient(
                to right,
                ${item.color},
                ${item.color} 4px,
                transparent 4px,
                transparent 8px
            );margin-right:5px;vertical-align:middle;"></span>`;
              result += `<div>${item.seriesName.includes("预测") ? markDashed : marker} ${
                item.seriesName
              }: <span style="font-weight:bold;">${item.value} MW</span></div>`;
            });
            return result;
          },
        },
        legend: {
          show: false,
        },
        grid: {
          left: "3%",
          right: "3%",
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
          name: "负荷/MW",
          nameTextStyle: {
            color: "#fff",
            fontSize: 12,
            padding: [0, 0, 0, 0],
          },
          min: 0,
          max: 200,
          interval: 40,
          axisLine: {
            show: false,
            lineStyle: {
              color: "#64b5f6",
            },
          },
          axisLabel: {
            color: "#e3f2fd",
            fontSize: 12,
            formatter: "{value}",
          },
          splitLine: {
            show: true,
            lineStyle: {
              color: "rgba(100, 181, 246, 0.15)",
              type: "dashed",
            },
          },
        },
        series: this.seriesData.map((item) => {
          const lineStyle = {
            color: item.color,
            shadowColor: item.color,
            shadowOffsetX: 0,
            shadowOffsetY: 5,
            shadowBlur: 15,
          };
          if (item.icon === "dashed") {
            lineStyle.type = "dashed";
          }
          return {
            name: item.name,
            type: "line",
            symbol: "none",
            smooth: true,
            lineStyle,
            itemStyle: {
              color: item.color,
            },
            data: this.chartData[item.key],
            visible: item.visible,
          };
        }),
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
  <div class="trend-container">
    <div class="title">
      <img src="../../../../assets/images/header-icon.png">
      <span>负荷趋势分析</span>
    </div>
    <div class="echart-container">
      <template v-if="chartData.xData.length">
        <div id="TrendAnalysis"></div>
        <div class="legend-container">
          <div
            v-for="(item, index) in seriesData"
            class="legend-item"
            :class="{ inactive: !item.visible }"
            @click="toggleSeries(index)"
          >
            <!-- 图例线条 -->
            <div class="legend-line" :style="getLegendStyle(item)"></div>
            <!-- 图例文本 -->
            <span class="legend-text">{{ item.name }}</span>
          </div>
        </div>
      </template>
      <DataEmpty v-else></DataEmpty>
    </div>

  </div>
</template>

<style scoped lang="scss">
.trend-container {
  height: 100%;
  width: 100%;
  position: relative;
  .title {
    width: 100%;
    height: 15%;
    position: relative;
    display: flex;
    align-items: center;
    img {
      width: 20px;
      height: 20px;
    }
    span {
      margin-left: 8px;
      background-image:-webkit-linear-gradient(top, #ffffff,#597ba1);
      -webkit-background-clip:text;
      -webkit-text-fill-color:transparent;
    }
  }
  .echart-container {
    height: 85%;
    width: 100%;
  }
  .legend-container {
    display: flex;
    position: absolute;
    right: 0;
    top: 30px;
    .legend-item {
      font-size: 12px;
      margin-left: 8px;
      cursor: pointer;
      display: flex;
      align-items: center;
      &.inactive {
        opacity: 0.4;
      }
      .legend-line {
        width: 15px;
        margin-right: 4px;
      }
    }
  }
}
#TrendAnalysis {
  width: 100%;
  height: 100%;
}
</style>
