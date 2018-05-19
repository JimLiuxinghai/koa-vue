<style lang="less" scoped>
    @import 'index.less';
</style>
<template>
    <div class="dis">
        <div class="top" style="padding-left: 30px;">
             <Button type="info" @click="modal = true">添加票务周期价格</Button>
        </div>
        <div class="inner">
            <Table :loading="!loading" stripe border :columns="columns" :data="tableData"></Table>
            <Page  :current="page + 1" :total="total" @on-change="jump"></Page>
        </div>
        <Modal
            v-model="modal"
            title="新增价格周期"
            @on-ok="addData"
            @on-cancel="modal = false">
            <div class="add">
                <div class="item">
                    <span>门票名称:</span>
                    <Select v-model="add.productCode" style="width:250px">
                        <Option v-for="item in ticket" :value="item.productCode" :key="item.key">{{ item.productName }}</Option>
                    </Select>
                </div>
                <div class="item">
                    <span>生效日期:</span>
                    <DatePicker type="datetimerange" @on-change="changeCheck"  format="yyyy-MM-dd" placeholder="生效日期" style="width: 250px;"></DatePicker>
                </div>
                <div class="item">
                    <span>价格:</span>
                    <Input v-model="add.salePrice" placeholder="价格" style="width: 250px;"></Input>
                </div>
            </div>
        </Modal>
    </div>
</template>
<script>
    import { list, time, addTime } from '../../data/ticket'
    import Loading from '../common/loading.vue';

    export default {
        beforeMount () {
            this.getData();
        },
        data () {
            return {
                modal: false,
                loading: false,
                tableData: [],
                ticket: [],
                total: 0,
                columns: [{
                    title: '门票名称',
                    key: 'name'
                }, {
                    title: '价格',
                    key: 'price'
                }, {
                    title: '开始时间',
                    key: 'start'
                }, {
                    title: '结束时间',
                    key: 'end'
                }],
                page: 0,
                add: {
                    action: 'a',
                    productCode: '',
                    effectiveDate: '',
                    expiredDate: '',
                    salePrice: '',
                    id: null
                }    
            }
        },
        methods: {
            async getData () {
                let param = {
                    page: this.page
                }
                let data = await list(param)
                this.ticket = data.content
                let priceData = await time(param)
                let resultData = []
                priceData.content.forEach((price) => {
                    let name = ''
                    data.content.forEach((ticket) => {
                        if(price.productCode == ticket.productCode) {
                            name = ticket.productName
                            
                        }
                    })
                    let newData = {
                        price: price.salePrice,
                        name: name,
                        start: price.begDate,
                        end: price.endDate
                    }
                    resultData.push(newData)

                })
                this.loading = true
                this.tableData = resultData
                this.total = priceData.totalElements
                
            },
            changeCheck(date) {
                this.add.effectiveDate = date[0]
                this.add.expiredDate = date[1]
                
            },
            jump (param) {
                this.page = param - 1
                this.loading = false
                this.getData()
            },
            async addData () {
                let data = await addTime(this.add)
                if(data.data.retCode != 0) {
                    this.$Message.error(data.data.retMsg);
                }
                else {
                    this.$Message.success('添加成功');
                    this.getData()
                }
                this.add =  {
                    action: 'a',
                    productCode: '',
                    effectiveDate: '',
                    expiredDate: '',
                    salePrice: '',
                    id: null
                }
                this.getData()
            }
        },
        components: {
            Loading: Loading
        }
    }
</script>
