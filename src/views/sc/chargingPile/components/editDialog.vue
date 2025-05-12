<template>
    <div>
        <div style="background: #F5F5F5;margin-bottom: 20px;">
            <custome-tabs :active="active" :tabList="tabs" @change="changeTab"></custome-tabs>
        </div>
        <AddDialog v-if="active == 0" :formData="formData" @close="$emit('close')"></AddDialog>
        <chargingPileInfo1 v-if="active == 1"  :formData="formData" @close="$emit('close')"></chargingPileInfo1>
    </div>
</template>
<script>
import { listCorporation, getCorporation, delCorporation, addCorporation, updateCorporation } from "@/api/sc/corporation";
import AddDialog from './addDialog.vue';
import chargingPileInfo1 from './chargingPileInfo1.vue';

export default {
    name: 'EditDialog',
    dicts: ['supply_voltage', 'industry_type', 'sys_yes_no', 'collection_state', 'electricity_state', 'corporation_state'],
    components: {
      AddDialog,
      chargingPileInfo1,
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
                    label: '充电桩',
                    value: 1
                },
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