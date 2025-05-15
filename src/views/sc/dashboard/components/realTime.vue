<template>
    <div class="current-time">
        {{ formattedTime }}
    </div>
</template>

<script>
import moment from 'moment'

export default {
    name: 'RealTime',
    data() {
        return {
            currentTime: new Date(), // 存储当前时间对象
            timer: null
        }
    },
    computed: {
        // 使用计算属性格式化时间
        formattedTime() {
            return moment(this.currentTime).format('YYYY-MM-DD HH:mm:ss')
            // 其他常用格式：
            // return moment(this.currentTime).format('LLLL') // 例如: "2023年5月15日星期一 14:30"
            // return moment(this.currentTime).format('hh:mm:ss A') // 12小时制带AM/PM
        }
    },
    methods: {
        updateTime() {
            this.currentTime = new Date() // 更新当前时间
        }
    },
    mounted() {
        this.updateTime()
        this.timer = setInterval(this.updateTime, 1000)
    },
    beforeDestroy() {
        clearInterval(this.timer)
    }
}
</script>

<style scoped>
.current-time {
    position: absolute;
    right: 8%;
    top: 4px;
    color: #959aa7;
    font-family: monospace;
    /* 等宽字体显示时间更整齐 */
    font-size: 14px;
}
</style>