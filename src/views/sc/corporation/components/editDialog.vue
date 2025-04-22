<template>
    <div>
        <div style="background: #F5F5F5;margin-bottom: 20px;">
            <custome-tabs :active="active" :tabList="tabs" @change="changeTab"></custome-tabs>
        </div>
        <AddDialog v-if="active == 0" :formData="formData" @close="$emit('close')"></AddDialog>

    </div>
</template>
<script>
import { listCorporation, getCorporation, delCorporation, addCorporation, updateCorporation } from "@/api/sc/corporation";
import AddDialog from './addDialog.vue'
export default {
    name: 'EditDialog',
    dicts: ['supply_voltage', 'industry_type', 'sys_yes_no', 'collection_state', 'electricity_state', 'corporation_state'],
    components: { AddDialog },
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
                    label: '基础档案',
                    value: 0
                },
                {
                    label: '负荷信息',
                    value: 1
                },
                {
                    label: '回路信息',
                    value: 2
                },
                {
                    label: '设备信息',
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
            console.log('index', index);

        },
    }
}
</script>
<style lang="scss" scoped>
.dialog-footer {
    text-align: right;
}
</style>