// formValidationMixin.js
export default {
  data() {
    return {
      scrollPosition: 0,//滚动位置
      intervalId: null,//循环器
      initHeight: 0,//初始高度
    }
  },
  mounted() {
    this.$nextTick(() => {
      const tableDom = this.$refs.scrollTableRef.$el;
      this.initHeight = tableDom.offsetHeight - 70;
      tableDom.addEventListener('mouseover', this.pauseScroll);
      tableDom.addEventListener('mouseout', this.resumeScroll);
    })
    this.intervalId = setInterval(this.scrollTable, 10);
  },

  methods: {
    //滚动
    scrollTable() {
      // const table = this.$refs.tableContainer;
      const table = this.$refs.scrollTableRef.$el.querySelector('.el-table__body-wrapper');
      // 每次增加 scrollTop，模拟滚动效果
      this.scrollPosition += 0.1;
      if (this.scrollPosition >= table.scrollHeight - this.initHeight) {
        // 当到达底部时，重置 scrollPosition 重新从顶部开始滚动
        this.scrollPosition = 0;
      }
      table.scrollTop = this.scrollPosition;
      // console.log('scrollTable', table.scrollHeight, this.initHeight);
    },
    //暂停
    pauseScroll() {
      // this.isPaused = true
      if (this.intervalId) {
        clearInterval(this.intervalId);
      }
    },
    //继续
    resumeScroll() {
      // this.isPaused = false
      this.intervalId = setInterval(this.scrollTable, 10);
    },
  },
  beforeDestroy() {
    // 在组件销毁前清除定时器
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  },
}