<template>
  <div>
    <div style="background: #f5f5f5; margin-bottom: 20px">
      <custome-tabs :active="active" :tabList="tabs" @change="changeTab"></custome-tabs>
    </div>
    <ElectricEnergyReading v-if="active===0"></ElectricEnergyReading>
    <InstantaneousData v-if="active===1"></InstantaneousData>
  </div>
</template>
<script>
import ElectricEnergyReading from "./ElectricEnergyReading.vue";
import InstantaneousData from "./InstantaneousData.vue";
export default {
  name: "EditDialog",
  dicts: [
    "supply_voltage",
    "industry_type",
    "sys_yes_no",
    "collection_state",
    "electricity_state",
    "corporation_state",
  ],
  components: {
    ElectricEnergyReading,
    InstantaneousData
  },
  props: {},
  data() {
    return {
      active: 0,
      tabs: [
        {
          label: "电能示值",
          value: 0,
        },
        {
          label: "瞬时数据",
          value: 1,
        },
      ],
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},

  methods: {
    changeTab(index) {
      console.log("index", index);
      this.active = index;
    },
  },
};
</script>
<style lang="scss" scoped>
.dialog-footer {
  text-align: right;
}
</style>
