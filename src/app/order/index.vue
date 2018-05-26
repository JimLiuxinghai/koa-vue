<style lang="less" scoped>
	@import 'index.less';
</style>
<template>
    <div class="dis">
        <div class="top">
            <div class="first">
                <span>订单号:</span>
                <Input v-model="orderNo" placeholder="订单号" style="width: 150px; margin-right: 40px;"></Input>
                <span>核销状态:</span>
                <Select v-model="checkStatus" style="width:150px;margin-right: 40px;">
                    <Option v-for="item in stateArr" :value="item.key" :key="item.key">{{ item.name }}</Option>
                </Select>
                <span>核验员:</span>
                <Select v-model="checkerId" style="width:150px">
                    <Option v-for="item in checkerArr" :value="item.id" :key="item.id">{{ item.name }}</Option>
                </Select>
            </div>
            <div class="second">
                <span>下单时间:</span>
                <DatePicker type="datetimerange" @on-change="changeOrder"  format="yyyy-MM-dd HH:mm:ss" placeholder="选择下单时间" style="width: 250px;margin-right: 20px;"></DatePicker>
                <span>核销时间:</span>
                <DatePicker type="datetimerange" @on-change="changeCheck"  format="yyyy-MM-dd HH:mm:ss" placeholder="选择核销时间" style="width: 250px;margin-right: 20px;"></DatePicker>
                <span>经销商</span>
                <Select v-model="distributeId" style="width:150px;margin-right: 40px;">
                    <Option v-for="item in disRole" :value="item.id" :key="item.id">{{ item.name }}</Option>
                </Select>
                <Button type="primary" @click="getData()">查询</Button>
            </div>
        </div>
        <div class="inner">
            <Table :loading="!loading" stripe border :columns="columns" :data="tableData"></Table>
            <Page  :current="page + 1" :total="total" @on-change="jump"></Page>
        </div>
    </div>
</template>
<script>
    import { list, checkerList } from '../../data/order'
    import { distributor } from '../../data/data'

    export default {
        beforeMount () {
            this.getData();
            this.getDis();
            this.getChecker()
        },
        data () {
            return {
                loading: false,
                orderNo: '',
                checkStatus: '',
                orderDate: [],
                checkDate: [],
                disRole: [],
                checkerArr: [],
                checkerId: '',
                stateArr: [{
                    key: '1',
                    name: '待验证'
                }, {
                    key: '2',
                    name: '已验证'
                }, {
                    key: '3',
                    name: '已退款'
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
                    key: 'checkStatus',
                    render: (h, params) => {
                        const stateConfig = {
                            1: '待验证',
                            2: '已验证',
                            3: '已退款'
                        }
                        let text = stateConfig[params.row.checkStatus]
                        return h('div', text);
                    }
                }, {
                    title: '核验员',
                    key: 'checker'
                },{
                    title: '一级经销商',
                    key: 'distrName1'
                },{
                    title: '二级经销商',
                    key: 'distrName2'
                },{
                    title: '核销时间',
                    key: 'checkDate'
                }],
                tableData: [],
                total: 0,
                distributeId: ''
                
            }
        },
        methods: {
            async getDis () {
                this.disRole.push({
                    id: 'all',
                    name: '全部'
                }, {
                    id: 'self',
                    name: '直销'
                })
                let disData = await distributor()
                this.disRole = this.disRole.concat(disData.content)
                console.log(this.disRole)
            },
            async getData (page) {
                let param = {
                    page: page || 0,
                    orderNo: this.orderNo,
                    checkStatus: this.checkStatus,
                    distributeId: this.distributeId,
                    checkerId: this.checkerId
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
                
                this.page = page || 0
                this.tableData = data.data.data.content
                this.total = data.data.data.totalElements
                this.loading = true
                
            },
            async getChecker() {
                let checkerData = await checkerList({
                    username: '',
                    page: 0
                })
                this.checkerArr = checkerData.content
               
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

                let page = param - 1
                this.loading = false
                this.getData(page)
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
