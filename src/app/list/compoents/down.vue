<style lang="less" scoped>
	
</style>
<template>
    <div class="down">
    	<Modal
    		v-model="modal"
    	    title="下级分销商"
    	    width="900"
    	    @on-visible-change="close"
    	   	>
    	    <div class="inner">
    	        <Table stripe border :columns="columns" :data="list"></Table>
    	    </div>
    	</Modal>
       
    </div>
</template>
<script>

    export default {
        beforeMount () {
           
        },
        props: ['list'],
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
                        if(params.row.enable == 1) {
                            return h('div', [
                                 h('Button', {
                                    props: {
                                        type: 'text',
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
                        else {
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
                        
                    }
                }, {
                    title: '下级经销商',
                    key: 'down',
                    align: 'center',
                    render: (h, params) => {
                        let distrRole = params.row.distrRole
                        if(distrRole !== 12) {
                            return h('div', [
                                h('Button', {
                                    props: {
                                        type: 'primary',
                                        size: 'small'
                                    },
                                    on: {
                                        click: () => {
                                            this.down(params)
                                        }
                                    }
                                }, '查看下级经销商')
                            ]);
                        }
                        else {
                        	return h('div', [
                        	    h('Button', {
                        	        props: {
                        	            type: 'text',
                        	            size: 'small'
                        	        }
                        	    }, '无')
                        	]);
                        }
                    }
                }
                // , {
                //     title: '操作',
                //     key: 'action',
                //     width: 150,
                //     align: 'center',
                //     render: (h, params) => {
                //         return h('div', [
                //             // h('Button', {
                //             //     props: {
                //             //         type: 'primary',
                //             //         size: 'small'
                //             //     },
                //             //     style: {
                //             //         marginRight: '5px'
                //             //     },
                //             //     on: {
                //             //         click: () => {
                //             //             this.edit(params)
                //             //         }
                //             //     }
                //             // }, '修改'),
                //             h('Button', {
                //                 props: {
                //                     type: 'error',
                //                     size: 'small'
                //                 },
                //                 on: {
                //                     click: () => {
                //                         this.remove(params)
                //                     }
                //                 }
                //             }, '删除')
                //         ]);
                //     }
                // }
                ],
				modal: true,                
                loading: false
            }
        },
        methods: {
            
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
            async down (params) {
                this.loading = false
                let id = params.row.id
                //this.getData(id)
            },
            close() {
                this.modal = false
                this.$emit('closeListener', '123')
            },
            edit (params) {
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
        }
    }
</script>
