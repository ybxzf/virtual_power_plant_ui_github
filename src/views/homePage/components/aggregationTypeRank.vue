<script>
import DataEmpty from "@/views/sc/dashboard/components/Empty.vue";
import * as echarts from "echarts";
import { getTop3Data } from '@/api/index.js'
export default {
  name: "AggregationTypeRank",
  components: { DataEmpty },
  props: {
    // chartData: {
    //   type: Object,
    //   default: () => ({
    //     sData: [
    //       { value: 20, percent: 45, name: '储能', itemStyle: { borderColor: '#1D87FB', color: '#1D87FB' }, },
    //       { value: 10, percent: 22, name: '光伏', itemStyle: { borderColor: '#15D1DF', color: '#15D1DF' }, },
    //       { value: 10, percent: 22, name: '空调', itemStyle: { borderColor: '#62D6FF', color: '#62D6FF' }, },
    //       { value: 5, percent: 10, name: '充电桩', itemStyle: { borderColor: '#A0BFFF', color: '#A0BFFF' }, },
    //       { value: 0, percent: 0, name: '5G基站', itemStyle: { borderColor: '#A5F3BB', color: '#A5F3BB' }, },
    //       { value: 0.4, percent: 1, name: '其他', itemStyle: { borderColor: '#B0A0FF', color: '#B0A0FF' }, }
    //     ],
    //     legendData: [],
    //     title: "",
    //   }),
    // },
  },
  data() {
    return {
      myChart: null,
      chartData: {
        sData: [
          { value: 0, percent: 0, name: '储能', itemStyle: { borderColor: '#1D87FB', color: '#1D87FB' }, },
          { value: 0, percent: 0, name: '光伏', itemStyle: { borderColor: '#15D1DF', color: '#15D1DF' }, },
          { value: 0, percent: 0, name: '空调', itemStyle: { borderColor: '#62D6FF', color: '#62D6FF' }, },
          { value: 0, percent: 0, name: '充电桩', itemStyle: { borderColor: '#A0BFFF', color: '#A0BFFF' }, },
          { value: 0, percent: 0, name: '5G基站', itemStyle: { borderColor: '#A5F3BB', color: '#A5F3BB' }, },
          { value: 0, percent: 0, name: '其它', itemStyle: { borderColor: '#B0A0FF', color: '#B0A0FF' }, }
        ],
        legendData: [],
        title: "",
      },
    };
  },
  mounted() {
    this.getTop3Data();
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.handleResize);
    this.myChart.dispose();
    this.myChart = null;
  },
  methods: {
    // 获取前3数据
    getTop3Data() {
      getTop3Data().then((res) => {
        const { code, data } = res;
        console.log('data', data);

        if (code === 200) {
          const total = Object.values(data).reduce((sum, value) => sum + value, 0) || 0;
          this.chartData.sData.forEach(item => {
            item.value = data[item.name] || 0;
            item.percent = Number(data[item.name] / total * 100).toFixed(2) || 0;
          });;

          this.chartData.sData.length && this.drawChart(this.chartData.sData);
        }
      })
    },
    // 监听窗口变化
    handleResize() {
      this.myChart.resize();
    },
    // 绘制图表
    drawChart() {
      this.myChart = echarts.init(document.getElementById("rank"));
      const option = {
        title: {
          text: '负荷聚合\n   占比',
          left: '13%',
          top: 'center',
          textStyle: {
            fontSize: 18,
            fontWeight: '400'
          },
          subtextStyle: {
            fontSize: 14,
            color: '#767676'
          }
        },
        tooltip: {
          trigger: 'item',
          formatter: function (params) {
            return `
              <div style="display:flex;align-items:center;">
                <span style="display:inline-block;width:10px;height:10px;background:${params.color};margin-right:5px;border-radius:50%"></span>
                <span style="font-weight:bold">${params.name}</span>
              </div>
              <div style="margin-top:5px">
                <span>数值: </span><span style="font-weight:bold">${params.value}</span>
              </div>
              <div>
                <span>占比: </span><span style="font-weight:bold">${params.percent}%</span>
              </div>
            `;
          },
        },
        legend: {
          // data: this.chartData.sData,
          // data: [
          //   '储能',
          //   '光伏',
          //   '空调',
          //   '充电桩',
          //   '5G基站',
          //   '其他',],
          // data: [
          //   '储能 45% 20MW',
          //   '光伏 22% 10MW',
          //   '空调 22% 10MW',
          //   '充电桩 10% 5MW',
          //   '5G基站 0% 0MW',
          //   '其他 1% 0.4MW',],
          formatter: function (name) {
            const find = option.series[0].data.find((item) => item.name === name);
            return `${name}    ${find.percent}%    ${find.value}MW`;
            // return `{a|${name}} {b|(主要数据)}`;
          },
          textStyle: {
            rich: {
              enable: true,
              a: {
                color: 'red',
                fontSize: 16
              },
              b: {
                color: 'blue',
                fontSize: 12
              }
            }
          },
          orient: 'vertical',
          top: 'center',
          right: '10%',
          icon: 'circle',
          itemStyle: {
            borderWidth: 5,
            // borderColor: '#333',
            color: 'transparent',
          },
          itemWidth: 12,
          itemHeight: 12,
          textStyle: {
            fontSize: 14
          }
        },
        series: [
          {
            // name: '负荷排行',
            type: 'pie',
            radius: ['45%', '65%'],
            center: ['20%', '50%'], // 水平位置，垂直位置
            avoidLabelOverlap: false,
            padAngle: 5,
            // itemStyle: {
            //   borderRadius: 0,
            //   borderWidth: 5,
            // },
            label: {
              show: false,
              position: 'center'
            },
            emphasis: {
              label: {
                show: false,
                fontSize: 40,
                fontWeight: 'bold'
              }
            },
            labelLine: {
              show: false
            },
            data: this.chartData.sData
          }
        ]
      };
      this.myChart.setOption(option);
      window.addEventListener("resize", this.handleResize);
    },
  },
};
</script>

<template>
  <div class="rank-container">
    <!-- <div class="title">
      <span>实时负荷监测</span>
    </div> -->
    <!-- <div style="
      position: absolute;
      z-index: 2;
      left: 72%;
      top: 13%;
    ">
      <div v-for="(item, i) in chartData.sData" :key="i" style="height: 30px;">{{ item.value }}</div>
    </div> -->
    <div id="rank" v-if="chartData.sData.length"></div>
    <DataEmpty v-else></DataEmpty>
  </div>

</template>

<style scoped lang="scss">
.rank-container {
  width: 100%;
  height: 100%;
  position: relative;

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

#rank {
  margin-top: 50px;
  height: calc(100% - 80px);
  width: 100%;
  //background: #fff;
}
</style>
