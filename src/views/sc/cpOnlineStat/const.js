export const curveList = [
  {
    label: "24曲线",
    value: 1,
  },
  {
    label: "96曲线",
    value: 2,
  }
]
export const oneList = [
  {
  label: "一次值",
  value: 1,
},
  {
    label: "二次值",
    value: 2,
  }]
export const chartOption= {
  title: {
    text: ""
  },
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'shadow'
    }
  },
  legend: {
    // left: 80,
    data: [],
    textStyle: {
      // fontSize: 6.5, // 图例的字体大小
    }
  },
  xAxis: {
    type: 'category',
    data: [],
    axisTick: {
      alignWithLabel: true
    },
    axisLabel: {
      rotate: 45, // 旋转角度，正值为顺时针旋转
      fontSize: 10
    }
  },
  yAxis: {
    type: 'value'
  },
  toolbox: {
    show: true,
    feature: {
      dataZoom: {
        show: true,
        title: {
          zoom: "区域缩放", back: "区域缩放还原",
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
          tiled: "切换为平铺",
        },
        type: ['line', 'bar', 'stack', 'tiled']
      },
      restore: {
        show: true,
        title: "还原"
      },
      saveAsImage: {
        show: true,
        title: "保存图片"
      }
    }
  },
  series: [],
};
