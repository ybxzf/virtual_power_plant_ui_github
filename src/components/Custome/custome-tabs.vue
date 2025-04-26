<template>
  <div class="home" style="display: flex;">
    <div v-for="(item, i) in tabList" :key="i" class="tab-item">
      <div class="tab-item-content" :class="activeTab === i ? 'tab-item-is-active' : 'tab-item-no-active'"
        @click="changeTab(i)" style="">
        <div>
          {{ item.label }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "custome-tabs",
  props: {
    active: {
      type: Number,
      default: 0
    },
    tabList: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      activeTab: this.active,

    };
  },
  created() {
  },
  mounted() {

  },
  components: {},
  computed: {},
  watch: {},
  methods: {
    //切换tab
    changeTab(i) {
      this.activeTab = i;
      this.$emit('change', i);
    },
  },
  beforeDestroy() {
    this.activeTab = 0;
  },
};
</script>

<style scoped lang="scss">
.tab-item {
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-weight: 500;
  background: #F5F5F5;

  .tab-item-content {
    height: 70%;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 5px;
    margin: 15% 10px;
    padding: 0 10px;
    cursor: pointer;
  }

  .tab-item-is-active {
    background: linear-gradient(to bottom right, #005FED, #0BDED7);
    background: linear-gradient(to bottom right, #005FED, #0BDED7);
    color: #fff;
  }

  .tab-item-no-active {
    color: #585858;

  }
}
</style>
