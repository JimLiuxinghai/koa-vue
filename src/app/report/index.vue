<style lang="less" scoped>
    @import 'index.less';
</style>
<template>
    <div class="dis">
        <div class="top" style="padding-left: 30px;">
             <div class="first">
                 
                 <span>代理商名称:</span>
                 <Select v-model="param.distributeId" style="width:200px">
                     <Option v-for="item in dis" :value="item.id" :key="item.id">{{ item.name }}</Option>
                 </Select>
                 <span>月份:</span>
                 <DatePicker  v-model="date"  @on-change="changeMon" type="month" placeholder="选择月份" style="width: 200px"></DatePicker>
             </div>
             <div class="second">
                 <span>统计类型:</span>
                 <Select v-model="param.queryAmtType" style="width:200px">
                     <Option v-for="item in AmtParam" :value="item.key">{{ item.name }}</Option>
                 </Select>
                 <span>时间类型:</span>
                 <Select v-model="param.queryDateType" style="width:200px">
                     <Option v-for="item in dateParam" :value="item.key">{{ item.name }}</Option>
                 </Select>
                 <Button type="primary" @click="getData()">查询</Button>
             </div>
        </div>
        <div class="inner">
            <Table height="500" :loading="!loading" stripe border :columns="columns" :data="tableData"></Table>
        </div>
    </div>
</template>
<script>
    import { list } from '../../data/anly'
    import { distributor } from '../../data/data'
    import Loading from '../common/loading.vue';

    export default {
        beforeMount () {
            this.date = this.getDate(new Date(), 'yyyy-MM')
            this.changeMon(this.date)
            this.getData();
        },
        data () {
            return {
                dis: [],
                date: '',
                loading: false,
                tableData: [],
                data: [],
                dateParam: [{
                    key: 1,
                    name: '核销日期'
                }, {
                    key: 2,
                    name: '下单日期'
                }],
                AmtParam: [{
                    key: 1,
                    name: '提成金额'
                }, {
                    key: 2,
                    name: '销售额'
                }],
                columns: [{
                    title: '日期/经销商名称',
                    key: 'name',
                    width: 160,
                    fixed: 'left'
                }],
                param: {
                    distributeId: '',
                    year: '',
                    month: '',
                    queryAmtType: 1,
                    queryDateType: 1
                }   
            }
        },
        methods: {
            async getData () {
                let param = this.param
                let data = await list(param)
                let disData = await distributor()
                this.dis = disData.content
                this.tableData = []
                if(data.data.retCode == 0) {
                  this.data = data.data.data
                  this.dealData()  
                }
                else {
                    this.$Message.error(data.data.retMsg);
                }
                //this.tableData = data.content
                
            },
            changeMon(date) {
                
                let newDate = date.split('-')
                this.param.year = newDate[0]
                this.param.month = newDate[1]
                
            },
            getDate(d, format) {
                const o = {
                    'M+': d.getMonth() + 1,
                    'd+': d.getDate(),
                    'h+': d.getHours(),
                    'm+': d.getMinutes(),
                    's+': d.getSeconds(),
                    'q+': Math.floor((d.getMonth() + 3) / 3),
                    'S': d.getMilliseconds()
                };

                if (/(y+)/.test(format)) {
                    format = format.replace(RegExp.$1, (d.getFullYear() + '').substr(4
                        - RegExp.$1.length));
                }

                for (let k in o) {
                    if (new RegExp('(' + k + ')').test(format)) {
                        format = format.replace(RegExp.$1, RegExp.$1.length == 1
                            ? o[k]
                            : ('00' + o[k]).substr(('' + o[k]).length));
                    }
                }
                return format;
            },
            dealData() {
                if(this.data.tableRows) {
                    this.columns = [{
                        title: '日期/经销商名称',
                        key: 'name',
                        width: 160,
                        fixed: 'left'
                    }]
                    this.data.tableRows.forEach((date) => {
                        this.columns.push({
                            title: date,
                            key: date,
                            width: 100
                        })
                    })
                    let tableData = []
                    let keys = Object.keys(this.data.data)
                    keys.forEach((key) => {
                        let newData = {
                            name: key
                        }
                        this.data.data_s[key].forEach((item) => {
                            newData[item.day] = item.amt
                        })
                        tableData.push(newData)
                    })
                    this.tableData = []
                    this.tableData = tableData 
                    this.loading = true
                }
                else {
                    this.tableData = []
                    this.$Message.success('暂无数据');
                }
                
            }
        },
        components: {
            Loading: Loading
        }
    }
</script>
