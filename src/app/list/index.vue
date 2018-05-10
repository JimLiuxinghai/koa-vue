<style lang="less" scoped>
	@import 'index.less';
</style>
<template>
    <div class="dis">
        <div class="top">
            <Button type="primary" @click="modal = true">新增</Button>
        </div>
        <div class="inner" v-if="loading">
            <Table stripe border :columns="columns" :data="tableData"></Table>
        </div>
         <Modal
             v-model="modal"
             title="新增经销商"
             @on-ok="addData"
             @on-cancel="modal = false">
             <div class="add">
                 
             </div>
         </Modal>
        <Loading v-if="!loading"></Loading>
    </div>
</template>
<script>
    import { distributor, deldis, adddis, getRole } from '../../data/data'
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
                    key: 'enable'
                }, {
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
                                        this.show(params.index)
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
                tableData: [],
                roleArr: [],
                loading: false,
                modal: false,
                add: {
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
                    phone: '',
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
                
            },
            async addData () {

            },
            async getRoles() {
                let data = await getRole()
                console.log(data.data.data)
            },
            cancel() {
                this.modal = false
            }
        },
        components: {
            Loading: Loading
        }
    }
</script>
