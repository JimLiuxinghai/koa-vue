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
                columns: [{
                    title: '编号',
                    key: 'id'
                }, {
                    title: '账号',
                    key: 'username'
                }, {
                   title: '状态',
                   key: 'enable',
                   render: (h, params) => {
                       let enable = params.row.enable
                       let text = ''
                       if(enable == 0) {
                            text = '未激活'
                       }
                       else if(enable == 1) {
                            text = '已激活'
                       }
                       else if(enbale == 2) {
                            text = '已删除'
                       }
                       return h('div', [
                           h('div', {
                               props: {
                                   type: 'text',
                                   size: 'small'
                               }
                           }, text)
                       ]);
                   }
                },{
                    title: '操作',
                    key: 'action',
                    width: 150,
                    align: 'center',
                    render: (h, params) => {
                        return h('div', [
                            // h('Button', {
                            //     props: {
                            //         type: 'primary',
                            //         size: 'small'
                            //     },
                            //     style: {
                            //         marginRight: '5px'
                            //     },
                            //     on: {
                            //         click: () => {
                            //             this.edit(params)
                            //         }
                            //     }
                            // }, '修改'),
                            h('Button', {
                                props: {
                                    type: 'error',
                                    size: 'small'
                                },
                                on: {
                                    click: () => {
                                        this.remove(params)
                                    }
                                }
                            }, '删除')
                        ]);
                    }
                }],
                add: {
                    username: '',
                    password: '',
                    enable: 1
                },
                modal: false    
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
                this.loading = true
                // this.tableData = data.content
                // this.total = data.totalElements
                
            },
            jump (param) {
                this.page = param - 1
                this.loading = false
                this.getData()
            },
            cancel() {
                this.add = {
                    username: '',
                    password: '',
                    enable: 1
                }
            },
            async addData () {
                let param = this.add
                let data = await add(param)
                
                if(data.data.retCode != 0) {
                    this.$Message.error(data.data.retMsg);
                }
                else {
                    this.$Message.success('添加成功');
                    this.getData()
                }
                this.add = {
                    username: '',
                    password: '',
                    enable: 1
                }
            },
            async edit(params) {

            },
            async remove (params) {
                let config = {
                    checkId: params.row.id
                }

                let data = await del(config)
                if(data.data.retCode != 0) {
                    this.$Message.error(data.data.retMsg);
                }
                else {
                    this.$Message.success('删除成功');
                    this.getData()
                }
            }
        },
        components: {
            Loading: Loading
        }
    }
</script>
