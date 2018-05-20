<style lang="less" scoped>
	@import 'index.less';
</style>
<template>
    <div class="checker">
        <div class="top" style="padding-left: 30px;">
             <Input v-model="username" placeholder="用户名" style="width: 300px"></Input>
             <Button type="primary" @click="getData">查询</Button>
             <Button type="info" @click="modal = true">添加验票员</Button>
        </div>
        <div class="inner">
            <highcharts :options="chartOptions" ref="highcharts"></highcharts>
        </div>
    </div>
</template>
<script>
    import { list } from '../../data/ticket'
    import { hour, city } from '../../data/anly'
    import Loading from '../common/loading.vue';

    export default {
        beforeMount () {
            this.getData();
        },
        data () {
            return {
                username: '',
                loading: false,
                tableData: [],
                total: 0,
                page: 0,
                hourData: [],
                cityData: [],
                chartOptions: {}

            }
        },
        methods: {
            async getData () {
                let param = {
                    "year":"2018",
                    "month":"4",
                    "productCode":null
                }
                let data = await hour(param)
                let cityData = await city(param)
                console.log(data,cityData, '****')
                if(data.retCode == 0 && cityData.retCode == 0) {
                    this.dealData(data.data, cityData.data)
                }
                else {
                    alert('暂无数据')
                }
                this.loading = true
                // this.tableData = data.content
                // this.total = data.totalElements
                
            },
            dealData(hourData, cityData) {
                let hourArr = []
                for(let i = 1; i <= 24; i++ ) {
                    let newData = {
                        hour: i,
                        count: 0
                    }
                    hourData.forEach((item) => {
                        if(i == parseInt(item.hour)) {
                            newData = {
                                hour: i,
                                count: item.count
                            }
                        }
                    })
                    hourArr.push(newData)
                }

                this.init_charts(hourArr)
            },
            init_charts(data, callback){
                
                let xData = []
                let yData = []

                data.forEach((item) => {
                    xData.push(item.hour)
                    yData.push(item.count)
                })
              this.chartOptions = {
                chart: {
                    type: 'column'
                },
                title: {
                    text: '销售量小时分布'
                },
        
                xAxis: {
                    categories: xData,
                    crosshair: true
                },
                yAxis: {
                    min: 0,
                    title: {
                        text: '售票数'
                    }
                },
                plotOptions: {
                    column: {
                        borderWidth: 0
                    }
                },
                series: [{
                    name: '小时销售量',
                    data: yData
                }]
              };

            }
        },
        components: {
            Loading: Loading
        }
    }
</script>
