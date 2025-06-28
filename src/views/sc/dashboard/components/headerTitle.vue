<script>
export default {
  name: "HeaderTitle",
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
  <div class="header-bg">
    <div class="label">虚拟电厂运营商平台</div>
  </div>
</template>

<style scoped lang="scss">
.header-bg {
  width: 100%;
  height: 100%;
  background: url(/img/bigScreen/header_bg.png) no-repeat;
  background-size: 100% 100%;
}
.label {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  font-size: 36px;
  font-weight: 600;
  font-family: AlibabaPuHuiTi_3_95_ExtraBold;
  background: linear-gradient(
    to bottom,
    rgba(221, 249, 255, 1),
    rgba(221, 249, 255, 1),
    rgba(149, 198, 251, 1)
  );
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  text-fill-color: transparent;
}
</style>
