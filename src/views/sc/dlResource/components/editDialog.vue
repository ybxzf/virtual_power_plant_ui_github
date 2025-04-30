<template>
    <div>
        <div style="background: #F5F5F5;margin-bottom: 20px;">
            <custome-tabs :active="active" :tabList="tabs" @change="changeTab"></custome-tabs>
        </div>
        <AddDialog v-if="active == 0" :formData="formData" @close="$emit('close')"></AddDialog>
        <PvInfo v-if="active == 1"  :formData="formData" @close="$emit('close')"></PvInfo>
        <EnergyStorageInfo v-if="active == 2"  :formData="formData"></EnergyStorageInfo>
        <SelfPlantInfo v-if="active == 3"  :formData="formData"></SelfPlantInfo>
    </div>
</template>
<script>
import { listCorporation, getCorporation, delCorporation, addCorporation, updateCorporation } from "@/api/sc/corporation";
import AddDialog from './addDialog.vue';
import PvInfo  from './pvInfo.vue';
import EnergyStorageInfo  from './energyStorageInfo.vue';
import SelfPlantInfo from './selfPlantInfo.vue';

export default {
    name: 'EditDialog',
    dicts: ['supply_voltage', 'industry_type', 'sys_yes_no', 'collection_state', 'electricity_state', 'corporation_state'],
    components: {
      AddDialog,
      PvInfo,
      EnergyStorageInfo,
      SelfPlantInfo,
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
                    label: '基础档案',
                    value: 0
                },
                {
                    label: '分布式光伏',
                    value: 1
                },
                {
                    label: '储能信息',
                    value: 2
                },
                {
                    label: '自备电厂',
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