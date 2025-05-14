<template>
    <div>
        <el-form ref="form" :model="form" :rules="rules" label-width="180px" :inline="true">
            <el-form-item label="公司全称" prop="companyName">
                <el-input v-model="form.companyName" placeholder="请输入公司全称" />
            </el-form-item>
            <el-form-item label="公司编号" prop="companyCode">
                <el-input v-model="form.companyCode" placeholder="请输入公司编号" />
            </el-form-item>
            <el-form-item label="公司类型" prop="companyType">
                <el-select v-model="form.companyType" placeholder="请选择公司类型">
                    <el-option v-for="dict in dict.type.company_type" :key="dict.value" :label="dict.label"
                        :value="dict.value"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="统一社会信用代码" prop="creditCode">
                <el-input v-model="form.creditCode" placeholder="请输入统一社会信用代码" />
            </el-form-item>
            <el-form-item label="区域编码" prop="areaCodePath">
                <el-cascader v-model="areaCodePath" :options="areaOptions" clearable @change="handleChange"
                    placeholder="请选择所属区域" :props="{
                        checkStrictly: false,
                        // emitPath: false,
                        // expandTrigger: 'hover'
                    }"></el-cascader>
            </el-form-item>
            <el-form-item label="详细注册地址" prop="registeredAddress">
                <el-input v-model="form.registeredAddress" placeholder="请输入详细注册地址" />
            </el-form-item>
            <el-form-item label="法人姓名" prop="legalPerson">
                <el-input v-model="form.legalPerson" placeholder="请输入法人姓名" />
            </el-form-item>
            <el-form-item label="联系电话" prop="contactInfo">
                <el-input v-model="form.contactInfo" placeholder="请输入联系电话" />
            </el-form-item>
            <el-form-item label="注册资金(万元)" prop="registeredCapital">
                <el-input v-model="form.registeredCapital" type="number" :precision="2" :controls=false
                    placeholder="请输入注册资金(万元)" />
            </el-form-item>
            <el-form-item label="备注信息" prop="remark">
                <el-input v-model="form.remark" placeholder="请输入备注信息" />
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button type="primary" @click="submitForm">确 定</el-button>
            <el-button @click="cancel">取 消</el-button>
        </div>
    </div>
</template>
<script>
import { listCompany, getCompany, delCompany, addCompany, updateCompany } from "@/api/sc/company";
import { getAreaTree } from "@/api/sc/corporation";

export default {
    name: 'AddOrEditDialog',
    dicts: ['company_type'],
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
            // 表单校验
            rules: {
                companyName: [
                    { required: true, message: "公司全称不能为空", trigger: "blur" }
                ],
                companyCode: [
                    { required: true, message: "公司编号不能为空", trigger: "blur" }
                ],
                companyType: [
                    { required: true, message: "公司类型不能为空", trigger: "change" }
                ],
                creditCode: [
                    { required: true, message: "统一社会信用代码不能为空", trigger: "blur" }
                ],
                subordinateAreaCode: [
                    { required: true, message: "区域编码不能为空", trigger: "blur" }
                ],
                registeredAddress: [
                    { required: true, message: "详细注册地址不能为空", trigger: "blur" }
                ],
                legalPerson: [
                    { required: true, message: "法人姓名不能为空", trigger: "blur" }
                ],
                contactInfo: [
                    { required: true, message: "联系电话不能为空", trigger: "blur" }
                ],
                registeredCapital: [
                    { required: true, message: "注册资金(万元)不能为空", trigger: "blur" }
                ],
            },
            areaOptions: [],
            areaCodePath: [],//级联选择器存储的所有值
            form: {},
        }
    },
    computed: {

    },
    watch: {
        form: {
            handler(newVal, oldVal) {
                if (newVal.subordinateAreaCode !== oldVal.subordinateAreaCode) {
                    if (this.areaOptions.length == 0) {
                        //获取区域信息
                        getAreaTree().then(response => {
                            this.areaOptions = response.data;
                            this.areaCodePath = this.findFullPath(newVal.subordinateAreaCode, this.areaOptions) || [];
                            console.log('this.newVal', newVal);
                            console.log('this.areaOptions', this.areaOptions);
                            console.log('this.areaCodePath', this.areaCodePath);
                        });
                    } else {
                        this.areaCodePath = this.findFullPath(newVal.subordinateAreaCode, this.areaOptions) || [];
                    }
                }
            },
            deep: true,
            immidiate: true,
        },
    },
    created() {
        this.form = JSON.parse(JSON.stringify(this.formData));
    },
    mounted() {

    },

    methods: {
        /** 提交按钮 */
        submitForm() {
            this.$refs["form"].validate(valid => {
                if (valid) {
                    if (this.form.id != null) {
                        updateCompany(this.form).then(response => {
                            this.$modal.msgSuccess("修改成功");
                            this.$emit('close');
                        });
                    } else {
                        addCompany(this.form).then(response => {
                            this.$modal.msgSuccess("新增成功");
                            this.$emit('close');
                        });
                    }
                }
            });
        },
        //取消按钮
        cancel() {
            this.$emit('close');
        },
        // 级联选择器值改变时触发
        handleChange(val) {
            console.log('val', val);
            this.form.subordinateAreaCode = val[val.length - 1]; // 获取最后一级的值
            // this.form.subordinateAreaCode = val;
        },
        // 根据最后一级的值查找完整路径
        findFullPath(targetValue, options) {
            // 递归查找函数
            function findPath(nodes, path = []) {
                for (const node of nodes) {
                    // 如果当前节点值匹配，返回当前路径
                    if (node.value == targetValue) {
                        return [...path, node.value];
                    }
                    // 如果有子节点，递归查找
                    if (node.children && node.children.length > 0) {
                        const foundPath = findPath(node.children, [...path, node.value]);
                        if (foundPath) return foundPath;
                    }
                }
                return null; // 未找到返回null
            }

            return findPath(options) || []; // 返回找到的路径或空数组
        },
    }
}
</script>
<style lang="scss" scoped>
.dialog-footer {
    text-align: right;
}
</style>