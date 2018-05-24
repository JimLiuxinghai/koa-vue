<style lang="less" scoped>
	@import 'index.less';
</style>
<template>
    <div class="checker">
        <div class="top" style="padding-left: 30px;">
            <span>月份:</span>
            <DatePicker  v-model="date"  @on-change="changeMon" type="month" placeholder="选择月份" style="width: 200px;margin-right:30px;"></DatePicker>
            <span>票种:</span>
            <Select v-model="param.productCode" style="width:200px;margin-right: 30px;">
                <Option v-for="item in ticketData" :value="item.productCode" :key="item.productCode">{{ item.productName }}</Option>
            </Select>
            <Button type="primary" @click="getData()">查询</Button>
        </div>
        <div class="inner">
            <highcharts :options="chartOptions" ref="highcharts"></highcharts>
            <highcharts :options="cityOptions" ref="highcharts"></highcharts>
        </div>
    </div>
</template>
<script>
    import { list } from '../../data/ticket'
    import { hour, city } from '../../data/anly'
    import Loading from '../common/loading.vue';

    export default {
        beforeMount () {
            this.date = this.getDate(new Date(), 'yyyy-MM')
            this.changeMon(this.date)
            this.getTickets()
            this.getData();

        },
        data () {
            return {
                username: '',
                loading: false,
                tableData: [],
                total: 0,
                page: 0,
                date: '',
                ticketData: [],
                hourData: [],
                cityData: [],
                chartOptions: {},
                cityOptions: {},
                param: {
                    year: '',
                    month: '',
                    productCode: null
                }
            }
        },
        methods: {
            async getData () {
                let param = this.param
                let data = await hour(param)
                let cityData = await city(param)
                
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
            async getTickets () {
                let data = await list({
                    pageSize: 1000
                })
                this.ticketData = data.content
                console.log(data)
            },
            changeMon(date) {
                
                let newDate = date.split('-')
                this.param.year = newDate[0]
                this.param.month = newDate[1]
                
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
                this.init_city(cityData)
                this.init_charts(hourArr)
            },
            init_city(data) {
                  let xData = []
                  let yData = []

                  data.forEach((item) => {
                      if(item.cityName) {
                        xData.push(item.cityName)
                        yData.push(item.count)
                      }
                      
                  })
                this.cityOptions = {
                  chart: {
                      type: 'column'
                  },
                  title: {
                      text: '销售量城市分布'
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
                      name: '城市销售量',
                      data: yData
                  }]
                };
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
            }
        },
        components: {
            Loading: Loading
        }
    }
</script>
