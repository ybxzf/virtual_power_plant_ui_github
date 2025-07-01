<script>
import DataEmpty from "@/views/sc/dashboard/components/Empty.vue";
import * as echarts from "echarts";
export default {
  name: "CenterTotal",
  components: { DataEmpty },
  props: {
    chartData: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      totalList: [
        { label: "接入负荷", value: 0.45, unit: "MW" },
        { label: "可调负荷", value: 0.30, unit: "MW" },
        { label: "最大可调", value: 0.40, unit: "MW" },
      ],
    };
  },
  mounted() {},
  beforeDestroy() {},
  methods: {},
};
</script>

<template>
  <div
    style="
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
    "
  >
    <div
      v-for="(item, i) in totalList"
      :key="i"
      style="
        width: 200px;
        height: 75px;
        background: url(/img/bigScreen/total_item.png) no-repeat;
        background-size: 100% 100%;
      "
    >
      <div
        style="
          width: 96%;
          height: 30px;
          display: flex;
          justify-content: center;
          align-items: center;
          color: rgba(238, 243, 255, 1);
        "
      >
        {{ item.label }}
      </div>
      <div
        style="
          width: 96%;
          height: 38px;
          display: flex;
          justify-content: center;
          align-items: center;
          font-size: 20px;
          font-weight: 600;
          background: linear-gradient(to bottom, rgba(255, 255, 255, 1), rgba(90, 230, 255, 1));
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          text-fill-color: transparent;
          text-shadow: rgb(185 255 249 / 80%) 0px 0px 10px;
        "
      >
        {{ item.value + item.unit }}
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss"></style>
