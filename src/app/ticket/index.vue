<style lang="less" scoped>
	@import 'index.less';
</style>
<template>
    <div class="dis">
        <div class="top" style="padding-left: 30px;">
             <Button type="info" @click="modal = true">添加票种</Button>
        </div>
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
                <div class="item">
                    <span>票务类型</span>
                    <Select v-model="type" style="width:200px" @on-change="">
                        <Option v-for="item in ticketType" :value="item.key" :key="item.key">{{ item.name }}</Option>
                    </Select>
                </div>
                <div class="item">
                    <span>票务验证类型:</span>
                    <Select v-model="add.productGroup" style="width:200px">
                        <Option v-for="item in product" :value="item.key" :key="item.key">{{ item.name }}</Option>
                    </Select>
                </div>
                <div class="item">
                    <span>票务编码:</span>
                    <Input v-model="add.productCode" placeholder="票务编码" style="width: 200px"></Input>
                </div>
                <div class="item">
                    <span>票务名称:</span>
                    <Input v-model="add.productName" placeholder="票务名称" style="width: 200px"></Input>
                </div>
                <div class="item">
                    <span>价格:</span>
                    <Input v-model="add.salePrice" placeholder="salePrice" style="width: 200px"></Input>
                </div>
                <div class="item">
                    <span>预定须知:</span>
                    <Input v-model="add.payNotice" placeholder="预定须知" style="width: 200px"></Input>
                </div>
                <div class="item">
                    <span>使用说明:</span>
                    <Input v-model="add.descript1" placeholder="使用说明" style="width: 200px"></Input>
                </div>
                <div v-if="type == 'seckill'">
                    <div class="item">
                        <span>秒杀票数量</span>
                        <Input v-model="kill.ticketLimitCnt" placeholder="秒杀票数量" style="width: 200px"></Input>
                    </div>
                    <div class="item">
                        <span>秒杀票价</span>
                        <Input v-model="kill.amount" placeholder="秒杀票价" style="width: 200px"></Input>
                    </div>
                    <div class="item">
                        <span>秒杀票生效时间</span>
                        <DatePicker type="datetimerange" @on-change="changeEx"  format="yyyy-MM-dd hh:mm:ss" placeholder="秒杀票生效时间" style="width: 250px;"></DatePicker>
                    </div>
                    <div class="item">
                        <span>秒杀票展示时间</span>
                        <DatePicker type="datetimerange" @on-change="changeDis"  format="yyyy-MM-dd hh:mm:ss" placeholder="秒杀票展示时间" style="width: 250px;"></DatePicker>
                    </div>
                </div>
            </div>
        </Modal>
    </div>
</template>
<script>
    import { list, add, addSec, detail } from '../../data/ticket'
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
                total: 0,
                type: '',
                columns: [{
                    title: '编号',
                    key: 'productCode'
                }, {
                    title: '门票名称',
                    key: 'productName'
                }, {
                   title: '状态',
                   key: 'enable',
                   render: (h, params) => {
                       const stateConfig = {
                           0: '失效',
                           1: '正常'
                       }
                       let text = stateConfig[params.row.enable]
                       return h('div', [
                            h('Button', {
                               props: {
                                   type: 'text',
                                   size: 'small'
                               }
                           }, text)
                       ]);
                   } 
                }, {
                    title: '价格',
                    key: 'salePrice' 
                }, {
                    title: '是否允许退票',
                    key: 'isRefund',
                    render: (h, params) => {
                        const stateConfig = {
                            0: '否',
                            1: '是'
                        }
                        let text = stateConfig[params.row.isRefund]
                        return h('div', {
                            props: {
                                type: 'text',
                                size: 'small'
                            }
                        }, text);
                    } 
                }, {
                    title: '详情',
                    key: 'detail',
                    render: (h, params) => {
                        return h('div', [
                             h('Button', {
                                props: {
                                    type: 'primary',
                                    size: 'small'
                                },
                                on: {
                                    click: () => {
                                        this.getDetail(params)
                                    }
                                }
                            }, '详情')
                        ]);
                    }
                }],
                page: 0,
                add: {
                    type: '',
                    productGroup: '',
                    productCode: '',
                    productName: '',
                    profile: '',
                    feature: '',
                    payNotice: '',
                    marketPrice: '',
                    salePrice: '',
                    descript1: ''
                },
                kill: {
                    ticketLimitCnt: '',
                    amount: '',
                    effectTimeS: '',
                    expireTimeS: '',
                    displayBegTimeS: '',
                    displayEndTimeS: ''
                },
                product: [{
                    key: 'date',
                    name: '精确日期验证'
                }, {
                    key: 'active',
                    name: '价格有效期验证'
                }, {
                    key: 'price',
                    name: '当日价格验证'
                }],
                ticketType: [{
                    key: 'normal',
                    name: '普通票'
                }, {
                    key: 'seckill',
                    name: '秒杀票'
                }]     
            }
        },
        methods: {
            async getData () {
                let param = {
                    page: this.page
                }
                let data = await list(param)
                
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
                
                if(this.type == 'normal') {
                    let data = await add(this.add)
                    if(data.data.retCode != 0) {
                        this.$Message.error(data.data.retMsg);
                    }
                    else {
                        this.$Message.success('添加成功');
                        this.getData()
                    }
                    this.add =  {
                        productGroup: '',
                        productCode: '',
                        productName: '',
                        payNotice: '',
                        marketPrice: '',
                        salePrice: '',
                        descript1: ''
                    }
                }
                else {
                    let param = {
                        productInfo: this.add,
                        prdCmpnLimitInfo: this.kill
                    }
                    let data = await addSec(param)
                    if(data.data.retCode != 0) {
                        this.$Message.error(data.data.retMsg);
                    }
                    else {
                        this.$Message.success('添加成功');
                        this.getData()
                    }
                    this.add =  {
                        productGroup: '',
                        productCode: '',
                        productName: '',
                        payNotice: '',
                        marketPrice: '',
                        salePrice: '',
                        descript1: ''
                    }
                    this.kill = {
                        ticketLimitCnt: '',
                        amount: '',
                        effectTimeS: '',
                        expireTimeS: '',
                        displayBegTimeS: '',
                        displayEndTimeS: ''
                    }
                }
            },
            changeEx (date) {
                this.kill.effectTimeS = date[0]
                this.kill.expireTimeS = date[1]
            },
            changeDis (date) {
                this.kill.displayBegTimeS = date[0]
                this.kill.displayEndTimeS = date[1]
            },
            getDetail (params) {
                console.log(params)
            }
        },
        components: {
            Loading: Loading
        }
    }
</script>
