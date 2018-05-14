<style lang="less" scoped>
	@import 'index.less';
</style>
<template>
    <div class="dis">
        <div class="top">
            <Input v-model="search.phone" placeholder="请输入电话号" style="width: 300px"></Input>
            <Button type="primary" @click="getData">搜索</Button>
            <Button type="primary" @click="modal = true">新增</Button>
        </div>
        <div class="inner">
            <Table stripe :loading="!loading" border :columns="columns" :data="tableData"></Table>
            <Page :total="tableData.length" :change="change"></Page>
        </div>
         <Modal
             v-model="modal"
             title="新增经销商"
             @on-ok="addData"
             @on-cancel="cancel">
             <div class="add">
                <div class="item">
                    <span>名称:</span>
                    <Input v-model="add.name" placeholder="请输入名称" style="width: 300px"></Input>
                </div>
                <div class="item">
                    <span>手机号:</span>
                    <Input v-model="add.phone" placeholder="请输入手机号" style="width: 300px"></Input>
                </div>
                <div class="item">
                    <span>密码:</span>
                    <Input v-model="add.password" placeholder="请输入密码" style="width: 300px"></Input>
                </div>
                <div class="item">
                    <span>分成:</span>
                    <Input v-model="add.rate" placeholder="请输入分成" style="width: 300px"></Input>%
                </div>
             </div>
         </Modal>
    </div>
</template>
<script>
    import { distributor, deldis, adddis, getRole, actdis } from '../../data/data'
    import Loading from '../common/loading.vue';

    export default {
        beforeMount () {
            this.getData();
            this.getRoles();
        },
        data () {
            return {
                columns: [{
                    title: '编号',
                    key: 'id'
                }, {
                    title: '分销商名称',
                    key: 'name'
                }, {
                    title: '电话',
                    key: 'phone'
                }, {
                    title: '分销商等级',
                    key: 'controller'
                }, {
                    title: '分销商分成比例',
                    key: 'rate'
                }, {
                    title: '状态',
                    key: 'enable',
                    render: (h, params) => {
                        console.log(params.row.enable)
                        let text = params.row.enable == '1' ? '已激活': '去激活';
                        return h('div', [
                             h('Button', {
                                props: {
                                    type: 'primary',
                                    size: 'small'
                                },
                                style: {
                                    marginRight: '5px'
                                },
                                on: {
                                    click: () => {
                                        this.active(params)
                                    }
                                }
                            }, text)
                        ]);
                    }
                }, {
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
                
                search: {
                    phone: ''
                },
                tableData: [],
                roleArr: [],
                loading: false,
                modal: false,
                isEdit: false,
                add: {
                    name: '',
                    phone: '',
                    password: '',
                    distrRole: '',
                    rate: ''
                }
                
            }
        },
        methods: {
            async getData () {
                let param = {
                    phone: this.search.phone,
                    page: 0
                }
                let data = await distributor(param)
                this.loading = true
                this.tableData = data.content
                
            },
            async remove (params) {
                let param = {
                    id: params.row.id
                }
                let data = await deldis(param)
                if(data.data.retCode == 0) {
                    this.$Message.success('删除成功');
                    this.getData();
                }
                else {
                    this.$Message.error(data.data.retMsg);
                }
                
            },
            cancel() {
                this.modal = false
                this.add = {
                    name: '',
                    phone: '',
                    password: '',
                    distrRole: '',
                    rate: ''
                }
            },
            edit (params) {
                console.log(params)
                let data = params.row
                this.add.name = data.name
                this.add.phone = data.phone,
                this.add.password = data.password
                this.add.rate = data.rate
                this.add.distrRole = data.distrRole
                this.modal = true
                this.edit = true
            },
            async addData () {
                this.isEdit = false
                this.add.distrRole = this.roleArr[0].id
                let param = this.add
                let data = await adddis(param)
                if(data.data.retCode == 0) {
                    this.$Message.success('添加成功');
                    this.getData();
                }
                else {
                    this.$Message.error(data.data.retMsg);
                }
               
            },
            async getRoles() {
                let data = await getRole()
                this.roleArr = data.data.data
            },
            cancel() {
                this.modal = false
            },
            //激活
            async active (params) {
                if(params.row.enable !== 1) {
                   let param = {
                       id: params.row.id
                   }
                   let data = await actdis(param)
                   if(data.data.retCode == 0) {
                       this.$Message.success('激活成功');
                       this.getData();
                   }
                   else {
                       this.$Message.error(data.data.retMsg);
                   } 
                }
                
               
            }
        },
        components: {
            Loading: Loading
        }
    }
</script>
