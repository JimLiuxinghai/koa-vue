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
            <Table  :loading="!loading" stripe border :columns="columns" :data="tableData"></Table>
            <Page  :current="page + 1" :total="total" @on-change="jump"></Page>
        </div>
        <Modal
            v-model="modal"
            title="新增验票员"
            @on-ok="addData"
            @on-cancel="cancel">
            <div class="add">
                <div class="item">
                    <span>用户名:</span>
                    <Input v-model="add.username" placeholder="用户名" style="width: 300px"></Input>
                </div>
                <div class="item">
                    <span>密码:</span>
                    <Input v-model="add.password" placeholder="密码" style="width: 300px"></Input>
                </div>
            </div>
        </Modal>
    </div>
</template>
<script>
    import { list, add } from '../../data/checker'
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
                   key: 'enable' 
                },{
                    title: '操作',
                    key: 'action',
                    width: 150,
                    align: 'center',
                    render: (h, params) => {
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
                                        this.edit(params)
                                    }
                                }
                            }, '修改'),
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
                    username: this.username,
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

            }
        },
        components: {
            Loading: Loading
        }
    }
</script>
