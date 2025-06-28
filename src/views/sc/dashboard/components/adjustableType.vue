<script>
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
      <span>可调节类型</span>
    </div>
    <div style="height: 85%; display: flex; justify-content: center; align-items: center">
      <div style="width: 100%; height: 100%; position: relative; font-weight: 600">
        <el-image
          style="
            width: 90%;
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
          "
          src="/img/bigScreen/adjustable_type_bg.png"
        ></el-image>
        <div
          style="
            width: 100%;
            height: 12%;
            position: relative;
            background: rgba(255, 255, 255, 0.2);
            display: flex;
            align-items: end;
            justify-content: space-between;
            padding: 0px 15%;
            z-index: 2;
          "
        >
          <div>直控型</div>
          <div>非直控型</div>
        </div>
        <div
          style="
            width: 100%;
            height: 32%;
            position: relative;
            background: rgba(255, 255, 255, 0.3);
            display: flex;
            align-items: end;
            justify-content: space-between;
            padding: 0px 15%;
            z-index: 2;
          "
        >
          <div>直控型</div>
          <div>非直控型</div>
        </div>
        <div
          style="
            width: 100%;
            height: 36%;
            position: relative;
            background: rgba(255, 255, 255, 0.4);
            display: flex;
            align-items: end;
            justify-content: space-between;
            padding: 0px 15%;
            z-index: 2;
          "
        >
          <div>直控型</div>
          <div>非直控型</div>
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
</style>
