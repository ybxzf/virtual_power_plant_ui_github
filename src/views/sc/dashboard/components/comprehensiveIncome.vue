<script>
export default {
  name: "ComprehensiveIncome",
  components: {},
  props: {
    chartData: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {};
  },
  mounted() {},
  beforeDestroy() {},
  methods: {},
};
</script>

<template>
  <div class="loadMonitoring-container">
    <div class="title">
      <span>综合收益分析</span>
    </div>
    <div style="height: 85%; display: flex; justify-content: center; align-items: center">
      <div
        style="
          width: 100%;
          height: 80%;
          background: url(/img/bigScreen/comprehensive_income_bg.png) no-repeat;
          background-size: 100% 100%;
          position: relative;
        "
      >
        <div class="total-value">3.2万元</div>
        <div class="total-label">总收益</div>
        <div
          style="
            width: 100%;
            height: 16.5%;
            background: rgba(255, 255, 255, 0);
            display: flex;
            justify-content: space-between;
            align-items: end;
            padding: 0 4%;
          "
        >
          <div class="label">参与响应次数</div>
          <div class="label">参与市场交易次数</div>
        </div>
        <div
          style="
            width: 100%;
            height: 22.5%;
            background: rgba(255, 255, 255, 0);
            display: flex;
            justify-content: space-between;
            align-items: end;
            padding: 0 14%;
          "
        >
          <div class="value value1">7次</div>
          <div class="value value2">0次</div>
        </div>
        <div
          style="
            width: 100%;
            height: 30%;
            background: rgba(255, 255, 255, 0);
            display: flex;
            justify-content: space-between;
            align-items: end;
            padding: 0 4%;
          "
        >
          <div class="label">辅助服务费用</div>
          <div class="label">市场交易收益</div>
        </div>
        <div
          style="
            width: 100%;
            height: 23%;
            background: rgba(255, 255, 255, 0);
            display: flex;
            justify-content: space-between;
            align-items: end;
            padding: 0 14%;
          "
        >
          <div class="value value3">3.3万</div>
          <div class="value value4">0元</div>
        </div>
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
#loadMonitoring {
  height: 85%;
  width: 100%;
  //background: #fff;
}
.total-value {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  top: 10%;
  font-family: PangMenZhengDao, PangMenZhengDao;
  font-weight: normal;
  font-size: 20px;
  color: #ffe21d;
  line-height: 24px;
  text-align: left;
  font-style: normal;
  text-transform: none;
}
.total-label {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  top: 62%;
  font-size: 18px;
  font-weight: 600;
}

.label {
  font-family: AlibabaPuHuiTi_3_65_Medium;
  font-size: 18px;
  color: #ffffff;
  font-style: normal;
  text-transform: none;
  background: linear-gradient(
    to bottom,
    rgba(221, 249, 255, 1),
    rgba(221, 249, 255, 1),
    rgba(123, 250, 255, 1)
  );
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  text-fill-color: transparent;
}
.value1 {
  background: linear-gradient(
    to bottom,
    rgba(255, 255, 255, 1),
    rgba(255, 255, 255, 1),
    rgba(19, 252, 191, 1)
  );
}
.value2 {
  background: linear-gradient(
    to bottom,
    rgba(255, 255, 255, 1),
    rgba(255, 255, 255, 1),
    rgba(28, 206, 255, 1)
  );
}
.value3 {
  background: linear-gradient(
    to bottom,
    rgba(255, 255, 255, 1),
    rgba(255, 255, 255, 1),
    rgba(255, 250, 83, 1)
  );
}
.value4 {
  background: linear-gradient(
    to bottom,
    rgba(255, 255, 255, 1),
    rgba(255, 255, 255, 1),
    rgba(255, 113, 28, 1)
  );
}
.value {
  font-family: PangMenZhengDao, PangMenZhengDao;
  font-weight: normal;
  font-size: 20px;
  font-weight: 600;
  color: #ffffff;
  font-style: normal;
  text-transform: none;
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  text-fill-color: transparent;
}
</style>
