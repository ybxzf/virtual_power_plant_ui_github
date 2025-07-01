<script>
export default {
  name: "Responsiveness",
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
      <span>响应能力</span>
    </div>
    <div style="display: flex; justify-content: center; align-items: center">
      <div style="width: 100%; height: 70%">
        <div
          style="
            width: 100%;
            height: 110px;
            background: url(/img/bigScreen/responsiveness_1.png) no-repeat;
            background-size: 100% 100%;
            display: flex;
            justify-content: space-between;
            align-items: end;
          "
        >
          <div
            style="
              width: 40%;
              height: 70px;
              display: flex;
              flex-direction: column;
              align-items: center;
            "
          >
            <div class="value">0.454MW</div>
            <div class="label">最大响应能力</div>
          </div>
          <div
            style="
              width: 40%;
              height: 70px;
              display: flex;
              flex-direction: column;
              align-items: center;
            "
          >
            <div class="value">0.154MW</div>
            <div class="label">最小响应能力</div>
          </div>
        </div>
        <div
          style="
            width: 100%;
            height: 110px;
            background: url(/img/bigScreen/responsiveness_2.png) no-repeat;
            background-size: 100% 100%;
            display: flex;
            justify-content: space-between;
            align-items: end;
          "
        >
          <div
            style="
              width: 40%;
              height: 70px;
              display: flex;
              flex-direction: column;
              align-items: center;
            "
          >
            <div class="value">15天</div>
            <div class="label">最大响应时长</div>
          </div>
          <div
            style="
              width: 40%;
              height: 70px;
              display: flex;
              flex-direction: column;
              align-items: center;
            "
          >
            <div class="value">1天</div>
            <div class="label">最小响应时长</div>
          </div>
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
.label {
  color: #d7f5fe;
  font-style: normal;
  text-transform: none;
}
.value {
  font-family: PangMenZhengDao, PangMenZhengDao;
  font-weight: normal;
  font-size: 18px;
  color: #ffffff;
  font-style: normal;
  text-transform: none;
  text-shadow: rgb(185 255 249 / 80%) 0px 0px 10px;
}
</style>
