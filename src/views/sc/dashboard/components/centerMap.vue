<script>
export default {
  name: "CenterMap",
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
  <div
    style="width: 100%; height: 100%; display: flex; justify-content: center; align-items: center"
  >
    <div
      style="
        width: 100%;
        height: 100%;
        background: url(/img/bigScreen/map_bg.png) no-repeat;
        background-size: 100% 100%;
        position: relative;
        font-weight: 600;
      "
    ></div>
  </div>
</template>

<style scoped lang="scss"></style>
