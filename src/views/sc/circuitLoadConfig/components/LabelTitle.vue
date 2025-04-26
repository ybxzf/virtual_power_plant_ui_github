<script>
export default {
  name: 'LabelTitle',
  props: {
    title: {
      type: String,
      default: ''
    }
  },
}
</script>

<template>
  <div class="label-title">
    <div class="label-title__text">
      {{ title }}
    </div>
  </div>
</template>

<style scoped lang="scss">
.label-title {
  width: 100%;
  height: 36px;
  line-height: 36px;
  background: #F5F5F5;
  padding-left: 16px;
  .label-title__text {
    font-size: 18px;
    font-weight: bold;
    color: #585858;
    text-align: left;
  }
}
</style>
