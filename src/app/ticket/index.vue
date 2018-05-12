<style lang="less" scoped>
	@import 'index.less';
</style>
<template>
    <div class="dis">
        <div class="inner">
            <Table :loading="!loading" stripe border :columns="columns" :data="tableData"></Table>
            <Page  :current="page + 1" :total="total" @on-change="jump"></Page>
        </div>
        <Modal
            v-model="modal"
            title="新增票种"
            @on-ok="addData"
            @on-cancel="modal = false">
            <div class="add">
                
            </div>
        </Modal>
    </div>
</template>
<script>
    import { list } from '../../data/ticket'
    import Loading from '../common/loading.vue';

    export default {
        beforeMount () {
            this.getData();
        },
        data () {
            return {
                loading: false,
                tableData: [],
                total: 0,
                columns: [{
                    title: '编号',
                    key: 'productCode'
                }, {
                    title: '门票名称',
                    key: 'productName'
                }, {
                   title: '状态',
                   key: 'enable' 
                }, {
                    title: '价格',
                    key: 'salePrice' 
                }, {
                    title: '是否允许退票',
                    key: 'isRefund'
                }],
                page: 0,
                add: {

                }     
            }
        },
        methods: {
            async getData () {
                let param = {
                    page: this.page
                }
                let data = await list(param)
                console.log(data)
                this.loading = true
                this.tableData = data.content
                this.total = data.totalElements
                
            },
            jump (param) {
                this.page = param - 1
                this.loading = false
                this.getData()
            },
            async addData () {

            }
        },
        components: {
            Loading: Loading
        }
    }
</script>
