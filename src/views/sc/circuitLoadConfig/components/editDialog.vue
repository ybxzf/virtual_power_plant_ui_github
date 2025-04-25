<template>
    <div>
        <div style="background: #F5F5F5;margin-bottom: 20px;">
            <custome-tabs :active="active" :tabList="tabs" @change="changeTab"></custome-tabs>
        </div>
        <LoadInfo v-if="active === 0" :formData="formData" @close="$emit('close')"></LoadInfo>
        <LoopInfo v-if="active === 1" :formData="formData" @close="$emit('close')"></LoopInfo>
        <device-load-config v-if="active === 2" :formData="formData"></device-load-config>
        <LivePicture v-if="active === 3" :formData="formData"></LivePicture>
    </div>
</template>
<script>
import AddDialog from './addDialog.vue';
import LoadInfo  from './loadInfo.vue';
import LoopInfo  from './loopInfo.vue';
import DeviceLoadConfig from './deviceLoadConfig.vue'
import LivePicture from '@/views/sc/circuitLoadConfig/components/LivePicture.vue'

export default {
    name: 'EditDialog',
    dicts: ['supply_voltage', 'industry_type', 'sys_yes_no', 'collection_state', 'electricity_state', 'corporation_state'],
    components: {
      LivePicture,
      DeviceLoadConfig,
      AddDialog,
      LoadInfo,
      LoopInfo,
     },
    props: {
        formData: {
            type: Object,
            default: () => {
                return {}
            }
        },
    },
    data() {
        return {
            active: 0,
            tabs: [
                {
                    label: '负荷信息',
                    value: 0
                },
                {
                    label: '可调资源配置',
                    value: 1
                },
                {
                    label: '设备负荷配置',
                    value: 2
                },
                {
                    label: '现场照片',
                    value: 3
                }
            ],
        }
    },
    computed: {

    },
    watch: {

    },
    created() {

    },
    mounted() {

    },

    methods: {
        changeTab(index) {
            this.active = index;
        },
    }
}
</script>
<style lang="scss" scoped>
.dialog-footer {
    text-align: right;
}
</style>
