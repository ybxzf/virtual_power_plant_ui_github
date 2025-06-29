<script>
import * as echarts from "echarts";
export default {
  name: "AdjustableType",
  components: {},
  props: {
    chartData: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      myChart: null,
    };
  },
  mounted() {
    this.myChart = echarts.init(this.$refs['pieChart']);
    this.$nextTick(() => {
      this.drawChart();
    })
  },
  methods: {
    drawChart() {

      const option = {
        tooltip: {
          trigger: 'item'
        },
        series: [
          {
            // name: '内环',
            type: 'pie',
            radius: ['35%', '40%'],
            avoidLabelOverlap: false,
            label: {
              show: false,
              position: 'center'
            },
            data: [
              { value: 5.4, name: '邀约型用户', itemStyle: { color: '#FAF662' } },
              { value: 12.4, name: '聚合型用户', itemStyle: { color: '#FF786E' } }
            ]
          },
          {
            // name: '外环',
            type: 'pie',
            radius: ['50%', '55%'],
            avoidLabelOverlap: false,
            label: {
              show: false,
              position: 'center'
            },
            data: [
              { value: 15.4, name: '可调节', itemStyle: { color: '#0078FF' } },
              { value: 10.4, name: '可中断', itemStyle: { color: '#33FFF2' } }
            ]
          }
        ]
      };
      this.myChart && this.myChart.setOption(option);
      window.addEventListener("resize", this.handleResize);
    },
    handleResize() {
      this.myChart && this.myChart.resize();
    },
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.handleResize);
    this.myChart && this.myChart.dispose();
    this.myChart = null;
  },
};
</script>

<template>
  <div class="loadMonitoring-container">
    <div class="title">
      <span>可调节类型</span>
    </div>
    <div style="height: 80%;margin-top: 5%; display: flex; justify-content: center; align-items: center">
      <div style="width: 90%; height: 0; padding-bottom: 51.2%; position: relative; ">
        <el-image src="/img/bigScreen/adjustable_type_bg.png"></el-image>
        <div class="item-row1">
          <div>直控型</div>
          <div>非直控型</div>
        </div>
        <div class="item-row2">
          <div
            style="display: flex;flex-direction: column;justify-content: space-between;align-items: center;width: 33%">
            <div class="label">邀约型用户</div>
            <div style="display: flex;height: 25px;width: 100%;align-items: center;justify-content: center;">
              <div class='value'>5.4MW</div>
              <div class="rect" style="background: #FAF662;margin-left: 10px"></div>
            </div>
          </div>
          <div
            style="display: flex;flex-direction: column;justify-content: space-between;align-items: center;width: 33%">
            <div class="label">聚合型用户</div>
            <div style="display: flex;height: 25px;width: 100%;align-items: center;justify-content: center;">
              <div class="rect" style="background: #FF786E;margin-right: 10px"> </div>
              <div class='value'>12.4MW</div>
            </div>
          </div>
        </div>
        <div class="item-row3">
          <div
            style="display: flex;flex-direction: column;justify-content: space-between;align-items: center;width: 33%">
            <div style="display: flex;height: 25px;width: 100%;align-items: center;justify-content: center;">
              <div class='value'>15.4MW</div>
              <div class="rect" style="background: #0078FF;margin-left: 10px"></div>
            </div>
            <div class="label">可调节</div>
          </div>
          <div
            style="display: flex;flex-direction: column;justify-content: space-between;align-items: center;width: 33%">
            <div style="display: flex;height: 25px;width: 100%;align-items: center;justify-content: center;">
              <div class="rect" style="background: #33FFF2;margin-right: 10px"> </div>
              <div class='value'>10.4MW</div>
            </div>
            <div class="label">可中断</div>
          </div>
        </div>
        <div id="pieOut" ref="pieChart" class="pieChart"></div>
      </div>
    </div>
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

.pieChart {
  position: absolute;
  width: 100%;
  height: 100%;
  // padding-bottom: 51.2%;
  // background: rgba(255, 255, 255, 0.2);
}

.el-image {
  width: 100%;
  position: absolute;
  left: 50.35%;
  top: 47.35%;
  transform: translate(-50%, -50%);
}

.item-row1 {
  width: 100%;
  // height: 12%;
  // position: relative;
  // z-index: 2;
  // background: rgba(255, 255, 255, 0.2);
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  padding: 0px 10%;
  position: absolute;
  top: 5%;
  transform: translateY(-50%);
}

.item-row2 {
  width: 100%;
  // height: 50px;
  // height: 32%;
  // position: relative;
  // z-index: 2;
  // background: rgba(255, 255, 255, 0.3);
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  // padding: 0px 10%;
  position: absolute;
  top: 30%;
  transform: translateY(-50%);
}

.item-row3 {
  width: 100%;
  // height: 50px;
  // height: 32%;
  // position: relative;
  // z-index: 2;
  // background: rgba(255, 255, 255, 0.3);
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  // padding: 0px 10%;
  position: absolute;
  top: 75%;
  transform: translateY(-50%);
}

.label {
  display: flex;
  height: 25px;
  width: 100%;
  align-items: center;
  justify-content: center;
  font-family: AlibabaPuHuiTi_3_65_Medium;
  font-size: 16px;
  color: #D7F5FE;
  line-height: 463px;
  text-align: left;
  font-style: normal;
  text-transform: none;
}

.value {
  font-family: PangMenZhengDao, PangMenZhengDao;
  font-weight: normal;
  font-size: 18px;
  color: #FFFFFF;
  line-height: 463px;
  text-align: left;
  font-style: normal;
  text-transform: none;
  font-weight: 600;
  text-shadow: rgb(185 255 249 / 80%) 0px 0px 10px;
}

.rect {
  width: 12px;
  height: 12px;
  border-radius: 2px;
  box-shadow: 0 0 10px 5px rgba(255, 255, 255, 0.5);
}
</style>
