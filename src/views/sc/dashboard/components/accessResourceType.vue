<script>
import DataEmpty from "@/views/sc/dashboard/components/Empty.vue";
import * as echarts from "echarts";
export default {
  name: "AccessResourceType",
  components: { DataEmpty },
  props: {
    chartData: {
      type: Object,
      default: () => ({
        xData: ["00:15", "03:00", "06:00", "09:00", "12:00", "15:00", "18:00", "21:00", "24:00"],
        yData: [45, 38, 30, 85, 125, 110, 185, 160, 70],
        yData1: [60, 58, 62, 78, 95, 100, 115, 105, 75],
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
    // this.chartData.xData.length && this.drawChart(this.chartData.xData);
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
      this.myChart.setOption(option);
      window.addEventListener("resize", this.handleResize);
    },
  },
};
</script>

<template>
  <div class="loadMonitoring-container">
    <div class="title">
      <span>接入资源类型</span>
    </div>
    <div
      style="height: 85%; display: flex; justify-content: center; align-items: center"
      v-if="chartData.xData.length"
    >
      <div
        style="
          width: 100%;
          height: 70%;
          background: url(/img/bigScreen/access_resources_bg.png) no-repeat;
          background-size: 100% 100%;
          position: relative;
          font-weight: 600;
        "
      >
        <div
          style="
            justify-content: space-between;
            align-items: end;
            display: flex;
            width: 100%;
            height: 14%;
          "
        >
          <div style="padding-left: 15%; width: 33.33%">储能</div>
          <div style="padding-left: 15%; width: 33.33%">光伏</div>
          <div style="padding-left: 15%; width: 33.33%">空调</div>
        </div>
        <div
          style="
            justify-content: space-between;
            align-items: end;
            display: flex;
            width: 100%;
            height: 18%;
          "
        >
          <div style="padding-left: 15%; width: 33.33%">10MW</div>
          <div style="padding-left: 15%; width: 33.33%">10MW</div>
          <div style="padding-left: 15%; width: 33.33%">10MW</div>
        </div>
        <div
          style="
            justify-content: space-between;
            align-items: end;
            display: flex;
            width: 100%;
            height: 40%;
          "
        >
          <div style="padding-left: 15%; width: 33.33%">充电桩</div>
          <div style="padding-left: 15%; width: 33.33%">5G基站</div>
          <div style="padding-left: 15%; width: 33.33%">其他</div>
        </div>
        <div
          style="
            justify-content: space-between;
            align-items: end;
            display: flex;
            width: 100%;
            height: 19%;
          "
        >
          <div style="padding-left: 15%; width: 33.33%">10MW</div>
          <div style="padding-left: 15%; width: 33.33%">10MW</div>
          <div style="padding-left: 15%; width: 33.33%">10MW</div>
        </div>
      </div>
    </div>
    <!-- <DataEmpty v-else></DataEmpty> -->
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
      background-image: -webkit-linear-gradient(top, #ffffff, #597ba1);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
  }
}
#loadMonitoring {
  height: 85%;
  width: 100%;
  //background: #fff;
}
</style>
