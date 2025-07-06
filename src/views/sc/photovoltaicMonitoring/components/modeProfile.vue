<script>
import DataEmpty from "@/views/sc/dashboard/components/Empty.vue";
import * as echarts from "echarts";
import { getLoadMonitorData } from '@/api/index.js'
export default {
  name: "ModeProfile",
  components: { DataEmpty },
  props: {
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
    this.getLoadMonitorData();
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.handleResize);
    this.myChart.dispose();
    this.myChart = null;
  },
  methods: {
    // 获取负荷监测信息
    getLoadMonitorData() {
      getLoadMonitorData().then((res) => {
        const { code, data } = res;
        if (code === 200) {
          this.chartData.xData = data.timePoints;
          this.chartData.yData = data.realTimeLoad;
          this.chartData.yData1 = data.baselineLoad;
          this.chartData.xData.length && this.drawChart(this.chartData.xData);
        }
      })
    },
    // 监听窗口大小变化
    handleResize() {
      this.myChart.resize();
    },
    // 绘制图表
    drawChart() {
      // this.myChart = echarts.init(document.getElementById("modeProfile"));
      this.myChart = echarts.init(this.$refs.chartRef);
      const option = {
        tooltip: {
          trigger: 'item'
        },
        legend: {
          top: '5%',
          left: 'center'
        },
        series: [
          {
            name: '',
            type: 'pie',
            radius: ['50%', '70%'],
            avoidLabelOverlap: false,
            label: {
              show: false,
              position: 'center'
            },
            emphasis: {
              label: {
                show: true,
                fontSize: 20,
                fontWeight: 'bold'
              }
            },
            labelLine: {
              show: false
            },
            data: [
              { value: 30, name: '全部自用' },
              { value: 10, name: '全部上网' },
              { value: 60, name: '发自自用余电上网' },
            ]
          }
        ]
      };
      this.myChart.setOption(option);
      console.log('option', option);
      window.addEventListener("resize", this.handleResize);
    },
  },
};
</script>

<template>
  <div class="modeProfile-container">
    <div id="modeProfile" ref="chartRef" v-if="chartData.xData.length"></div>
    <DataEmpty v-else></DataEmpty>
  </div>

</template>

<style scoped lang="scss">
.modeProfile-container {
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

#modeProfile {
  height: 90%;
  width: 100%;
  //background: #fff;
}
</style>
