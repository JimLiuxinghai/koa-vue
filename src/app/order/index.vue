<style lang="less" scoped>
	@import 'index.less';
</style>
<template>
    <div class="dis">
        <div class="top">
            <div class="first">
                <span>订单号:</span>
                <Input v-model="orderNo" placeholder="订单号" style="width: 200px; margin-right: 40px;"></Input>
                <span>核销状态:</span>
                <Select v-model="checkStatus" style="width:200px">
                    <Option v-for="item in stateArr" :value="item.key" :key="item.key">{{ item.name }}</Option>
                </Select>
            </div>
            <div class="second">
                <span>下单时间:</span>
                <DatePicker type="datetimerange" @on-change="changeOrder"  format="yyyy-MM-dd HH:mm:ss" placeholder="选择下单时间" style="width: 300px;margin-right: 40px;"></DatePicker>
                <span>核销时间:</span>
                <DatePicker type="datetimerange" @on-change="changeCheck"  format="yyyy-MM-dd HH:mm:ss" placeholder="选择核销时间" style="width: 300px;margin-right: 40px;"></DatePicker>
                <Button type="primary" @click="getData">查询</Button>
            </div>
        </div>
        <div class="inner">
            <Table stripe border :columns="columns" :data="tableData"></Table>
            <Page  :current="page + 1" :total="total" @on-change="jump"></Page>
        </div>
    </div>
</template>
<script>
    import { list } from '../../data/order'
    import { distributor } from '../../data/data'

    export default {
        beforeMount () {
            this.getData();
        },
        data () {
            return {
                orderNo: '',
                checkStatus: '',
                orderDate: [],
                checkDate: [],
                stateArr: [{
                    key: '1',
                    name: '待验证'
                }, {
                    key: '2',
                    name: '已验证'
                }, {
                    key: '3',
                    name: '已失效'
                }],
                page: 0,
                columns: [{
                    title: '订单号',
                    key: 'orderNo'
                }, {
                    title: '票号',
                    key: 'ticketCode'
                }, {
                   title: '票种名称',
                   key: 'ticketName' 
                }, {
                    title: '游客姓名',
                    key: 'visitorName'
                },{
                    title: '游客手机号',
                    key: 'visitorPhone'
                },{
                    title: '订单金额',
                    key: 'realPrice'
                },{
                    title: '下单时间',
                    key: 'createdTime'
                },{
                    title: '核销状态',
                    key: 'checkStatus'
                }, {
                    title: '核销时间',
                    key: 'checkDate'
                }],
                tableData: [],
                total: 0
                
            }
        },
        methods: {
            async getData () {
                let param = {
                    page: this.page,
                    orderNo: this.orderNo,
                    checkStatus: this.checkStatus
                }
                if(this.orderDate.length) {
                    param.orderBegDate = this.orderDate[0]
                    param.orderEndDate = this.orderDate[1]
                }
                if(this.checkDate.length) {
                    param.checkBegDate = this.checkDate[0]
                    param.checkEndDate = this.checkDate[1]
                }
                
                let data = await list(param)
                let disData = await distributor()
                console.log(disData, '&&&&&&7')
                this.tableData = data.data.data.content
                this.total = data.data.data.totalElements
                console.log(data, '****')
                
            },
            changeOrder(date) {
                this.orderDate = date
            },
            changeCheck(date) {
                this.checkDate = date
            },
            async remove (params) {
                let param = {
                    id: params.row.id
                }
                
            },
            jump (param) {
                this.page = param - 1
                this.loading = false
                this.getData()
            },
            async addData () {

            },
            async getRoles() {
                let data = await getRole()
                console.log(data.data.data)
            }
        }
    }
</script>
